<template>
  <div v-if="!gameOver">
    <p>Days Survived: {{ timeSurvived }}</p>
  </div>
</template>

<script>
import { useGame } from "../stores/useGame";

export default {
  setup() {
    const { survival, gameOver } = useGame();
    return { survival, gameOver };
  },
  computed: {
    timeSurvived() {
      return this.survival.daysSurvived;
    },
    gameOver() {
      return this.gameOver;
    },
  },
  created() {
    // setInterval(() => {
    //   const { timeSurvived, winConditionsMet } = useGame();
    //   if (timeSurvived >= winConditionsMet) {
    //     // end the game
    //   }
    // }, 1000);
  },
};
</script>
