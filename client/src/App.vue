<script setup lang="ts">
import type { TODOItem } from "./types";
import { ref } from "vue";
import List from "./components/List.vue";
import Graph from "./components/Graph.vue";

const view = ref<"list" | "graph">("graph");
const todos = ref<TODOItem[]>([]);

fetch("/api/todos", {
  method: "GET",
})
  .then((res) => res.json())
  .then((data) => (todos.value = data));

const ws = new WebSocket("ws://${location.host}/");
ws.onmessage = (event) => {
  todos.value = JSON.parse(event.data);
};

function postTodos() {
  fetch("/api/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todos.value),
  });
}
function add(todo: TODOItem) {
  todos.value.push(todo);
  postTodos();
}
function toggle(id: number) {
  const todo = todos.value.find((todo) => todo.id === id);
  if (!todo) return;
  todo.done = !todo.done;
  postTodos();
}
function remove(id: number) {
  todos.value = todos.value.filter((todo) => todo.id !== id);
  postTodos();
}
function clear() {
  todos.value = todos.value.filter((todo) => todo.done === false);
  postTodos();
}
</script>

<template>
  <div style="position: absolute; top: 15px; right: 15px; z-index: 1000">
    <button @click="() => (view = 'list')">List</button>
    <button @click="() => (view = 'graph')">Graph</button>
  </div>
  <List
    v-if="view == 'list'"
    :todos="todos"
    @add="add"
    @toggle="toggle"
    @remove="remove"
    @clear="clear"
  />
  <Graph v-if="view == 'graph'" :todos="todos" @toggle="toggle" />
</template>
