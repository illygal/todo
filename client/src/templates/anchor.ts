import type { Node, TemplateAPI } from "@livereader/graphly-d3";

export default {
  shapeSize: 100,
  shapeBuilder: shapeBuilder,
};

const pentaPath = `<path d="M47.061,2.135C48.814,0.862 51.186,0.862 52.939,2.135C61.457,8.324 86.095,26.225 94.614,32.414C96.366,33.687 97.1,35.944 96.43,38.004C93.176,48.018 83.766,76.982 80.512,86.996C79.842,89.056 77.923,90.451 75.757,90.451L24.243,90.451C22.077,90.451 20.158,89.056 19.488,86.996C16.234,76.982 6.824,48.018 3.57,38.004C2.9,35.944 3.634,33.687 5.386,32.414C13.905,26.225 38.543,8.324 47.061,2.135Z"/>`;

function shapeBuilder(data: Node, TAPI: typeof TemplateAPI) {
  const shape = TAPI.Shape.create("g");

  const pentaGroup = TAPI.Shape.create("g");
  if (data.payload?.stacked) {
    for (let i = 2; i >= 0; i--) {
      const group = TAPI.Shape.create("g")
        .attr("transform", `translate(${i * 4},${i * 4})`)
        .attr("opacity", 1 - i * 0.3);
      const pentagon = TAPI.SVGShape(pentaPath);
      pentagon.select("path").attr("fill", data.payload?.color);
      group.append(() => pentagon.node());
      pentaGroup.append(() => group.node());
    }
  } else {
    const pentagon = TAPI.SVGShape(pentaPath);
    pentagon.select("path").attr("fill", data.payload?.color);
    pentaGroup.append(() => pentagon.node());
  }

  shape.append(() => pentaGroup.node());

  if (data.payload?.show == false) {
    pentaGroup.attr("transform", "rotate(0,50,50)");
    //pentaGroup.attr("opacity", 0.5);
  }

  const text = TAPI.TextCollection(
    data.payload?.title ?? "",
    TAPI.CollectionStyle(50, 100, 0, 50, 10, 10, 2),
    [
      TAPI.ShapeStyle("stroke-width", "0"),
      TAPI.ShapeStyle("class", "gly_text"),
      TAPI.ShapeStyle("fill", "#1a1a1a", TAPI.isLight(data.payload?.color)),
      TAPI.ShapeStyle("fill", "#ffffff", TAPI.isDark(data.payload?.color)),
    ]
  );
  shape.append(() => text.node());
  return shape;
}
