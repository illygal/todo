<script setup lang="ts">
import type { TODOItem } from "../types";
import { ref, computed, onMounted, watch, handleError, render } from "vue";
import GraphlyD3 from "@livereader/graphly-d3/component/vue3";
import "@livereader/graphly-d3/style.css";
import { ForceSimulation, Graph, Node } from "@livereader/graphly-d3";
import Anchor from "../templates/anchor";
import Checkmark from "../templates/checkmark";
import Weather, { type Schema as WeatherSchema } from "../templates/weather";
import Annotation from "../templates/annotation";
import dictionary from "../templates/dictionary";
import * as crypto from "crypto";

const emit = defineEmits(["toggle"]);
const props = defineProps<{ todos: TODOItem[] }>();
const graphly = ref<typeof GraphlyD3>({} as typeof GraphlyD3);

const simulation = computed<ForceSimulation>(() => graphly.value.simulation);
const temperature = ref("0");
const daytime = ref("day");
const modi = ref("light");
const timeColor = ref("#FFFFFF");
const weathertype = ref<
  "clear" | "cloudy" | "rainy" | "snowy" | "windy" | "foggy"
>("clear");
const ringColor = ref({ outer: "", middle: "", inner: "" });
const statusColor = ref("#FFFFFF");
const showMoon = ref(false);

const graph: Graph = {
  nodes: [],
  links: [],
};
const position: Map<string, { x: number; y: number }> = new Map();
let showChecked = true;
let showUnChecked = true;
let stacked_done = false;
let stacked_not_done = false;

const green = "#81c784";
const red = "#e57373";

function renderGraph() {
  graph.nodes = [
    {
      id: "done",
      shape: {
        type: "anchor",
        scale: 1,
        // url: "https://cdn.graphly.dev/@jason-rietzke/demo-hexagon/1.1.1",
      },
      x: 150,
      y: 0,
      anchor: {
        type: "soft",
        x: 150,
        y: 0,
      },
      payload: {
        title: "Checked",
        show: showChecked,
        color: green,
        stacked: stacked_done,
      },
    },
    {
      id: "notdone",
      shape: {
        type: "anchor",
        scale: 1,
        //  url: "https://cdn.graphly.dev/@jason-rietzke/demo-hexagon/1.1.1",
      },
      anchor: {
        type: "soft",
        x: 0,
        y: 0,
      },
      payload: {
        title: "Unchecked\nNoob Lockdown",
        show: showUnChecked,
        color: red,
        stacked: stacked_not_done,
      },
    },
    {
      id: "weatherday",
      shape: {
        type: "weather",
        scale: 5,
      },
      x: 400,
      y: 400,
      anchor: {
        type: "soft",
        x: 400,
        y: 400,
      },
      payload: {
        title: "Birkenfeld",
        daytype: daytime.value,
        moon: showMoon.value,
        temp: parseFloat(temperature.value),
        size: 200,
        weathertype: weathertype.value,
        ringColor: {
          outer: ringColor.value.outer,
          middle: ringColor.value.middle,
          inner: ringColor.value.inner,
        },
        timeColor: timeColor.value,
        time: new Date().toLocaleTimeString("de", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      } as WeatherSchema,
    },
    {
      id: "annotation",
      shape: {
        type: "annotation",
        scale: 10,
      },

      x: 700,
      y: 0,
      anchor: {
        type: "soft",
        x: 700,
        y: 0,
      },
      payload: {
        label: "Some Annotation",
        description: "Some annotation",
        color: statusColor.value,
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>ambulance</title><path d="M18,18.5A1.5,1.5 0 0,0 19.5,17A1.5,1.5 0 0,0 18,15.5A1.5,1.5 0 0,0 16.5,17A1.5,1.5 0 0,0 18,18.5M19.5,9.5H17V12H21.46L19.5,9.5M6,18.5A1.5,1.5 0 0,0 7.5,17A1.5,1.5 0 0,0 6,15.5A1.5,1.5 0 0,0 4.5,17A1.5,1.5 0 0,0 6,18.5M20,8L23,12V17H21A3,3 0 0,1 18,20A3,3 0 0,1 15,17H9A3,3 0 0,1 6,20A3,3 0 0,1 3,17H1V6C1,4.89 1.89,4 3,4H17V8H20M8,6V9H5V11H8V14H10V11H13V9H10V6H8Z" /></svg>`,
      },
    },
    {
      id: "dictionary",

      shape: {
        type: "dictionary",
        scale: 10,
      },
      x: 2000,
      y: 0,
      anchor: {
        type: "soft",
        x: 2000,
        y: 0,
      },

      payload: {
        label: "MountEverestkrasseyblabliblubtestundsooders",
        description:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perferendis, possimus?",
        color: statusColor.value,
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>ambulance</title><path d="M18,18.5A1.5,1.5 0 0,0 19.5,17A1.5,1.5 0 0,0 18,15.5A1.5,1.5 0 0,0 16.5,17A1.5,1.5 0 0,0 18,18.5M19.5,9.5H17V12H21.46L19.5,9.5M6,18.5A1.5,1.5 0 0,0 7.5,17A1.5,1.5 0 0,0 6,15.5A1.5,1.5 0 0,0 4.5,17A1.5,1.5 0 0,0 6,18.5M20,8L23,12V17H21A3,3 0 0,1 18,20A3,3 0 0,1 15,17H9A3,3 0 0,1 6,20A3,3 0 0,1 3,17H1V6C1,4.89 1.89,4 3,4H17V8H20M8,6V9H5V11H8V14H10V11H13V9H10V6H8Z" /></svg>`,
        url: "https://www.wikidata.org/wiki/Q513",
      },
    },
    {
      id: "dictionary2",
      shape: {
        type: "dictionary",
        scale: 10,
      },
      gravity: 0,
      satellite: {
        angle: 110,
        distance: 3000,
        source: "dictionary",
      },
      payload: {
        label: "Erde",
        description:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perferendis, possimus?",
        color: statusColor.value,
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>ambulance</title><path d="M18,18.5A1.5,1.5 0 0,0 19.5,17A1.5,1.5 0 0,0 18,15.5A1.5,1.5 0 0,0 16.5,17A1.5,1.5 0 0,0 18,18.5M19.5,9.5H17V12H21.46L19.5,9.5M6,18.5A1.5,1.5 0 0,0 7.5,17A1.5,1.5 0 0,0 6,15.5A1.5,1.5 0 0,0 4.5,17A1.5,1.5 0 0,0 6,18.5M20,8L23,12V17H21A3,3 0 0,1 18,20A3,3 0 0,1 15,17H9A3,3 0 0,1 6,20A3,3 0 0,1 3,17H1V6C1,4.89 1.89,4 3,4H17V8H20M8,6V9H5V11H8V14H10V11H13V9H10V6H8Z" /></svg>`,
        url: "https://www.wikidata.org/wiki/Q2",
      },
    },
    {
      id: "dictionary3",
      shape: {
        type: "dictionary",
        scale: 10,
      },
      gravity: -9000000,
      satellite: {
        type: "soft",
        angle: 55,
        distance: 2000,
        source: "dictionary",
      },
      payload: {
        label: "Eren Jaeger",
        description:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perferendis, possimus?",
        color: statusColor.value,
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>ambulance</title><path d="M18,18.5A1.5,1.5 0 0,0 19.5,17A1.5,1.5 0 0,0 18,15.5A1.5,1.5 0 0,0 16.5,17A1.5,1.5 0 0,0 18,18.5M19.5,9.5H17V12H21.46L19.5,9.5M6,18.5A1.5,1.5 0 0,0 7.5,17A1.5,1.5 0 0,0 6,15.5A1.5,1.5 0 0,0 4.5,17A1.5,1.5 0 0,0 6,18.5M20,8L23,12V17H21A3,3 0 0,1 18,20A3,3 0 0,1 15,17H9A3,3 0 0,1 6,20A3,3 0 0,1 3,17H1V6C1,4.89 1.89,4 3,4H17V8H20M8,6V9H5V11H8V14H10V11H13V9H10V6H8Z" /></svg>`,
        url: "https://www.wikidata.org/wiki/Q35535",
      },
    },
    {
      id: "dictionary4",
      shape: {
        type: "dictionary",
        scale: 10,
      },
      gravity: -9000000,
      satellite: {
        type: "soft",
        angle: 55,
        distance: 5000,
        source: "dictionary",
      },
      payload: {
        label: "Cat",
        description: "Kittycat",
        color: statusColor.value,
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>cat</title><path d="M12,8L10.67,8.09C9.81,7.07 7.4,4.5 5,4.5C5,4.5 3.03,7.46 4.96,11.41C4.41,12.24 4.07,12.67 4,13.66L2.07,13.95L2.28,14.93L4.04,14.67L4.18,15.38L2.61,16.32L3.08,17.21L4.53,16.32C5.68,18.76 8.59,20 12,20C15.41,20 18.32,18.76 19.47,16.32L20.92,17.21L21.39,16.32L19.82,15.38L19.96,14.67L21.72,14.93L21.93,13.95L20,13.66C19.93,12.67 19.59,12.24 19.04,11.41C20.97,7.46 19,4.5 19,4.5C16.6,4.5 14.19,7.07 13.33,8.09L12,8M9,11A1,1 0 0,1 10,12A1,1 0 0,1 9,13A1,1 0 0,1 8,12A1,1 0 0,1 9,11M15,11A1,1 0 0,1 16,12A1,1 0 0,1 15,13A1,1 0 0,1 14,12A1,1 0 0,1 15,11M11,14H13L12.3,15.39C12.5,16.03 13.06,16.5 13.75,16.5A1.5,1.5 0 0,0 15.25,15H15.75A2,2 0 0,1 13.75,17C13,17 12.35,16.59 12,16V16H12C11.65,16.59 11,17 10.25,17A2,2 0 0,1 8.25,15H8.75A1.5,1.5 0 0,0 10.25,16.5C10.94,16.5 11.5,16.03 11.7,15.39L11,14Z" /></svg>`,
        url: "",
        symbolId: "",
      },
    },
    {
      id: "dictionary5",

      shape: {
        type: "dictionary",
        scale: 10,
      },
      gravity: -9000000,
      satellite: {
        type: "soft",
        angle: 55,
        distance: 5000,
        source: "dictionary",
      },

      payload: {
        label: "?",
        description:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perferendis, possimus?",
        color: statusColor.value,
        svg: "",
        url: "",
        symbolId: "",
      },
    },
  ];
  graph.links = [
    {
      source: "dictionary",
      target: "dictionary2",
      directed: true,
      strength: "loose",
    },
    {
      source: "dictionary",
      target: "dictionary3",
      directed: true,
      strength: "loose",
    },
  ];
  props.todos.forEach((todo) => {
    const prePos = position.get(todo.id.toString());
    if (todo.done && !showChecked) return;
    if (!todo.done && !showUnChecked) return;
    graph.nodes.push({
      id: todo.id.toString(),
      shape: {
        type: "checkmark",
        scale: 1,
      },
      x: prePos?.x,
      y: prePos?.y,
      spawn: prePos
        ? undefined
        : {
            source: todo.done ? "done" : "notdone",
            angle: Math.random() * 180 + (todo.done ? 0 : 180),
            distance: 400,
          },
      payload: {
        done: todo.done,
        title: todo.text,
      },
    });

    graph.links.push({
      source: todo.done ? "done" : "notdone",
      target: todo.id.toString(),
      directed: true,
    });
  });
  console.log(simulation.value.graph.nodes);
  simulation.value.render(graph, 0.5);
}

function nodeClick(_e: any, node: Node) {
  if (node.id === "done") {
    showChecked = !showChecked;
    stacked_done = !stacked_done;
  } else if (node.id === "notdone") {
    showUnChecked = !showUnChecked;
    stacked_not_done = !stacked_not_done;
  } else {
    emit("toggle", parseFloat(node.id));
  }
  renderGraph();
}

function nodeDragEnd(_e: any, node: Node, pos: { x: number; y: number }) {
  position.set(node.id, pos);
}
function handleTick() {
  graph.nodes.forEach((node) => {
    position.set(node.id, { x: node.x ?? 0, y: node.y ?? 0 });
  });
}

onMounted(() => {
  simulation.value.templateStore.add("checkmark", Checkmark);
  simulation.value.templateStore.add("anchor", Anchor);
  simulation.value.templateStore.add("weather", Weather);
  simulation.value.templateStore.add("annotation", Annotation);
  simulation.value.templateStore.add("dictionary", dictionary);
  setTimeout(() => {
    renderGraph();
    setInterval(() => renderGraph(), 60000);
  }, (60 - new Date().getSeconds()) * 1000);
  renderGraph();
});
watch(
  () => props.todos,
  () => renderGraph(),
  { deep: true }
);

function changeMode(currMod: "light" | "dark") {
  modi.value = currMod;
}

function changeDay(
  timeOfDay: "day" | "night" | "dawn" | "grey" | "blue" | "custom"
) {
  daytime.value = timeOfDay;
  renderGraph();
}

function changeWeatherType(
  weather: "clear" | "rainy" | "cloudy" | "snowy" | "windy" | "foggy"
) {
  weathertype.value = weather;
  renderGraph();
}

function toggleShowMoon() {
  if (showMoon.value) {
    showMoon.value = false;
  } else showMoon.value = true;

  renderGraph();
}

function generatePassword(password: string): { salt: string; hash: string } {
  const salt = crypto.randomBytes(32).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 100000, 64, "sha512")
    .toString("hex");
  return { salt, hash };
}

generatePassword(pw);
</script>

<template>
  <div style="position: absolute; top: 55px; right: 15px; z-index: 1000">
    <input
      @change="renderGraph()"
      type="range"
      v-model="temperature"
      id="temp"
      name="Temperatur"
      min="-20"
      max="60" />
    <div>
      <div>
        <p>Outer</p>
        <input type="text" v-model="ringColor.outer" id="outer" name="Outer" />
        <p>Middle</p>
        <input
          type="text"
          v-model="ringColor.middle"
          id="middle"
          name="Middle" />
        <p>Inner</p>
        <input type="text" v-model="ringColor.inner" id="inner" name="Inner" />
      </div>
      <div>
        <p>Time Color</p>
        <input
          type="text"
          v-model="timeColor"
          @keypress.enter="renderGraph()"
          id="timeCol"
          name="TimeColor" />
      </div>
      <button id="light" @click="changeMode('light')">Light</button>
      <button id="dark" @click="changeMode('dark')">Dark</button>
    </div>
    <div>
      <button id="cloudy" @click="changeWeatherType('cloudy')">☁️</button>
      <button id="sunny" @click="changeWeatherType('clear')">☀️</button>
      <button id="rainy" @click="changeWeatherType('rainy')">🌧️</button>
      <button id="snowy" @click="changeWeatherType('snowy')">🌨️</button>
      <button id="windy" @click="changeWeatherType('windy')">💨</button>
      <button id="foggy" @click="changeWeatherType('foggy')">🌫️</button>
    </div>
    <div>
      <button id="moon" @click="toggleShowMoon()">🌝</button>
    </div>
    <div>
      <button id="day" @click="changeDay('day')">Tag</button>
      <button id="night" @click="changeDay('night')">Nacht</button>
      <button id="dawn" @click="changeDay('dawn')">Dawn</button>
      <button id="grey" @click="changeDay('grey')">Grey</button>
      <button id="blue" @click="changeDay('blue')">Blue</button>
      <button id="custom" @click="changeDay('custom')">Custom</button>
    </div>
    <div>
      <input v-model="statusColor" @keypress.enter="renderGraph()" />
    </div>
  </div>
  <GraphlyD3
    ref="graphly"
    class="graphly-canvas"
    :dark="modi === 'dark'"
    :env-gravity="0"
    @node-click="nodeClick"
    @node-drag-end="nodeDragEnd"
    @simulation-tick="handleTick" />
</template>

<style>
/* .ss1,
.ss2 {
  animation: sun-rays 4s infinite;
}
@keyframes sun-rays {
  0% {
    r: 10px;
  }
  50% {
    r: 11px;
  }
  100% {
    r: 10px;
  }
} */

.cloud {
  animation: cloud-rays 4s infinite;
}
</style>
