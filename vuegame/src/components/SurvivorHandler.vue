<template>
  <div v-if="survivors > 0">Survivors: {{ survivors }}</div>
</template>

<script>
import { useGame } from "../stores/useGame";

export default {
  setup() {
    const { exploration, triggerSurvivorStory, triggerSurvivorStory2 } =
      useGame();

    return { exploration, triggerSurvivorStory, triggerSurvivorStory2 };
  },
  data() {
    return {
      storyIsTriggered: false,
    };
  },
  updated() {
    let intervalId = setInterval(() => {
      this.triggerSurvivorStory();
      clearInterval(intervalId);
    }, 7000);
    let intervalId2 = setInterval(() => {
      this.triggerSurvivorStory2();
      clearInterval(intervalId2);
    }, 15000);
    // let intervalId3 = setInterval(() => {
    //   this.triggerSurvivorStory3();
    //   clearInterval(intervalId3);
    // }, 20000);
  },
  computed: {
    survivors() {
      return this.exploration.survivors;
    },
  },
};
</script>

<style></style>
