<template>
  <div>
    <div v-if="!gameOver && !gameWon">
      <TimeTracker />
      <DangerHandler />

      <Inventory />

      <Story />
      <BabylonScene />
      <div class="playerControls">
        <PlayerControls />
      </div>
    </div>
    <transition-group name="game">
      <div v-if="gameOver">
        <h2>You Have Died!</h2>
        <br />
        <button @click="reloadPage">Restart</button>
      </div>
      <div v-if="gameWon">
        <h2>You Have Won!</h2>
        <button @click="reloadPage">Restart</button>
      </div>
    </transition-group>
  </div>
</template>

<script>
import TimeTracker from "../components/TimeTracker.vue";
import DangerHandler from "../components/DangerHandler.vue";
import BabylonScene from "../components/BabylonScene.vue";

import PlayerControls from "../components/PlayerControls.vue";
import Inventory from "../components/Inventory.vue";
import Story from "../components/Story.vue";
import { useGame } from "../stores/useGame";

export default {
  name: "Game",
  components: {
    TimeTracker,
    DangerHandler,
    BabylonScene,
    PlayerControls,
    Story,

    Inventory,
  },
  setup() {
    const { survival } = useGame();
    return { survival };
  },
  computed: {
    gameOver() {
      return this.survival.gameOver;
    },
    gameWon() {
      return this.survival.gameWon;
    },
  },
  methods: {
    reloadPage() {
      window.location.reload();
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  height: 100%;
}
.healthTracker {
  display: flex;

  align-items: flex-start;
  padding: 1.5rem;
}
.healPlayer {
  display: flex;

  align-items: flex-start;
  padding-left: 1.5rem;
}
.storyLines {
  padding-bottom: 50px;
}
.toolTracker {
  padding: 1.5rem;
}
.playerControls {
  display: flex;
  flex-direction: row;

  justify-content: center;
}
.introMessage {
  display: flex;
  align-items: center;
  justify-content: center;
}
.survivorHandler {
  display: flex;

  align-items: flex-start;
  padding: 1.5rem;
}
</style>
