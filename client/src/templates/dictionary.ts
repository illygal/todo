import type { TemplateAPI, Node } from "@livereader/graphly-d3";
export type Payload = {
  label?: string;
  description?: string;
  svg?: string;
  url?: string;
  color?: string;
  symbolId?: string;
};
const schema = {
  type: "object",
  properties: {
    label: { type: "string" },
    description: { type: "string" },
    svg: { type: "string" },
    url: { type: "string" },
    color: { type: "string" },
    symbolId: { type: "string" },
  },
};

export default {
  shapeSize: 300,
  shapePayload: schema,
  shapeBuilder,
};

function shapeBuilder(data: Node<Payload>, TAPI: typeof TemplateAPI) {
  const url = TAPI.SVGShape(
    `    <image id="image" clip-path="url(#roundedImg)" width="100" height="100"/>`
  );
  const cleanedSvgCode = data.payload?.svg
    ?.replace(/<svg.*?>|<\/svg>/g, "")
    .replace(/<title.*?>.*?<\/title>/g, "");
  const shape =
    TAPI.SVGShape(` <g transform="matrix(1,0,0,1,0.501313,0.501313)"  id="dicShape">
<g transform="matrix(1,0,0,1,-3.08213,-3.08213)">
    <g transform="matrix(0.928357,0,0,0.928357,3.08213,3.08213)">
        <circle cx="50" cy="50" r="50" style="fill:${
          data.payload?.color
        };stroke:${data.payload?.color};stroke-width:5px;"/>
        <clipPath id="roundedImg"><circle cx="50" cy="50" r="50"/></clipPath>
        <image id="image" clip-path="url(#roundedImg)" width="100" height="100"/>
    </g>
</g>
<g id="svg" class="themeReactive" transform="matrix(2,0,0,2,23,23)" style="fill:${
      data.payload?.color == "#FFFFFF" ? "#1a1a1a" : "#FFFFFF"
    } ;stroke-width: 0px; opacity: 0.6; size: 100px">
${cleanedSvgCode}
</g>
</g>`);

  const textfield = TAPI.SVGShape(`
<g transform="matrix(1,0,0,1,-3,22)">
        <g transform="matrix(1.09033,0,0,0.988613,-12.0909,43.7424)">
            <path d="M92.591,33.502C92.591,31.16 90.867,29.259 88.744,29.259L25.15,29.259C23.027,29.259 21.304,31.16 21.304,33.502L21.304,41.986C21.304,44.328 23.027,46.229 25.15,46.229L88.744,46.229C90.867,46.229 92.591,44.328 92.591,41.986L92.591,33.502Z" style="fill:${data.payload?.color}; stroke:none;"/>
        </g>
    </g>
`);

  const question = TAPI.SVGShape(
    `<
    <g id="svg" class="themeReactive" transform="matrix(2,0,0,2,23,23)" style="fill:${
      data.payload?.color == "#FFFFFF" ? "#1a1a1a" : "#FFFFFF"
    } ;stroke-width: 0px; opacity: 0.6; size: 100px">
    svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>help</title><path d="M10,19H13V22H10V19M12,2C17.35,2.22 19.68,7.62 16.5,11.67C15.67,12.67 14.33,13.33 13.67,14.17C13,15 13,16 13,17H10C10,15.33 10,13.92 10.67,12.92C11.33,11.92 12.67,11.33 13.5,10.67C15.92,8.43 15.32,5.26 12,5A3,3 0 0,0 9,8H6A6,6 0 0,1 12,2Z" style="stroke: none" /></>
    </g>
    `
  );

  const tit = data.payload?.label ?? "";
  const title = TAPI.TextCollection(
    data.payload?.label ?? "",
    TAPI.CollectionStyle(
      15,
      80,
      tit.length < 20 ? 6 : 8,
      tit.length < 20 ? 105 : 101,
      4,
      1,
      2,
      TAPI.Alignment.Center
    ),
    [
      TAPI.ShapeStyle("stroke-width", "0"),
      TAPI.ShapeStyle("font-weight", "600"),
      TAPI.ShapeStyle("class", "themeReactive"),
      TAPI.ShapeStyle(
        "fill",
        data.payload?.color == "#FFFFFF" ? "#1a1a1a" : "#FFFFFF"
      ),
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
      4,
      1,
      txt.length < 15 ? 1 : 4,
      txt.length < 20 ? TAPI.Alignment.Center : TAPI.Alignment.Center
    ),
    [
      TAPI.ShapeStyle("stroke-width", "0"),
      TAPI.ShapeStyle("font-weight", "600"),
      TAPI.ShapeStyle("class", "themeReactive"),
      TAPI.ShapeStyle(
        "fill",
        data.payload?.color == "#FFFFFF" ? "#1a1a1a" : "#FFFFFF"
      ),
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
    .then((res) => {
      if (res.image) {
        shape.select("#image").attr("href", res.image);
        shape.select("#svg").style("opacity", 0);
      }
    });

  if (data.payload?.url) {
    shape.append(() => textfield.node());
    shape.append(() => title.node());
    shape.append(() => url.node());
    shape.append(() => description.node());
  } else if (data.payload?.svg) {
    shape.append(() => textfield.node());
    shape.append(() => title.node());
    shape.append(() => description.node());
  } else {
    shape.append(() => textfield.node());
    shape.append(() => title.node());
    shape.append(() => description.node());
    shape.append(() => question.node());
  }
  shape.on("mouseenter", (e: MouseEvent) => {
    e.stopPropagation();
    TAPI.EmitEvent("shape-hover-start", data, e);
    description.attr("opacity", 1);
    shape.select("#image").attr("opacity", 0.3);
  });

  shape.on("mouseleave", (e: MouseEvent) => {
    e.stopPropagation();
    TAPI.EmitEvent("shape-hover-end", data, e);
    description.attr("opacity", 0);
    shape.select("#image").attr("opacity", 1);
  });

  return shape;
}
