# Parent/Caregiver v3 Claude Export Source

This directory is generated from the Claude-exported bundle at:

`/Users/theoneglobal/Downloads/CEven Home.html`

It is the readable source-of-truth reference for rebuilding the experience in maintainable React code while preserving visual and behavior fidelity.

## What Is Here

- `template/full-template.html`: the full embedded Claude artifact template.
- `template/markup-with-bindings.html`: the artifact markup with the DC logic script removed.
- `logic/component.js`: the extracted `class Component extends DCLogic` state and behavior logic.
- `logic/component-script-tag.html`: the original DC script tag, including its metadata attributes.
- `styles/`: extracted style blocks from the artifact template.
- `screens/`: one HTML fragment per `data-screen-label` screen.
- `resources/`: decoded manifest resources such as fonts, JavaScript, and SVG assets.
- `manifest/`: JSON summaries of screens, resources, source hashes, and bundle metadata.

## Refresh

```bash
node scripts/unpack-parent-caregiver-v3-export.mjs
```

To unpack a fresh Claude export:

```bash
node scripts/unpack-parent-caregiver-v3-export.mjs --input "/path/to/CEven Home.html"
```

## Current Extraction Summary

- Screens: 14
- Manifest resources: 19
- Style blocks: 2
- DC logic found: yes
- Source SHA-256: `30d08315419c61ecb8bd8e9f6b54d00fd99c650a6d4c79ad66d4465816017148`
- Template SHA-256: `486edb393564a0fd5902e4e5b393143f547ad0492944521093e30c1bbc8b502b`
