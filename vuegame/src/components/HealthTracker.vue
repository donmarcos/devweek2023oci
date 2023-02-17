<template>
  <div>
    <div v-if="gameOver && gameMode != 'multiPlayer'">You Have Died</div>
    <div v-if="health > 0 && gameMode != 'multiPlayer'">
      Health: {{ health }}
    </div>
  </div>
</template>

<script>
import { useGame } from "../stores/useGame";

export default {
  setup() {
    const { health, survival, gameMode } = useGame();
    return { health, survival, gameMode };
  },
  computed: {
    health() {
      return this.health.playerHealth;
    },
    gameOver() {
      return this.survival.gameOver;
    },
    gameMode() {
      return this.gameMode;
    },
  },
};
</script>
