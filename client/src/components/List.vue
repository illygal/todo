<script setup lang="ts">
import type { TODOItem } from "../types";
import Item from "./Item.vue";
import { ref } from "vue";

defineProps<{ todos: TODOItem[] }>();
const emit = defineEmits(["add", "toggle", "remove", "clear"]);

const textInput = ref("");
const temperature = ref("");

function add() {
  if (!textInput.value) return;
  emit("add", {
    id: Math.random(),
    text: textInput.value,
    done: false,
  });
  textInput.value = "";
}
function toggle(id: number) {
  emit("toggle", id);
}
function remove(id: number) {
  emit("remove", id);
}
function clear() {
  emit("clear");
}
</script>

<template>
  <h1>TODO</h1>
  <Item
    v-for="todo in todos"
    :key="todo.id"
    :item="todo"
    @toggle="toggle(todo.id)"
    @remove="remove(todo.id)"
  />
  <input v-model="textInput" type="text" autofocus @keyup.enter="add" />
  <button @click="add">Add</button>
  <button @click="clear">Clear</button>
  <input
    type="range"
    v-model="temperature"
    id="temp"
    name="Temperatur"
    min="-20"
    max="60"
  />
  <label for="heat">Temperatur:</label>
  <output id="value">{{ temperature }}°C</output>
</template>
