<script setup lang="ts">
import type { TODOItem } from "../types";
import { ref, computed, onMounted, watch, handleError } from "vue";
import GraphlyD3 from "@livereader/graphly-d3/component/vue3";
import "@livereader/graphly-d3/style.css";
import { ForceSimulation, Graph, Node } from "@livereader/graphly-d3";
import Anchor from "../templates/anchor";
import Checkmark from "../templates/checkmark";
import Weather from "../templates/weather";

const emit = defineEmits(["toggle"]);
const props = defineProps<{ todos: TODOItem[] }>();
const graphly = ref<typeof GraphlyD3>({} as typeof GraphlyD3);
// const graphly = ref<ForceSimulation>({} as ForceSimulation);
const simulation = computed<ForceSimulation>(() => graphly.value.simulation);
const temperature = ref(0);
const daytime = ref("day");
const modi = ref("light");
const weathertype = ref("sunny");
// watch(
//   () => temperature.value,
//   () => renderGraph()
// );
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
  graph.links = [];
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
      x: 0,
      y: 400,
      anchor: {
        type: "soft",
        x: 0,
        y: 400,
      },
      payload: {
        title: "Birkenfeld",
        color: "#000000",
        ldMode: modi.value === "light",
        weatherday: daytime.value === "day",
        temp: temperature.value,
        weathertype: weathertype.value,
        time: new Date().toLocaleTimeString("de", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
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
  // if (todo.done == true) {
  //   graph.links.push({
  //     source: "0",
  //     target: todo.id.toString(),
  //     directed: true,
  //   });
  // } else {
  //   graph.links.push({
  //     source: "1",
  //     target: todo.id.toString(),
  //     directed: true,
  // }
  //Falls keine Kinder, Node ausblenden

  // graph.nodes = graph.nodes.filter((node) => {
  //   if (node.id !== "done" && node.id !== "notdone") return true;
  //   for (let i = 0; i < graph.links.length; i++) {
  //     if (graph.links[i].source === node.id) {
  //       return true;
  //     }
  //   }
  //   return false;
  // });

  console.log(simulation.value.graph.nodes);
  simulation.value.render(graph, 0.5);
}

// function nodeClick(_e: any, node: Node) {
//   if (node.id === "done" || node.id === "notdone") return;
//   emit("toggle", parseFloat(node.id));
// }

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
  renderGraph();
}

function changeDay(timeOfDay: "day" | "night") {
  modi.value = timeOfDay;
  renderGraph();
}

function changeWeatherType(weather: "sunny" | "rainy" | "cloudy") {
  weathertype.value = weather;
  renderGraph();
}

// function textGradient(_e: any, temp.value){}
//   props.todos.forEach((todo) => {
//     graph.nodes.push({
//       id: todo.id.toString(),
//       shape: {
//         type: "",
//         scale: 1,
//         url: "https://cdn.graphly.dev/@jason-rietzke/demo-hexagon/1.1.1",
//       },
//       spawn: {
//         source: "0",
//         angle: Math.random() * 360,
//         distance: 200,
//       },
//       payload: {
//         title: todo.text,
//         color: todo.done ? "#6a6add" : "#69ffff",
//       },
//     });

//     graph.links.push({
//       source: todo.done ? "done" : "notdone",
//       target: todo.id.toString(),
//       directed: true,
//     });

//     // if (todo.done == true) {
//     //   graph.links.push({
//     //     source: "0",
//     //     target: todo.id.toString(),
//     //     directed: true,
//     //   });
//     // } else {
//     //   graph.links.push({
//     //     source: "1",
//     //     target: todo.id.toString(),
//     //     directed: true,
//     // }
//     simulation.value.render(graph);
//   });
// });
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
      max="60"
    />
    <div>
      <button id="light" @click="changeMode('light')">Light</button>
      <button id="dark" @click="changeMode('dark')">Dark</button>
    </div>
    <div>
      <button id="cloudy" @click="changeWeatherType('cloudy')">☁️</button>
      <button id="sunny" @click="changeWeatherType('sunny')">☀️</button>
      <button id="rainy" @click="changeWeatherType('rainy')">🌧️</button>
    </div>
    <div>
      <button id="day" @click="changeDay('day')">Tag</button>
      <button id="night" @click="changeDay('night')">Nacht</button>
    </div>
  </div>
  <GraphlyD3
    ref="graphly"
    class="graphly-canvas"
    :env-gravity="0"
    @node-click="nodeClick"
    @node-drag-end="nodeDragEnd"
    @simulation-tick="handleTick"
  />
</template>

<style>
:root {
  --sun-color: #ffe65c;
  --sun-color-rgba: rgb(255, 230, 92);
  --card-sunny: #ffa333;
  --moon-night: #2f3475;
  --moon: #ffe646;
  --moon-wave: rgb(79, 85, 148);
  --snow-day: #1ec9ed;
  --foreground-mountain: #82dff9;
  --background-mountain: #00b4d8;
}
.ss1,
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
}
</style>
