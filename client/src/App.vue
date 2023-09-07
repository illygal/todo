<script setup lang="ts">
import type { TODOItem } from "./types";
import Item from "./components/Item.vue";
import { ref } from "vue";

const textInput = ref("");
const todos = ref<TODOItem[]>([]);

fetch("/api/todos", {
  method: "GET",
})
  .then((res) => res.json())
  .then((data) => (todos.value = data));

function postTodos() {
  fetch("/api/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todos.value),
  });
}

function addTodo() {
  if (!textInput.value) return;
  todos.value.push({
    id: Math.random(),
    text: textInput.value,
    done: false,
  });
  textInput.value = "";
  postTodos();
}
function toggleTodo(id: number) {
  const todo = todos.value.find((todo) => todo.id === id);
  if (!todo) return;
  todo.done = !todo.done;
  postTodos();
}
function removeTodo(id: number) {
  todos.value = todos.value.filter((todo) => todo.id !== id);
  postTodos();
}
function clear() {
  todos.value = todos.value.filter((todo) => todo.done === false);
  postTodos();
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
