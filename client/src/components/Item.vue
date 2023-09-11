<script setup lang="ts">
import type { TODOItem } from "../types";

defineProps<{ item: TODOItem }>();
const emit = defineEmits(["toggle", "remove"]);
</script>

<template>
  <div class="item">
    <!-- <span
      @click="emit('toggle', item.id)"
      :style="{ textDecoration: item.done ? 'line-through' : '' }"
    >
      {{ item.done ? "✅" : "⬜" }}
      {{ item.text }}
    </span> -->
    <input
      type="checkbox"
      id="checkbox"
      :checked="item.done"
      @click="emit('toggle', item.id)"
    />
    <span :style="{ textDecoration: item.done ? 'line-through' : '' }">
      <span class="todo-text">{{ item.text }}</span>
    </span>
    <span class="trash"
      ><button id="tc" @click="emit('remove', item.id)">🗑️</button></span
    >
  </div>
</template>

<style>
.trash {
  margin-left: auto;
  margin-right: 0;
}
/* #checkbox {
  flex: 3;
} */
</style>
