<script setup lang="ts">
import type { TODOItem } from "../types";

defineProps<{ item: TODOItem }>();
const emit = defineEmits(["toggle", "remove"]);
</script>

<template>
  <div>
    <span
      @click="emit('toggle', item.id)"
      :style="{ textDecoration: item.done ? 'line-through' : '' }"
    >
      {{ item.done ? "✅" : "⬜" }}
      {{ item.text }}
    </span>
    <!-- <input type="checkbock" id="checkbox" :checked="true" /> -->
    <button @click="emit('remove', item.id)">🗑️</button>
  </div>
</template>
