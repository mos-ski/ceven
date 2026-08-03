# Unpack Parent/Caregiver v3 Export Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Split the Claude-exported Parent/Caregiver v3 HTML bundle into readable, source-controlled parts that can become the fidelity reference for future React conversion.

**Architecture:** Add a Node unpacker script that reads the bundled export, extracts the embedded template, DC logic script, style blocks, screen fragments, manifest/resource metadata, and resource files. Commit the generated source directory as a human-readable reference while keeping the bundled HTML available for exact runtime comparison.

**Tech Stack:** Node.js built-ins, Next.js public prototype artifact, generated HTML/CSS/JS/JSON source files.

## Global Constraints

- Treat `/Users/theoneglobal/Downloads/CEven Home.html` and `public/prototypes/parent-caregiver-v3/index.html` as export artifacts, not hand-edited source.
- Do not alter product behavior or redesign screens in this pass.
- Preserve the exact Claude-exported copy, bindings, inline styles, and `sc-if` / `sc-for` markers.
- Put generated maintainable source under `prototypes/parent-caregiver-v3-source/`.
- The unpack script must be rerunnable and must clean only its generated output directory.

---

### Task 1: Add repeatable unpacker

**Files:**
- Create: `scripts/unpack-parent-caregiver-v3-export.mjs`

**Interfaces:**
- Consumes: bundled export HTML at `public/prototypes/parent-caregiver-v3/index.html` by default.
- Produces: source files under `prototypes/parent-caregiver-v3-source/`.

- [ ] **Step 1: Create the Node script**

The script parses `__bundler/manifest`, `__bundler/template`, embedded styles, the `text/x-dc` logic script, and every `data-screen-label` fragment.

- [ ] **Step 2: Support explicit paths**

The script accepts `--input <html>` and `--out <dir>` arguments so future exports can be unpacked without modifying code.

### Task 2: Generate source from the Claude export

**Files:**
- Generate: `prototypes/parent-caregiver-v3-source/README.md`
- Generate: `prototypes/parent-caregiver-v3-source/template/full-template.html`
- Generate: `prototypes/parent-caregiver-v3-source/template/markup-with-bindings.html`
- Generate: `prototypes/parent-caregiver-v3-source/logic/component.js`
- Generate: `prototypes/parent-caregiver-v3-source/styles/*.css`
- Generate: `prototypes/parent-caregiver-v3-source/screens/*.html`
- Generate: `prototypes/parent-caregiver-v3-source/resources/*`
- Generate: `prototypes/parent-caregiver-v3-source/manifest/*.json`

**Interfaces:**
- Consumes: `scripts/unpack-parent-caregiver-v3-export.mjs`.
- Produces: maintainable source chunks for inspection and future conversion.

- [ ] **Step 1: Run the unpacker against the public prototype**

Run `node scripts/unpack-parent-caregiver-v3-export.mjs`.

- [ ] **Step 2: Inspect generated summary**

Confirm it reports 14 screen fragments and 19 manifest resources.

### Task 3: Verify generated source

**Files:**
- Read: generated source tree

**Interfaces:**
- Produces verification evidence that the source was unpacked correctly.

- [ ] **Step 1: Re-run the unpacker**

Run it twice and confirm the generated output is stable.

- [ ] **Step 2: Check critical files**

Confirm `logic/component.js` contains `class Component extends DCLogic`, `screens/01-parent-home.html` contains `Good morning, Funke`, and `screens/07-caregiver-today.html` contains `Good morning, Blessing`.
