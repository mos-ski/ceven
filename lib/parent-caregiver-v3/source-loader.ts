import fs from "node:fs/promises";
import path from "node:path";

export type ParentCaregiverV3Source = {
  markup: string;
  logic: string;
  styles: string;
  summary: {
    source: string;
    sourceSha256: string;
    screens: number;
    manifestResources: number;
  };
};

type ResourceSummary = {
  uuid: string;
  mime: string;
  file: string;
};

const SOURCE_DIR = path.join(process.cwd(), "prototypes/parent-caregiver-v3-source");

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

async function readText(relativePath: string) {
  return fs.readFile(path.join(SOURCE_DIR, relativePath), "utf8");
}

async function readJson<T>(relativePath: string): Promise<T> {
  return JSON.parse(await readText(relativePath)) as T;
}

function extractXdcMarkup(documentMarkup: string) {
  const match = documentMarkup.match(/<x-dc>([\s\S]*?)<\/x-dc>/i);
  return match ? match[1].trim() : documentMarkup;
}

function stripDocumentMetadata(markup: string) {
  return markup.replace(/<helmet>[\s\S]*?<\/helmet>/gi, "").trim();
}

async function buildResourceDataUrls() {
  const resources = await readJson<ResourceSummary[]>("manifest/resources.json");
  const entries: Array<[string, string]> = [];

  for (const resource of resources) {
    const bytes = await fs.readFile(path.join(SOURCE_DIR, resource.file));
    entries.push([resource.uuid, `data:${resource.mime};base64,${bytes.toString("base64")}`]);
  }

  return entries;
}

function replaceResourceReferences(input: string, resources: Array<[string, string]>) {
  return resources.reduce(
    (text, [uuid, dataUrl]) => text.replace(new RegExp(escapeRegExp(uuid), "g"), dataUrl),
    input,
  );
}

export async function loadParentCaregiverV3Source(): Promise<ParentCaregiverV3Source> {
  const [documentMarkup, logic, fontStyles, baseStyles, summary, resources] = await Promise.all([
    readText("template/markup-with-bindings.html"),
    readText("logic/component.js"),
    readText("styles/01-font-faces.css"),
    readText("styles/02-base.css"),
    readJson<ParentCaregiverV3Source["summary"]>("manifest/summary.json"),
    buildResourceDataUrls(),
  ]);

  const markup = replaceResourceReferences(
    stripDocumentMetadata(extractXdcMarkup(documentMarkup)),
    resources,
  );
  const styles = replaceResourceReferences(`${fontStyles}\n${baseStyles}`, resources);

  return {
    markup,
    logic,
    styles,
    summary,
  };
}
