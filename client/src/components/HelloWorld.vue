<script setup lang="ts">
import { ref } from "vue";
import { TODOItem } from "../types";
// import Item from "Item.vue";

const textInput = ref("");
const todos = ref<TODOItem[]>([]);

function addBut() {
  if (!textInput.value) return;
  todos.value.push({
    id: Math.random(),
    text: textInput.value,
    done: false,
  });
  textInput.value = "";
}
function delBut() {
  todos.value = todos.value.filter((todo) => !todo.done);
}

function remove(id: number) {
  todos.value = todos.value.filter((todo) => todo.id !== id);
}
</script>

<template>
  <h1>To-Do Liste</h1>
  <div class="card">
    <ul>
      <li
        v-for="todo in todos"
        :key="todo.id"
        :style="{ textDecoration: todo.done ? 'line-through' : '' }"
        @click="() => (todo.done = !todo.done)"
      >
        {{ todo.text }}
        <button @click="remove(todo.id)">🗑️</button>
      </li>
    </ul>
    <input v-model="textInput" type="text" autofocus @keyup.enter="addBut" />
    <button @click="addBut">Add</button>
    <button @click="delBut">Del</button>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
