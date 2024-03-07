import type { TemplateAPI, Node } from "@livereader/graphly-d3";
export type Payload = {
  label?: string;
  description?: string;
  svg?: string;
  color?: string;
};
const schema = {
  type: "object",
  properties: {
    label: { type: "string" },
    description: { type: "string" },
    svg: { type: "string" },
    color: { type: "string" },
  },
};

export default {
  shapeSize: 300,
  shapePayload: schema,
  shapeBuilder: shapeBuilder,
};

function shapeBuilder(data: Node<Payload>, TAPI: typeof TemplateAPI) {
  const cleanedSvgCode = data.payload?.svg
    ?.replace(/<svg.*?>|<\/svg>/g, "")
    .replace(/<title.*?>.*?<\/title>/g, "");
  const shape = TAPI.SVGShape(`
	  <g transform="matrix(1,0,0,1,1.77636e-15,-30.4951)">
	  <g>
		  <g  transform="matrix(1.25205,0,0,1.34995,-18.0503,-14.1519)">
			  <path d="M92.916,47.875C92.916,42.372 88.099,37.904 82.166,37.904L26.545,37.904C20.612,37.904 15.795,42.372 15.795,47.875C15.795,53.378 20.612,57.845 26.545,57.845L82.166,57.845C88.099,57.845 92.916,53.378 92.916,47.875Z" style="stroke:${data.payload?.color};stroke-width:1.28px;"/>
		  </g>
		  <g transform="matrix(0.960972,0,0,1.16478,-0.846345,-4.89617)">
			  <path d="M2.677,41.584C6.382,37.389 11.113,34.873 16.265,34.873L72.904,34.873C73.067,34.873 73.231,34.875 73.394,34.88C70.398,32.091 66.381,30.385 61.969,30.385L18.502,30.385C11.198,30.385 4.978,35.063 2.677,41.584Z" style="fill:${data.payload?.color}; stroke-width: 0;"/>
		  </g>
		  <g transform="matrix(1.45395,0,0,1.46212,1.72626,-13.2082)">
			  <circle cx="9.206" cy="43.557" r="9.206" style="fill-opacity:0.98;stroke:black;stroke-opacity:0.07;stroke-width:0.69px;"/>
		  </g>
	  </g>
	  <g class="themeReactive" transform="matrix(0.8,0,0,0.8,5.5,41.5)" style="stroke-width: 0px; opacity: 0.6">
		 ${cleanedSvgCode}
	  </g>
  </g>
	  `);

  const title = TAPI.TextCollection(
    data.payload?.label ?? "",
    TAPI.CollectionStyle(100, 95, 13, 4.5, 3, 0, 2, TAPI.Alignment.Left),
    [
      TAPI.ShapeStyle("stroke-width", "0"),
      TAPI.ShapeStyle("font-weight", "600"),
      //   TAPI.ShapeStyle("class", "themeReactive"),
      TAPI.ShapeStyle(
        "fill",
        "#1a1a1a",
        TAPI.isLight(data.payload?.color || "#FFFFFF")
      ),
      TAPI.ShapeStyle(
        "fill",
        "#FFFFFF",
        TAPI.isDark(data.payload?.color || "#1a1a1a")
      ),
      TAPI.ShapeStyle("font-size", "4", true),
    ]
  );

  const txt = data.payload?.description ?? "";
  const text = TAPI.TextCollection(
    txt,
    TAPI.CollectionStyle(
      20,
      65,
      txt.length < 20 ? 25 : 30,
      txt.length < 20 ? 20 : 14,
      1,
      0,
      txt.length < 15 ? 1 : 3,
      txt.length < 20 ? TAPI.Alignment.Center : TAPI.Alignment.Left
    ),
    [
      TAPI.ShapeStyle("stroke-width", "0"),
      TAPI.ShapeStyle("font-weight", "600"),
      TAPI.ShapeStyle("class", "themeReactive"),
      //   TAPI.ShapeStyle("fill", "#1a1a1a"),
      txt.length < 15
        ? TAPI.ShapeStyle("font-size", "4", true)
        : TAPI.ShapeStyle("font-size", "3", true),
    ]
  );

  shape.append(() => title.node());
  shape.append(() => text.node());

  // Light and Dark Mode handling
  TAPI.OnThemeChange(data, (theme) => {
    shape
      .selectAll(".themeReactive")
      .attr("fill", theme === "light" ? "rgb(80, 80, 80)" : "#ffffff");
  });

  return shape;
}
