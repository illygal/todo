import type { TemplateAPI, Node } from "@livereader/graphly-d3";
export type Payload = {
  label?: string;
  description?: string;
  svg?: string;
  url?: string;
  color?: string;
};
const schema = {
  type: "object",
  properties: {
    label: { type: "string" },
    description: { type: "string" },
    svg: { type: "string" },
    url: { type: "string" },
    color: { type: "string" },
  },
};

export default {
  shapeSize: 100,
  shapePayload: schema,
  shapeBuilder,
};

let hoverCounter = 0;

function shapeBuilder(data: Node<Payload>, TAPI: typeof TemplateAPI) {
  const shape =
    TAPI.SVGShape(` <g transform="matrix(1,0,0,1,0.501313,0.501313)"  id="dicShape">
<g transform="matrix(1,0,0,1,-3.08213,-3.08213)">
    <g transform="matrix(0.928357,0,0,0.928357,3.08213,3.08213)">
        <circle cx="50" cy="50" r="50" style="fill:#1a1a1a;stroke:#1a1a1a;stroke-width:5px;"/>
        <clipPath id="roundedImg"><circle cx="50" cy="50" r="50"/></clipPath>
        <image id="image" clip-path="url(#roundedImg)" width="100" height="100"/>
    </g>
</g>
</g>`);

  const textfield = TAPI.SVGShape(`
<g transform="matrix(1,0,0,1,-3,22)">
        <g transform="matrix(1.09033,0,0,0.988613,-12.0909,43.7424)">
            <path d="M92.591,33.502C92.591,31.16 90.867,29.259 88.744,29.259L25.15,29.259C23.027,29.259 21.304,31.16 21.304,33.502L21.304,41.986C21.304,44.328 23.027,46.229 25.15,46.229L88.744,46.229C90.867,46.229 92.591,44.328 92.591,41.986L92.591,33.502Z" style="fill:#1a1a1a; stroke:none;"/>
        </g>
    </g>
`);

  const tit = data.payload?.label ?? "";
  const title = TAPI.TextCollection(
    data.payload?.label ?? "",
    TAPI.CollectionStyle(
      15,
      80,
      tit.length < 20 ? 6 : 8,
      tit.length < 20 ? 105 : 101,
      1.5,
      1,
      2,
      TAPI.Alignment.Center
    ),
    [
      TAPI.ShapeStyle("stroke-width", "0"),
      TAPI.ShapeStyle("font-weight", "600"),
      TAPI.ShapeStyle("class", "themeReactive"),
      TAPI.ShapeStyle("fill", data.payload?.color ?? "#1a1a1a"),
      TAPI.ShapeStyle("font-size", "6", true),
    ]
  );

  const txt = data.payload?.description ?? "";
  const description = TAPI.TextCollection(
    data.payload?.description ?? "",
    TAPI.CollectionStyle(
      30,
      70,
      txt.length < 20 ? 16 : 12,
      txt.length < 20 ? 48 : 35,
      1.5,
      1,
      txt.length < 15 ? 1 : 4,
      txt.length < 20 ? TAPI.Alignment.Center : TAPI.Alignment.Center
    ),
    [
      TAPI.ShapeStyle("stroke-width", "0"),
      TAPI.ShapeStyle("font-weight", "600"),
      TAPI.ShapeStyle("class", "themeReactive"),
      TAPI.ShapeStyle("fill", data.payload?.color ?? "#1a1a1a"),
      TAPI.ShapeStyle("font-size", "5", true),
    ]
  );

  description.attr("opacity", 0);

  fetch(
    "https://engineer.notitia.dev/api/v1.0/10cd7fbc-e27a-44c5-8fbc-716473f788ed/dictionary/website-data?url=" +
      data.payload?.url,
    {
      headers: {
        Authorization:
          "Bearer nta-e949ed8848dd006bf651aefaf3b542dedd197d3d9a967efa3c4325b9904911b1",
      },
    }
  )
    .then((res) => res.json())
    .then((res) => shape.select("#image").attr("href", res.image));

  shape.append(() => textfield.node());
  shape.append(() => title.node());
  shape.append(() => description.node());

  shape.on("mouseenter", () => {
    hoverCounter++;

    if (hoverCounter > 0) {
      description.attr("opacity", 1);
      shape.select("#image").attr("opacity", 0.3);
    }
  });

  shape.on("mouseleave", () => {
    hoverCounter--;
    if (hoverCounter <= 0) {
      description.attr("opacity", 0);
      shape.select("#image").attr("opacity", 1);
    }
  });

  return shape;
}
