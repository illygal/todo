// javascript
import type { Node, TemplateAPI } from "@livereader/graphly-d3";

export default {
  shapeSize: 100,
  shapeBuilder: shapeBuilder,
};

function shapeBuilder(data: Node, TAPI: typeof TemplateAPI) {
  const shape = TAPI.Shape.Circle(12);
  shape.select("circle").attr("stroke-width", 0);
  shape.select("circle").attr("opacity", 0.25);
  shape.classed(data.payload.done ? "gly_green_fill" : "gly_red_fill", true);
  const circle = TAPI.SVGShape(`
  <path d="M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
  `);
  const checkmark = TAPI.SVGShape(`
  <path d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M12 20C7.59 20 4 16.41 4 12S7.59 4 12 4 20 7.59 20 12 16.41 20 12 20M16.59 7.58L10 14.17L7.41 11.59L6 13L10 17L18 9L16.59 7.58Z" />
  `);
  if (data.payload.done) {
    shape.append(() => checkmark.node());
    checkmark.select("path").attr("stroke-width", 0);
    checkmark.classed(
      data.payload.done ? "gly_green_fill" : "gly_red_fill",
      true
    );
  } else {
    shape.append(() => circle.node());
    circle.select("path").attr("stroke-width", 0);
    circle.classed(data.payload.done ? "gly_green_fill" : "gly_red_fill", true);
  }
  const text = TAPI.TextCollection(
    data.payload?.title ?? "",
    TAPI.CollectionStyle(1, 70, -65, -5, -5, 10, 1, TAPI.Alignment.Center),
    [
      TAPI.ShapeStyle("stroke-width", "0"),
      TAPI.ShapeStyle("class", "gly_text"),
      TAPI.ShapeStyle("fill", "#1a1a1a", TAPI.isLight(data.payload?.color)),
      TAPI.ShapeStyle("fill", "#ffffff", TAPI.isDark(data.payload?.color)),
      TAPI.ShapeStyle("font-size", "10", true),
    ]
  );
  shape.append(() => text.node());
  return shape;
}
