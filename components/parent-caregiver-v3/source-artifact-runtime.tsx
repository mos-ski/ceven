"use client";

import { useEffect, useMemo, useRef, useState, type Dispatch, type SetStateAction } from "react";

type RuntimeProps = {
  markup: string;
  logic: string;
  styles: string;
  initialState?: Record<string, unknown>;
};

type RuntimeInstance = {
  state: Record<string, unknown>;
  props: Record<string, unknown>;
  setState: (patch: Record<string, unknown>) => void;
  renderVals: () => Record<string, unknown>;
};

type RuntimeClass = new (
  props: Record<string, unknown>,
  setState: (patch: Record<string, unknown>) => void,
) => RuntimeInstance;

type RenderContext = Record<string, unknown>;

const UNITLESS_STYLE_PROPERTIES = new Set([
  "animationIterationCount",
  "aspectRatio",
  "borderImageOutset",
  "borderImageSlice",
  "borderImageWidth",
  "boxFlex",
  "boxFlexGroup",
  "boxOrdinalGroup",
  "columnCount",
  "columns",
  "flex",
  "flexGrow",
  "flexPositive",
  "flexShrink",
  "flexNegative",
  "flexOrder",
  "gridArea",
  "gridRow",
  "gridRowEnd",
  "gridRowSpan",
  "gridRowStart",
  "gridColumn",
  "gridColumnEnd",
  "gridColumnSpan",
  "gridColumnStart",
  "fontWeight",
  "lineClamp",
  "lineHeight",
  "opacity",
  "order",
  "orphans",
  "scale",
  "tabSize",
  "widows",
  "zIndex",
  "zoom",
]);

function normalizeStyleValue(key: string, value: unknown) {
  if (typeof value === "number" && value !== 0 && !UNITLESS_STYLE_PROPERTIES.has(key)) {
    return `${value}px`;
  }

  return String(value);
}

function createRuntimeClass(logic: string): RuntimeClass {
  class DCLogic {
    props: Record<string, unknown>;
    state: Record<string, unknown> = {};
    setState: (patch: Record<string, unknown>) => void;

    constructor(
      props: Record<string, unknown>,
      setState: (patch: Record<string, unknown>) => void,
    ) {
      this.props = props;
      this.setState = setState;
    }
  }

  return new Function("DCLogic", `${logic}\nreturn Component;`)(DCLogic) as RuntimeClass;
}

function getPathValue(pathExpression: string, context: RenderContext) {
  const cleaned = pathExpression.trim();
  if (cleaned === "true") return true;
  if (cleaned === "false") return false;
  if (cleaned === "null") return null;

  return cleaned.split(".").reduce<unknown>((current, part) => {
    if (current == null) return undefined;
    return (current as Record<string, unknown>)[part];
  }, context);
}

function replaceBindings(value: string, context: RenderContext) {
  return value.replace(/\{\{\s*([^}]+?)\s*\}\}/g, (_, expression: string) => {
    const result = getPathValue(expression, context);
    if (result == null) return "";
    if (typeof result === "object") return "";
    return String(result);
  });
}

function getSingleBinding(value: string) {
  const match = value.match(/^\s*\{\{\s*([^}]+?)\s*\}\}\s*$/);
  return match ? match[1] : null;
}

function applyStyle(element: Element, styleValue: unknown) {
  if (!styleValue) return;

  const stylableElement = element as HTMLElement | SVGElement;

  if (typeof styleValue === "string") {
    stylableElement.setAttribute("style", styleValue);
    return;
  }

  if (typeof styleValue !== "object") return;

  for (const [key, value] of Object.entries(styleValue as Record<string, unknown>)) {
    if (value == null) continue;
    try {
      stylableElement.style.setProperty(
        key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`),
        normalizeStyleValue(key, value),
      );
    } catch {
      stylableElement.setAttribute(key, String(value));
    }
  }
}

function cloneNodeWithBindings(
  node: Node,
  documentRef: Document,
  context: RenderContext,
  scheduleUpdate: () => void,
): Node[] {
  if (node.nodeType === Node.TEXT_NODE) {
    return [documentRef.createTextNode(replaceBindings(node.textContent ?? "", context))];
  }

  if (node.nodeType !== Node.ELEMENT_NODE) {
    return [node.cloneNode(false)];
  }

  const sourceElement = node as Element;
  const tag = sourceElement.tagName.toLowerCase();

  if (tag === "sc-if") {
    const binding = sourceElement.getAttribute("value") ?? "";
    const expression = getSingleBinding(binding);
    const visible = expression ? Boolean(getPathValue(expression, context)) : Boolean(binding);
    if (!visible) return [];

    return Array.from(sourceElement.childNodes).flatMap((child) =>
      cloneNodeWithBindings(child, documentRef, context, scheduleUpdate),
    );
  }

  if (tag === "sc-for") {
    const expression = getSingleBinding(sourceElement.getAttribute("list") ?? "");
    const list = expression ? getPathValue(expression, context) : [];
    const alias = sourceElement.getAttribute("as") ?? "item";

    if (!Array.isArray(list)) return [];

    return list.flatMap((item, index) => {
      const childContext = {
        ...context,
        [alias]: item,
        [`${alias}Index`]: index,
      };

      return Array.from(sourceElement.childNodes).flatMap((child) =>
        cloneNodeWithBindings(child, documentRef, childContext, scheduleUpdate),
      );
    });
  }

  const outputElement =
    sourceElement.namespaceURI && sourceElement.namespaceURI !== "http://www.w3.org/1999/xhtml"
      ? documentRef.createElementNS(sourceElement.namespaceURI, sourceElement.tagName)
      : documentRef.createElement(sourceElement.tagName);

  for (const attr of Array.from(sourceElement.attributes)) {
    const name = attr.name === "sc-camel-view-box" ? "viewBox" : attr.name;

    if (name === "style") {
      const expression = getSingleBinding(attr.value);
      applyStyle(outputElement, expression ? getPathValue(expression, context) : attr.value);
      continue;
    }

    if (attr.name === "sc-camel-on-click") {
      const expression = getSingleBinding(attr.value);
      const handler = expression ? getPathValue(expression, context) : undefined;
      if (typeof handler === "function") {
        outputElement.addEventListener("click", (event) => {
          event.preventDefault();
          handler();
          scheduleUpdate();
        });
      }
      continue;
    }

    if (attr.name.startsWith("hint-")) continue;

    outputElement.setAttribute(name, replaceBindings(attr.value, context));
  }

  for (const child of Array.from(sourceElement.childNodes)) {
    for (const renderedChild of cloneNodeWithBindings(child, documentRef, context, scheduleUpdate)) {
      outputElement.appendChild(renderedChild);
    }
  }

  return [outputElement];
}

function renderArtifact(
  container: HTMLElement,
  markup: string,
  context: RenderContext,
  scheduleUpdate: () => void,
) {
  const parser = new DOMParser();
  const parsed = parser.parseFromString(`<main>${markup}</main>`, "text/html");
  const root = parsed.querySelector("main");
  if (!root) return;

  const fragment = document.createDocumentFragment();

  for (const child of Array.from(root.childNodes)) {
    for (const renderedChild of cloneNodeWithBindings(child, document, context, scheduleUpdate)) {
      fragment.appendChild(renderedChild);
    }
  }

  container.replaceChildren(fragment);
}

function buildInstance(
  Runtime: RuntimeClass,
  baseState: Record<string, unknown> | null,
  initialState: Record<string, unknown> | undefined,
  setArtifactState: Dispatch<SetStateAction<Record<string, unknown>>>,
) {
  const instance = new Runtime({}, (patch) => {
    setArtifactState((previous) => ({ ...previous, ...patch }));
  });

  if (baseState) {
    instance.state = { ...baseState };
  }

  if (initialState) {
    instance.state = { ...instance.state, ...initialState };
  }

  return instance;
}

export function SourceArtifactRuntime({ markup, logic, styles, initialState }: RuntimeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const Runtime = useMemo(() => createRuntimeClass(logic), [logic]);
  const [artifactState, setArtifactState] = useState<Record<string, unknown>>(() => {
    const instance = buildInstance(Runtime, null, initialState, () => undefined);
    return { ...instance.state };
  });
  const [revision, setRevision] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const instance = buildInstance(Runtime, artifactState, undefined, setArtifactState);
    const bindings = instance.renderVals();

    renderArtifact(container, markup, bindings, () => setRevision((value) => value + 1));
  }, [Runtime, artifactState, markup, revision]);

  return (
    <main className="flex flex-col flex-1 min-h-0 bg-[#EFE6D8]" style={{ lineHeight: "normal" }}>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div ref={containerRef} className="flex flex-col flex-1 min-h-0" />
    </main>
  );
}
