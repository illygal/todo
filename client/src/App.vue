<script setup lang="ts">
import type { TODOItem } from "./types";
import Item from "./components/Item.vue";
import { ref } from "vue";

const textInput = ref("");
const todos = ref<TODOItem[]>([]);

function addTodo() {
  if (!textInput.value) return;
  todos.value.push({
    id: Math.random(),
    text: textInput.value,
    done: false,
  });
  textInput.value = "";
}
function toggleTodo(id: number) {
  const todo = todos.value.find((todo) => todo.id === id);
  if (!todo) return;
  todo.done = !todo.done;
}
function removeTodo(id: number) {
  todos.value = todos.value.filter((todo) => todo.id !== id);
}
function clear() {
  todos.value = todos.value.filter((todo) => todo.done === false);
}
</script>

<template>
  <h1>TODO</h1>
  <Item
    v-for="todo in todos"
    :key="todo.id"
    :item="todo"
    @toggle="toggleTodo"
    @remove="removeTodo"
  />
  <input v-model="textInput" autofocus @keyup.enter="addTodo" />
  <button @click="addTodo">Add</button>
  <button @click="clear">Clear</button>
</template>
