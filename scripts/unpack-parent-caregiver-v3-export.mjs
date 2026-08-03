#!/usr/bin/env node

import { existsSync } from "node:fs";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { gunzipSync } from "node:zlib";
import { createHash } from "node:crypto";

const __filename = fileURLToPath(import.meta.url);
const repoRoot = path.resolve(path.dirname(__filename), "..");

const DEFAULT_INPUTS = [
  path.join(repoRoot, "public/prototypes/parent-caregiver-v3/index.html"),
  "/Users/theoneglobal/Downloads/CEven Home.html",
];

const DEFAULT_OUT = path.join(repoRoot, "prototypes/parent-caregiver-v3-source");

function parseArgs(argv) {
  const args = { input: undefined, out: DEFAULT_OUT };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--input") {
      args.input = argv[i + 1];
      i += 1;
    } else if (arg === "--out") {
      args.out = argv[i + 1];
      i += 1;
    } else if (arg === "--help" || arg === "-h") {
      printHelp();
      process.exit(0);
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  if (!args.input) {
    args.input = DEFAULT_INPUTS.find((candidate) => existsSync(candidate));
  }

  if (!args.input) {
    throw new Error(`No input export found. Pass --input <path>. Checked: ${DEFAULT_INPUTS.join(", ")}`);
  }

  return {
    input: path.resolve(args.input),
    out: path.resolve(args.out),
  };
}

function printHelp() {
  console.log(`Usage: node scripts/unpack-parent-caregiver-v3-export.mjs [--input export.html] [--out output-dir]

Unpacks the Claude-exported Parent/Caregiver v3 bundle into readable source files.
Default input: public/prototypes/parent-caregiver-v3/index.html
Default output: prototypes/parent-caregiver-v3-source`);
}

function extractScriptText(html, type) {
  const escaped = type.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`<script\\s+type="${escaped}"[^>]*>\\s*([\\s\\S]*?)\\s*</script>`, "i");
  const match = html.match(re);
  return match ? match[1] : "";
}

function sha256(input) {
  return createHash("sha256").update(input).digest("hex");
}

function rel(filePath) {
  const relative = path.relative(repoRoot, filePath);
  return relative.startsWith("..") ? filePath : relative;
}

function slugify(label) {
  return label
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function extensionForMime(mime) {
  if (mime === "image/svg+xml") return "svg";
  if (mime === "text/javascript") return "js";
  if (mime === "text/css") return "css";
  if (mime === "text/html") return "html";
  if (mime === "font/woff2") return "woff2";
  if (mime === "font/woff") return "woff";
  if (mime === "application/json") return "json";
  return "bin";
}

function extractStyleBlocks(template) {
  return [...template.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map((match, index) => ({
    index: index + 1,
    css: match[1].trim(),
  }));
}

function extractDcLogic(template) {
  const match = template.match(/<script\s+type="text\/x-dc"[^>]*>([\s\S]*?)<\/script>/i);
  return {
    tag: match ? match[0] : "",
    code: match ? match[1].trim() : "",
  };
}

function stripDcLogic(template) {
  return template.replace(/\n?\s*<script\s+type="text\/x-dc"[^>]*>[\s\S]*?<\/script>\s*/i, "\n");
}

function findMatchingElementEnd(source, startIndex, tagName) {
  const re = new RegExp(`<\\/?${tagName}(?=\\s|>|/)`, "gi");
  re.lastIndex = startIndex;

  let depth = 0;
  let match;

  while ((match = re.exec(source))) {
    const isClose = source[match.index + 1] === "/";
    const gt = source.indexOf(">", match.index);
    if (gt === -1) return -1;
    const isSelfClosing = source[gt - 1] === "/";

    if (isClose) {
      depth -= 1;
      if (depth === 0) return gt + 1;
    } else if (!isSelfClosing) {
      depth += 1;
    }

    re.lastIndex = gt + 1;
  }

  return -1;
}

function extractScreens(template) {
  const labels = [...template.matchAll(/data-screen-label="([^"]+)"/g)].map((match) => ({
    label: match[1],
    attrIndex: match.index,
  }));

  return labels.map((screen, index) => {
    const start = template.lastIndexOf("<div", screen.attrIndex);
    const end = start >= 0 ? findMatchingElementEnd(template, start, "div") : -1;
    const fragment = start >= 0 && end >= 0 ? template.slice(start, end) : "";
    return {
      index: index + 1,
      label: screen.label,
      slug: slugify(screen.label),
      fragment,
    };
  });
}

function parseJsonScript(html, type, fallback) {
  const text = extractScriptText(html, type);
  if (!text) return fallback;
  return JSON.parse(text);
}

async function writeJson(filePath, data) {
  await fs.writeFile(filePath, `${JSON.stringify(data, null, 2)}\n`);
}

async function ensureDirs(out) {
  await fs.rm(out, { recursive: true, force: true });
  await fs.mkdir(path.join(out, "template"), { recursive: true });
  await fs.mkdir(path.join(out, "logic"), { recursive: true });
  await fs.mkdir(path.join(out, "styles"), { recursive: true });
  await fs.mkdir(path.join(out, "screens"), { recursive: true });
  await fs.mkdir(path.join(out, "resources"), { recursive: true });
  await fs.mkdir(path.join(out, "manifest"), { recursive: true });
}

async function writeResources(out, manifest) {
  const summary = [];

  for (const [uuid, entry] of Object.entries(manifest)) {
    const ext = extensionForMime(entry.mime);
    const fileName = `${uuid}.${ext}`;
    const filePath = path.join(out, "resources", fileName);
    const encoded = entry.data ?? "";
    const decoded = Buffer.from(encoded, "base64");
    const bytes = entry.compressed ? gunzipSync(decoded) : decoded;

    await fs.writeFile(filePath, bytes);

    summary.push({
      uuid,
      mime: entry.mime,
      compressed: Boolean(entry.compressed),
      file: `resources/${fileName}`,
      bytes: bytes.length,
      sha256: sha256(bytes),
    });
  }

  return summary;
}

async function main() {
  const { input, out } = parseArgs(process.argv.slice(2));
  const bundle = await fs.readFile(input, "utf8");
  const template = JSON.parse(extractScriptText(bundle, "__bundler/template"));
  const manifest = parseJsonScript(bundle, "__bundler/manifest", {});
  const pageOrder = parseJsonScript(bundle, "__bundler/page_order", []);
  const externalResources = parseJsonScript(bundle, "__bundler/ext_resources", []);
  const styles = extractStyleBlocks(template);
  const logic = extractDcLogic(template);
  const screens = extractScreens(template);

  await ensureDirs(out);

  await fs.writeFile(path.join(out, "template/full-template.html"), template);
  await fs.writeFile(path.join(out, "template/markup-with-bindings.html"), stripDcLogic(template));
  await fs.writeFile(path.join(out, "logic/component.js"), `${logic.code}\n`);
  await fs.writeFile(path.join(out, "logic/component-script-tag.html"), `${logic.tag}\n`);

  for (const style of styles) {
    const name = style.css.includes("@font-face") ? "font-faces" : "base";
    const fileName = `${String(style.index).padStart(2, "0")}-${name}.css`;
    await fs.writeFile(path.join(out, "styles", fileName), `${style.css}\n`);
  }

  const screenSummary = [];
  for (const screen of screens) {
    const fileName = `${String(screen.index).padStart(2, "0")}-${screen.slug}.html`;
    await fs.writeFile(path.join(out, "screens", fileName), `${screen.fragment}\n`);
    screenSummary.push({
      index: screen.index,
      label: screen.label,
      slug: screen.slug,
      file: `screens/${fileName}`,
      bytes: Buffer.byteLength(screen.fragment),
    });
  }

  const resourceSummary = await writeResources(out, manifest);

  const summary = {
    source: rel(input),
    output: rel(out),
    sourceBytes: Buffer.byteLength(bundle),
    sourceSha256: sha256(bundle),
    templateBytes: Buffer.byteLength(template),
    templateSha256: sha256(template),
    screens: screenSummary.length,
    manifestResources: resourceSummary.length,
    styles: styles.length,
    hasDcLogic: logic.code.includes("class Component extends DCLogic"),
  };

  await writeJson(path.join(out, "manifest/summary.json"), summary);
  await writeJson(path.join(out, "manifest/bundle-manifest.json"), manifest);
  await writeJson(path.join(out, "manifest/page-order.json"), pageOrder);
  await writeJson(path.join(out, "manifest/external-resources.json"), externalResources);
  await writeJson(path.join(out, "manifest/resources.json"), resourceSummary);
  await writeJson(path.join(out, "manifest/screens.json"), screenSummary);

  await fs.writeFile(
    path.join(out, "README.md"),
    `# Parent/Caregiver v3 Claude Export Source

This directory is generated from the Claude-exported bundle at:

\`${rel(input)}\`

It is the readable source-of-truth reference for rebuilding the experience in maintainable React code while preserving visual and behavior fidelity.

## What Is Here

- \`template/full-template.html\`: the full embedded Claude artifact template.
- \`template/markup-with-bindings.html\`: the artifact markup with the DC logic script removed.
- \`logic/component.js\`: the extracted \`class Component extends DCLogic\` state and behavior logic.
- \`logic/component-script-tag.html\`: the original DC script tag, including its metadata attributes.
- \`styles/\`: extracted style blocks from the artifact template.
- \`screens/\`: one HTML fragment per \`data-screen-label\` screen.
- \`resources/\`: decoded manifest resources such as fonts, JavaScript, and SVG assets.
- \`manifest/\`: JSON summaries of screens, resources, source hashes, and bundle metadata.

## Refresh

\`\`\`bash
node scripts/unpack-parent-caregiver-v3-export.mjs
\`\`\`

To unpack a fresh Claude export:

\`\`\`bash
node scripts/unpack-parent-caregiver-v3-export.mjs --input "/path/to/CEven Home.html"
\`\`\`

## Current Extraction Summary

- Screens: ${summary.screens}
- Manifest resources: ${summary.manifestResources}
- Style blocks: ${summary.styles}
- DC logic found: ${summary.hasDcLogic ? "yes" : "no"}
- Source SHA-256: \`${summary.sourceSha256}\`
- Template SHA-256: \`${summary.templateSha256}\`
`,
  );

  console.log(`Unpacked ${rel(input)} -> ${rel(out)}`);
  console.log(`Screens: ${summary.screens}`);
  console.log(`Manifest resources: ${summary.manifestResources}`);
  console.log(`Style blocks: ${summary.styles}`);
  console.log(`DC logic found: ${summary.hasDcLogic ? "yes" : "no"}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
