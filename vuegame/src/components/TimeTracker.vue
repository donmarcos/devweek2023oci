<template>
  <div v-if="!gameOver" class="timeTracker">
    <p>Days Survived: {{ timeSurvived }}</p>
  </div>
</template>

<script>
import { useGame } from "../stores/useGame";

export default {
  data() {
    return {
      introIsFinished: false,
    };
  },
  setup() {
    const { survival, gameOver } = useGame();
    return { survival, gameOver };
  },
  mounted() {
    let intervalId = setInterval(() => {
      this.introIsFinished = true;
      clearInterval(intervalId);
    }, 12500);
  },
  computed: {
    timeSurvived() {
      return this.survival.daysSurvived;
    },
    gameOver() {
      return this.gameOver;
    },
  },
};
</script>
<style scoped>
.timeTracker {
  margin-top: 4rem;
}
</style>
