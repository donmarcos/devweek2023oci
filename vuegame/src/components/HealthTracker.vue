<template>
  <div>
    <div v-if="gameOver">You Have Died</div>
    <div v-if="health > 0">Health: {{ health }}</div>
  </div>
</template>

<script>
import { useGame } from "../stores/useGame";

export default {
  setup() {
    const { health, survival } = useGame();
    return { health, survival };
  },
  computed: {
    health() {
      return this.health.playerHealth;
    },
    gameOver() {
      return this.survival.gameOver;
    },
  },
};
</script>
