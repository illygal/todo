import type { Node, TemplateAPI } from "@livereader/graphly-d3";

export type Schema = {
  title: string;
  isDay: boolean;
  temp: number;
  weathertype: "clear" | "cloudy" | "rainy";
  time: string;
};

const schema = {
  type: "object",
  properties: {
    title: { type: "string" },
    isDay: { type: "boolean" },
    temp: { type: "number" },
    weathertype: { type: "string", enum: ["clear", "cloudy", "rainy"] },
    time: { type: "string" },
  },
  required: ["title", "isDay", "temp", "weathertype", "time"],
};

export default {
  shapeSize: 100,
  shapePayload: schema,
  shapeBuilder: shapeBuilder,
};
function shapeBuilder(data: Node<Schema>, TAPI: typeof TemplateAPI) {
  let color = "#2f3475";
  if (data.payload?.weathertype === "clear") {
    if (data.payload?.isDay) {
      color = "#ffa333";
    } else {
      color = "#2f3475";
    }
  } else if (data.payload?.weathertype === "cloudy") {
    if (data.payload?.isDay) {
      color = "#ffa333";
    } else {
      color = "#2f3475";
    }
  } else if (data.payload?.weathertype === "rainy") {
    if (data.payload?.isDay) {
      color = "#ffa333";
    } else {
      color = "#2f3475";
    }
  }

  const shape = TAPI.SVGShape(`
  <g transform="matrix(1,0,0,1,-3.08213,-3.08213)">
  <g transform="matrix(0.928357,0,0,0.928357,3.58213,3.58213)">
      <circle cx="50" cy="50" r="50" style="fill:white;stroke:black;stroke-width:1.08px;"/>
  </g>
  <g transform="matrix(0.932288,0,0,0.903258,22.5523,-4.29759)">
      <clipPath id="_clip1">
          <rect x="-20.311" y="9.649" width="98.387" height="49.838"/>
      </clipPath>
      <g clip-path="url(#_clip1)">
          <circle cx="29.41" cy="58.614" r="46.629" style="fill:${color};fill-opacity:1;"/>
      </g>
  </g>
  <g transform="matrix(0.932288,0,0,-0.903258,22.4873,103.982)">
      <clipPath id="_clip2">
          <rect x="-20.311" y="9.649" width="98.387" height="49.838"/>
      </clipPath>
      <g clip-path="url(#_clip2)">
          <circle id="light" cx="29.41" cy="58.614" r="46.629" style="fill-opacity:1;"/>
      </g>
  </g>
  <g transform="matrix(1.01995,0,0,0.523139,-1.49531,32.2924)">
      <clipPath id="_clip3">
          <rect x="7.839" y="32.767" width="85.242" height="2.163"/>
      </clipPath>
      <g clip-path="url(#_clip3)">
          <rect x="6.473" y="33.018" width="88.002" height="2.098" style="stroke:black;stroke-width:0.77px;"/>
      </g>
  </g>
</g>
`);

  const cloudy = TAPI.SVGShape(`
  <g transform="translate(20,52.5)">
<path class="themeReactive" style="stroke:none;" d="M6,19A5,5 0 0,1 1,14A5,5 0 0,1 6,9C7,6.65 9.3,5 12,5C15.43,5 18.24,7.66 18.5,11.03L19,11A4,4 0 0,1 23,15A4,4 0 0,1 19,19H6M19,13H17V12A5,5 0 0,0 12,7C9.5,7 7.45,8.82 7.06,11.19C6.73,11.07 6.37,11 6,11A3,3 0 0,0 3,14A3,3 0 0,0 6,17H19A2,2 0 0,0 21,15A2,2 0 0,0 19,13Z" />
   </g>
    `);

  const sunny = TAPI.SVGShape(`
  <g transform="translate(20,52.5)">
    <path class="themeReactive" style="stroke:none;" d="M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,2L14.39,5.42C13.65,5.15 12.84,5 12,5C11.16,5 10.35,5.15 9.61,5.42L12,2M3.34,7L7.5,6.65C6.9,7.16 6.36,7.78 5.94,8.5C5.5,9.24 5.25,10 5.11,10.79L3.34,7M3.36,17L5.12,13.23C5.26,14 5.53,14.78 5.95,15.5C6.37,16.24 6.91,16.86 7.5,17.37L3.36,17M20.65,7L18.88,10.79C18.74,10 18.47,9.23 18.05,8.5C17.63,7.78 17.1,7.15 16.5,6.64L20.65,7M20.64,17L16.5,17.36C17.09,16.85 17.62,16.22 18.04,15.5C18.46,14.77 18.73,14 18.87,13.21L20.64,17M12,22L9.59,18.56C10.33,18.83 11.14,19 12,19C12.82,19 13.63,18.83 14.37,18.56L12,22Z" />   
    </g>
    `);

  const night = TAPI.SVGShape(`
        <g transform="matrix(0.783807,0,0,0.783807,33.4169,63.8638)">
          <g transform="matrix(1,0,0,1,-12,-12)">
            <path class="themeReactive" style="stroke:none;" d="M17.75,4.09L15.22,6.03L16.13,9.09L13.5,7.28L10.87,9.09L11.78,6.03L9.25,4.09L12.44,4L13.5,1L14.56,4L17.75,4.09M21.25,11L19.61,12.25L20.2,14.23L18.5,13.06L16.8,14.23L17.39,12.25L15.75,11L17.81,10.95L18.5,9L19.19,10.95L21.25,11M18.97,15.95C19.8,15.87 20.69,17.05 20.16,17.8C19.84,18.25 19.5,18.67 19.08,19.07C15.17,23 8.84,23 4.94,19.07C1.03,15.17 1.03,8.83 4.94,4.93C5.34,4.53 5.76,4.17 6.21,3.85C6.96,3.32 8.14,4.21 8.06,5.04C7.79,7.9 8.75,10.87 10.95,13.06C13.14,15.26 16.1,16.22 18.97,15.95M17.33,17.97C14.5,17.81 11.7,16.64 9.53,14.5C7.36,12.31 6.2,9.5 6.04,6.68C3.23,9.82 3.34,14.64 6.35,17.66C9.37,20.67 14.19,20.78 17.33,17.97Z" />
          </g>
        </g>
        `);
  const sun = TAPI.SVGShape(`
    <g transform="matrix(1,0,0,1,-3.9982,-3.6536)">
    <g transform="matrix(1,0,0,1,-0.692585,9.18229)">
        <clipPath id="_clip1">
            <rect x="41.568" y="31.751" width="26.249" height="9.066"/>
            </clipPath>
            <g clip-path="url(#_clip1)">
            <circle class="sun" cx="52.693" cy="42.876" r="11.124" style="fill:#ffe65c;fill-opacity:1;stroke:none;"/>
            </g>
            </g>
            </g>`);

  const sunShadow1 = TAPI.SVGShape(`
            <g transform="matrix(1,0,0,1,-1.9982,-3.1145)">
  <g transform="matrix(2.7927,0,0,2.7927,-92.0894,-64.5575)">
      <clipPath id="_clip1">
      <rect x="37.568" y="26.751" width="26.249" height="14.066"/>
      </clipPath>
      <g clip-path="url(#_clip1)">
          <circle class="ss2" cx="50.693" cy="40.876" r="9.124" style="fill:rgb(255, 198, 102);fill-opacity:1; stroke:none;"/>
      </g>
  </g>
</g>`);

  const sunShadow2 = TAPI.SVGShape(`
  <g transform="matrix(1,0,0,1,-2.4057,-3.0469)">
        <g transform="matrix(3.57224,0,0,3.57224,-131.086,-96.3764)">
            <clipPath id="_clip1">
                <rect x="37.568" y="26.751" width="26.249" height="14.066"/>
            </clipPath>
            <g clip-path="url(#_clip1)">
                <circle class="ss2" cx="50.693" cy="40.876" r="9.124" style="fill:rgb(255, 177, 77);fill-opacity:1;stroke:none;"/>
            </g>
        </g>
    </g>
    </g>
</g>
</g>`);

  const moon = TAPI.SVGShape(`
    <g transform="matrix(1,0,0,1,-3.9982,-3.6536)">
    <g transform="matrix(1,0,0,1,-0.692585,9.18229)">
        <clipPath id="_clip1">
            <rect x="41.568" y="31.751" width="26.249" height="9.066"/>
            </clipPath>
            <g clip-path="url(#_clip1)">
            <circle class="sun" cx="52.693" cy="42.876" r="11.124" style="fill:#ffe646;fill-opacity:1;stroke:none;"/>
            </g>
            </g>
            </g>`);

  const moonShadow1 = TAPI.SVGShape(`
            <g transform="matrix(1,0,0,1,-1.9982,-3.1145)">
  <g transform="matrix(2.7927,0,0,2.7927,-92.0894,-64.5575)">
      <clipPath id="_clip1">
      <rect x="37.568" y="26.751" width="26.249" height="14.066"/>
      </clipPath>
      <g clip-path="url(#_clip1)">
          <circle class="ss2" cx="50.693" cy="40.876" r="9.124" style="fill:rgb(79, 85, 148);fill-opacity:1; stroke:none;"/>
      </g>
  </g>
</g>`);

  const moonShadow2 = TAPI.SVGShape(`
  <g transform="matrix(1,0,0,1,-2.4057,-3.0469)">
        <g transform="matrix(3.57224,0,0,3.57224,-131.086,-96.3764)">
            <clipPath id="_clip1">
                <rect x="37.568" y="26.751" width="26.249" height="14.066"/>
            </clipPath>
            <g clip-path="url(#_clip1)">
                <circle class="ss2" cx="50.693" cy="40.876" r="9.124" style="fill:rgb(65, 73, 137);fill-opacity:1;stroke:none;"/>
            </g>
        </g>
    </g>
    </g>
</g>
</g>`);

  const rainy = TAPI.SVGShape(`
  <g transform="translate(20,52.5)">
   <path class="themeReactive" style="stroke:none;" d="M9,12C9.53,12.14 9.85,12.69 9.71,13.22L8.41,18.05C8.27,18.59 7.72,18.9 7.19,18.76C6.65,18.62 6.34,18.07 6.5,17.54L7.78,12.71C7.92,12.17 8.47,11.86 9,12M13,12C13.53,12.14 13.85,12.69 13.71,13.22L11.64,20.95C11.5,21.5 10.95,21.8 10.41,21.66C9.88,21.5 9.56,20.97 9.7,20.43L11.78,12.71C11.92,12.17 12.47,11.86 13,12M17,12C17.53,12.14 17.85,12.69 17.71,13.22L16.41,18.05C16.27,18.59 15.72,18.9 15.19,18.76C14.65,18.62 14.34,18.07 14.5,17.54L15.78,12.71C15.92,12.17 16.47,11.86 17,12M17,10V9A5,5 0 0,0 12,4C9.5,4 7.45,5.82 7.06,8.19C6.73,8.07 6.37,8 6,8A3,3 0 0,0 3,11C3,12.11 3.6,13.08 4.5,13.6V13.59C5,13.87 5.14,14.5 4.87,14.96C4.59,15.43 4,15.6 3.5,15.32V15.33C2,14.47 1,12.85 1,11A5,5 0 0,1 6,6C7,3.65 9.3,2 12,2C15.43,2 18.24,4.66 18.5,8.03L19,8A4,4 0 0,1 23,12C23,13.5 22.2,14.77 21,15.46V15.46C20.5,15.73 19.91,15.57 19.63,15.09C19.36,14.61 19.5,14 20,13.72V13.73C20.6,13.39 21,12.74 21,12A2,2 0 0,0 19,10H17Z" />    
    </g>
    `);

  const cloud = TAPI.SVGShape(`
    <g transform="matrix(1,0,0,1,-3.6256,12.4724)">
    <g transform="matrix(1.18637,0,0,1.18637,-32.16,-17.1965)">
        <clipPath id="_clip1">
            <rect x="41.568" y="31.751" width="18.249" height="9.066"/>
        </clipPath>
        <g clip-path="url(#_clip1)">
            <circle class="cloud" cx="50.693" cy="40.876" r="9.124" style="fill:#F0F0F0;;fill-opacity:0.69;stroke:none;"/>
        </g>
    </g>
    <g transform="matrix(0.960979,0,0,0.960979,-11.9659,-7.99643)">
        <clipPath id="_clip2">
            <rect x="41.568" y="31.751" width="18.249" height="9.066"/>
        </clipPath>
        <g clip-path="url(#_clip2)">
            <circle class="cloud" cx="50.693" cy="40.876" r="9.124" style="fill:#F0F0F0;;fill-opacity:0.64;stroke:none;"/>
        </g>
    </g>
    <g transform="matrix(0.731823,0,0,0.731823,-15.795,1.3572)">
        <clipPath id="_clip3">
            <rect x="41.568" y="31.751" width="18.249" height="9.066"/>
        </clipPath>
        <g clip-path="url(#_clip3)">
            <circle class="cloud" cx="50.693" cy="40.876" r="9.124" style="fill:#F0F0F0;;stroke:none;"/>
        </g>
    </g>
</g>
    `);

  const cloud2 = TAPI.SVGShape(`
<g transform="matrix(1,0,0,1,10.6977,6.9053)">
<g transform="matrix(0.944936,0,0,0.944936,0.43338,-18.0977)">
    <clipPath id="_clip1">
        <rect x="41.568" y="31.751" width="18.249" height="9.066"/>
    </clipPath>
    <g clip-path="url(#_clip1)">
        <circle cx="50.693" cy="40.876" r="9.124" style="fill:#F0F0F0;;stroke:none;;fill-opacity:0.69;"/>
    </g>
</g>
<g transform="matrix(0.765411,0,0,0.765411,16.5178,-10.7699)">
    <clipPath id="_clip2">
        <rect x="41.568" y="31.751" width="18.249" height="9.066"/>
    </clipPath>
    <g clip-path="url(#_clip2)">
        <circle cx="50.693" cy="40.876" r="9.124" style="fill:#F0F0F0;stroke:none;fill-opacity:0.64;"/>
    </g>
</g>
<g transform="matrix(0.58289,0,0,0.58289,13.4679,-3.31981)">
    <clipPath id="_clip3">
        <rect x="41.568" y="31.751" width="18.249" height="9.066"/>
    </clipPath>
    <g clip-path="url(#_clip3)">
        <circle cx="50.693" cy="40.876" r="9.124" style="fill:#F0F0F0;;stroke:none;"/>
    </g>
</g>
</g>
`);

  const raincloud = TAPI.SVGShape(`
  
  <g transform="matrix(1,0,0,1,10.6977,7.9053)">
  <g transform="matrix(1,0,0,1,-3.08213,-3.08213)">
      <g transform="matrix(0.944936,0,0,0.944936,3.51551,-15.0155)">
          <clipPath id="_clip1">
              <rect x="41.568" y="31.751" width="18.249" height="9.066"/>
          </clipPath>
          <g clip-path="url(#_clip1)">
              <circle cx="50.693" cy="40.876" r="9.124" style="fill:rgb(182,182,182);fill-opacity:0.69;stroke: none;"/>
          </g>
      </g>
  </g>
  <g transform="matrix(1,0,0,1,-3.08213,-3.08213)">
      <g transform="matrix(0.765411,0,0,0.765411,19.5999,-7.68776)">
          <clipPath id="_clip2">
              <rect x="41.568" y="31.751" width="18.249" height="9.066"/>
          </clipPath>
          <g clip-path="url(#_clip2)">
              <circle cx="50.693" cy="40.876" r="9.124" style="fill:rgb(182,182,182);fill-opacity:0.64;stroke: none;"/>
          </g>
      </g>
  </g>
  <g transform="matrix(1,0,0,1,-3.08213,-3.08213)">
      <g transform="matrix(0.58289,0,0,0.58289,16.55,-0.237677)">
          <clipPath id="_clip3">
              <rect x="41.568" y="31.751" width="18.249" height="9.066"/>
          </clipPath>
          <g clip-path="url(#_clip3)">
              <circle cx="50.693" cy="40.876" r="9.124" style="fill:rgb(182,182,182);stroke: none;"/>
          </g>
      </g>
  </g>
  <g transform="matrix(1,0,0,1,-3.08213,-3.08213)">
      <g transform="matrix(0.703331,0,0,0.75696,23.2384,10.2218)">
          <rect x="29.986" y="18.677" width="0.33" height="5.233" style="fill:rgb(86,111,151);stroke: none;"/>
      </g>
  </g>
  <g transform="matrix(1,0,0,1,-3.08213,-3.08213)">
      <g transform="matrix(0.703331,0,0,0.75696,27.913,12.2022)">
          <rect x="29.986" y="18.677" width="0.33" height="5.233" style="fill:rgb(86,111,151);stroke: none;"/>
      </g>
  </g>
  <g transform="matrix(1,0,0,1,-3.08213,-3.08213)">
      <g transform="matrix(0.703331,0,0,0.75696,31.749,10.2218)">
          <rect x="29.986" y="18.677" width="0.33" height="5.233" style="fill:rgb(86,111,151);stroke: none;"/>
      </g>
  </g>
  <g transform="matrix(1,0,0,1,-3.08213,-3.08213)">
      <g transform="matrix(0.703331,0,0,0.75696,36.4584,12.2022)">
          <rect x="29.986" y="18.677" width="0.33" height="5.233" style="fill:rgb(86,111,151);stroke: none;"/>
      </g>
  </g>
  <g transform="matrix(1,0,0,1,-3.08213,-3.08213)">
      <g transform="matrix(0.671893,0,0,0.75696,41.3771,10.2218)">
          <rect x="29.986" y="18.677" width="0.33" height="5.233" style="fill:rgb(86,111,151);stroke: none;"/>
      </g>
  </g>


`);
  const raincloud2 = TAPI.SVGShape(`
  
<g transform="matrix(1,0,0,1,-22.6977,20.9053)">
<g transform="matrix(1,0,0,1,-3.08213,-3.08213)">
    <g transform="matrix(0.944936,0,0,0.944936,3.51551,-15.0155)">
        <clipPath id="_clip1">
            <rect x="41.568" y="31.751" width="18.249" height="9.066"/>
        </clipPath>
        <g clip-path="url(#_clip1)">
            <circle cx="50.693" cy="40.876" r="9.124" style="fill:rgb(182,182,182);fill-opacity:0.69;stroke: none;"/>
        </g>
    </g>
</g>
<g transform="matrix(1,0,0,1,-3.08213,-3.08213)">
    <g transform="matrix(0.765411,0,0,0.765411,19.5999,-7.68776)">
        <clipPath id="_clip2">
            <rect x="41.568" y="31.751" width="18.249" height="9.066"/>
        </clipPath>
        <g clip-path="url(#_clip2)">
            <circle cx="50.693" cy="40.876" r="9.124" style="fill:rgb(182,182,182);fill-opacity:0.64;stroke: none;"/>
        </g>
    </g>
</g>
<g transform="matrix(1,0,0,1,-3.08213,-3.08213)">
    <g transform="matrix(0.58289,0,0,0.58289,16.55,-0.237677)">
        <clipPath id="_clip3">
            <rect x="41.568" y="31.751" width="18.249" height="9.066"/>
        </clipPath>
        <g clip-path="url(#_clip3)">
            <circle cx="50.693" cy="40.876" r="9.124" style="fill:rgb(182,182,182);stroke: none;"/>
        </g>
    </g>
</g>
<g transform="matrix(1,0,0,1,-3.08213,-3.08213)">
    <g transform="matrix(0.703331,0,0,0.75696,23.2384,10.2218)">
        <rect x="29.986" y="18.677" width="0.33" height="5.233" style="fill:rgb(86,111,151);stroke: none;"/>
    </g>
</g>
<g transform="matrix(1,0,0,1,-3.08213,-3.08213)">
    <g transform="matrix(0.703331,0,0,0.75696,27.913,12.2022)">
        <rect x="29.986" y="18.677" width="0.33" height="5.233" style="fill:rgb(86,111,151);stroke: none;"/>
    </g>
</g>
<g transform="matrix(1,0,0,1,-3.08213,-3.08213)">
    <g transform="matrix(0.703331,0,0,0.75696,31.749,10.2218)">
        <rect x="29.986" y="18.677" width="0.33" height="5.233" style="fill:rgb(86,111,151);stroke: none;"/>
    </g>
</g>
<g transform="matrix(1,0,0,1,-3.08213,-3.08213)">
    <g transform="matrix(0.703331,0,0,0.75696,36.4584,12.2022)">
        <rect x="29.986" y="18.677" width="0.33" height="5.233" style="fill:rgb(86,111,151);stroke: none;"/>
    </g>
</g>
<g transform="matrix(1,0,0,1,-3.08213,-3.08213)">
    <g transform="matrix(0.671893,0,0,0.75696,41.3771,10.2218)">
        <rect x="29.986" y="18.677" width="0.33" height="5.233" style="fill:rgb(86,111,151);stroke: none;"/>
    </g>
</g>


`);

  //   const sunrise = TAPI.SVGShape(`
  //   <g transform="matrix(0.599218,0,0,0.599218,27.9009,74.1295)">
  //   <g transform="matrix(1,0,0,1,-12,-15)" style="fill:black; stroke: none;">
  //       <path d="M3,12L7,12C7,9.257 9.257,7 12,7C14.743,7 17,9.257 17,12L21,12C21.549,12 22,12.451 22,13C22,13.549 21.549,14 21,14L3,14C2.451,14 2,13.549 2,13C2,12.451 2.451,12 3,12M15,12C15,10.354 13.646,9 12,9C10.354,9 9,10.354 9,12L15,12M12,2L14.39,5.42C13.65,5.15 12.84,5 12,5C11.16,5 10.35,5.15 9.61,5.42L12,2M3.34,7L7.5,6.65C6.9,7.16 6.36,7.78 5.94,8.5C5.5,9.24 5.25,10 5.11,10.79L3.34,7M20.65,7L18.88,10.79C18.74,10 18.47,9.23 18.05,8.5C17.63,7.78 17.1,7.15 16.5,6.64L20.65,7M12.71,16.3L15.82,19.41C16.21,19.8 16.21,20.43 15.82,20.82C15.43,21.21 14.8,21.21 14.41,20.82L12,18.41L9.59,20.82C9.2,21.21 8.57,21.21 8.18,20.82C7.79,20.43 7.79,19.8 8.18,19.41L11.29,16.3C11.5,16.1 11.74,16 12,16C12.26,16 12.5,16.1 12.71,16.3Z" style="fill-rule:nonzero;"/>
  //   </g>
  // </g>
  //     `);

  //   const sunset = TAPI.SVGShape(`
  //   <g transform="matrix(0.599218,0,0,0.599218,65.89,74.1295)">
  //   <g transform="matrix(1,0,0,1,-12,-15)" style="fill:black; stroke: none;">
  //       <path d="M3,12L7,12C7,9.257 9.257,7 12,7C14.743,7 17,9.257 17,12L21,12C21.549,12 22,12.451 22,13C22,13.549 21.549,14 21,14L3,14C2.451,14 2,13.549 2,13C2,12.451 2.451,12 3,12M15,12C15,10.354 13.646,9 12,9C10.354,9 9,10.354 9,12L15,12M12,2L14.39,5.42C13.65,5.15 12.84,5 12,5C11.16,5 10.35,5.15 9.61,5.42L12,2M3.34,7L7.5,6.65C6.9,7.16 6.36,7.78 5.94,8.5C5.5,9.24 5.25,10 5.11,10.79L3.34,7M20.65,7L18.88,10.79C18.74,10 18.47,9.23 18.05,8.5C17.63,7.78 17.1,7.15 16.5,6.64L20.65,7M12.71,20.71L15.82,17.6C16.21,17.21 16.21,16.57 15.82,16.18C15.43,15.79 14.8,15.79 14.41,16.18L12,18.59L9.59,16.18C9.2,15.79 8.57,15.79 8.18,16.18C7.79,16.57 7.79,17.21 8.18,17.6L11.29,20.71C11.5,20.9 11.74,21 12,21C12.26,21 12.5,20.9 12.71,20.71Z" style="fill-rule:nonzero;"/>
  //   </g>
  // </g>
  //  `);

  // TODO??
  // shape
  //   .select("#light")
  //   .attr("fill", data.payload?.ldMode ? "#FAFAFA" : "#212121");
  //   if (data.payload.weatherday) {
  //     shape.select("path").attr("stroke-width", 0);
  //     shape.classed(data.payload.done ? "gly_green_fill" : "gly_red_fill", true);
  //   } else {
  //     shape.select("path").attr("stroke-width", 0);
  //     shape.classed(
  //       data.payload.weatherday ? "gly_orange_fill" : "gly_blue_fill.darken",
  //       true
  //     );
  //   }
  //   shape.select("#light").attr("fill", data.payload.ldMode);

  const title = TAPI.TextCollection(
    data.payload?.title ?? "",
    TAPI.CollectionStyle(100, 95, 0, 40, 10, 10, 2, TAPI.Alignment.Center),
    [
      TAPI.ShapeStyle("stroke-width", "0"),
      TAPI.ShapeStyle("font-weight", "600"),
      TAPI.ShapeStyle("class", "gly_text.white"),
      //   TAPI.ShapeStyle("fill", "#1a1a1a", TAPI.isLight(data.payload?.color)),
      //   TAPI.ShapeStyle("fill", "#ffffff", TAPI.isDark(data.payload?.color)),
      TAPI.ShapeStyle("color", "#1a1a1a"),
      TAPI.ShapeStyle("font-size", "10", true),
      TAPI.ShapeStyle("text-shadow", "0.8px 0.8px 0.1px rgb(80, 80, 80)"),
    ]
  );

  const time = TAPI.TextCollection(
    data.payload?.time.toString() ?? "",
    TAPI.CollectionStyle(100, 95, 0, 25, 10, 10, 2, TAPI.Alignment.Center),
    [
      TAPI.ShapeStyle("font-weight", "400"),
      TAPI.ShapeStyle("stroke-width", "0"),
      TAPI.ShapeStyle("class", "gly_text.white"),
      //   TAPI.ShapeStyle("fill", "#1a1a1a", TAPI.isLight(data.payload?.color)),
      //   TAPI.ShapeStyle("fill", "#ffffff", TAPI.isDark(data.payload?.color)),
      TAPI.ShapeStyle("color", "#1a1a1a"),
      TAPI.ShapeStyle("font-size", "8", true),
      TAPI.ShapeStyle("text-shadow", "0.8px 0.8px 0.1px rgb(80, 80, 80)"),
    ]
  );

  //   let color = "#FF0000";
  //   if (temperature < 20) {
  //     color = "#0000FF";
  //   }

  const temp = TAPI.TextCollection(
    (data.payload?.temp.toString() ?? "") + "°",
    TAPI.CollectionStyle(100, 96, 15, 70, 10, 10, 2, TAPI.Alignment.Center),
    [
      TAPI.ShapeStyle("font-weight", "400"),
      TAPI.ShapeStyle("stroke-width", "0"),
      TAPI.ShapeStyle("class", "gly_text"),
      TAPI.ShapeStyle("class", "themeReactive"),
      // TAPI.ShapeStyle("fill", "#1a1a1a"),
      TAPI.ShapeStyle("font-size", "18", true),
    ]
  );
  //   shape.append(() => sunrise.node());
  //   shape.append(() => sunset.node());

  if (data.payload?.isDay) {
    if (data.payload?.weathertype === "clear") {
      shape.append(() => sunny.node());
      shape.append(() => sunShadow2.node());
      shape.append(() => sunShadow1.node());
      shape.append(() => sun.node());
    } else if (data.payload?.weathertype === "rainy") {
      shape.append(() => rainy.node());
      shape.append(() => sunShadow2.node());
      shape.append(() => sunShadow1.node());
      shape.append(() => sun.node());
      shape.append(() => raincloud.node());
      shape.append(() => raincloud2.node());
    } else if (data.payload?.weathertype === "cloudy") {
      shape.append(() => cloudy.node());
      shape.append(() => sunShadow2.node());
      shape.append(() => sunShadow1.node());
      shape.append(() => sun.node());
      shape.append(() => cloud.node());
      shape.append(() => cloud2.node());
    }
  } else {
    if (data.payload?.weathertype === "clear") {
      shape.append(() => night.node());
      shape.append(() => moonShadow2.node());
      shape.append(() => moonShadow1.node());
      shape.append(() => moon.node());
    } else if (data.payload?.weathertype === "rainy") {
      shape.append(() => rainy.node());
      shape.append(() => moonShadow2.node());
      shape.append(() => moonShadow1.node());
      shape.append(() => moon.node());
    } else if (data.payload?.weathertype === "cloudy") {
      shape.append(() => moonShadow2.node());
      shape.append(() => moonShadow1.node());
      shape.append(() => moon.node());
      shape.append(() => cloudy.node());
      shape.append(() => cloud.node());
      shape.append(() => cloud2.node());
    }
  }

  //   if (data.payload.weathertype === "sunny") {
  //     shape.append(() => sunny.node());
  //     shape.append(() => sunShadow2.node());
  //     shape.append(() => sunShadow1.node());
  //     shape.append(() => sun.node());
  //   } else if (data.payload.weathertype === "rainy") {
  //     shape.append(() => rainy.node());
  //   } else if (data.payload.weathertype === "cloudy") {
  //     shape.append(() => cloudy.node());
  //   }

  shape.append(() => time.node());
  shape.append(() => temp.node());
  shape.append(() => title.node());

  // Light and Dark Mode handling
  TAPI.OnThemeChange(data, (theme) => {
    shape
      .selectAll(".themeReactive")
      .attr("fill", theme === "light" ? "rgb(80, 80, 80)" : "#ffffff");
  });

  return shape;
}
