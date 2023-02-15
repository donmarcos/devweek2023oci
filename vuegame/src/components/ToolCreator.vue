<template>
  <div class="toolCreatorButtons">
    <div>Tools:</div>
    <div v-for="(tool, index) in tools" :key="index">
      <button
        @click="createTool(tool.name)"
        :disabled="!canCreate(tool.cost) || this.userTools.includes(tool.name)"
      >
        {{ tool.name }}
      </button>
    </div>
  </div>
</template>

<script>
import { useGame } from "../stores/useGame";

export default {
  setup() {
    const { resources, createTool, canCreate, tools, userTools, hasTool } =
      useGame();

    return { resources, createTool, canCreate, tools, userTools, hasTool };
  },
  computed: {
    tools() {
      return this.tools;
    },
    userTools() {
      return this.userTools;
    },
  },
};
</script>
<style scoped>
.toolCreatorButtons {
  margin-top: 1rem;
  margin-left: 1rem;
}
</style>
