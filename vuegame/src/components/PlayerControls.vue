<template>
  <transition-group name="controls">
    <div v-if="introIsFinished" class="controls-container">
      <div class="controls-header">
        <div>What would you like to do?</div>
        <div class="action-buttons">
          <Button
            v-if="!isGathering || !isBuilding || !isExploring"
            @click="isCurrentlyGathering"
            buttonText="Gather"
          />

          <Button
            v-if="!isGathering || !isBuilding || !isExploring"
            @click="isCurrentlyExploring"
            buttonText="Explore"
          />

          <Button
            v-if="!isGathering || !isBuilding || !isExploring"
            @click="isCurrentlyBuilding"
            buttonText="Build"
          />
        </div>
      </div>
      <transition-group name="buildButtonGroup">
        <div v-if="isBuilding" class="build-container">
          <BuildShelter />
          <br />
          <ToolCreator />
        </div>
        <div v-if="isGathering" class="gather-container">
          <GatherResources @gather-resource="moveCube" />
        </div>
        <div v-if="isExploring" class="explore-container">
          <Exploration />
        </div>
      </transition-group>
    </div>
  </transition-group>
</template>

<script>
import Button from "./Button.vue";
import ToolCreator from "./ToolCreator.vue";
import BuildShelter from "./BuildShelter.vue";
import GatherResources from "./GatherResources.vue";
import Exploration from "./Exploration.vue";
import HealPlayer from "./HealPlayer.vue";

export default {
  emits: ["someEvent"],
  components: {
    ToolCreator,
    BuildShelter,
    GatherResources,
    Exploration,
    HealPlayer,
    Button,
  },

  data() {
    return {
      isBuilding: false,
      isGathering: false,
      isExploring: false,
      introIsFinished: false,
    };
  },
  actions: {},
  mounted() {
    //timer to render player controls after into text is finished.
    let intervalId = setInterval(() => {
      this.introIsFinished = true;
      clearInterval(intervalId);
    }, 12500);
  },

  methods: {
    moveCube() {
      this.$emit("someEvent");
    },

    isCurrentlyGathering() {
      this.isGathering = true;
      this.isBuilding = false;
      this.isExploring = false;
    },
    isCurrentlyBuilding() {
      this.isGathering = false;
      this.isBuilding = true;
      this.isExploring = false;
    },
    isCurrentlyExploring() {
      this.isGathering = false;
      this.isBuilding = false;
      this.isExploring = true;
    },
  },
};
</script>

<style scoped>
.controls-enter-active,
.controls-leave-active {
  transition: all 0.5s ease-out;
}
.controls-enter-from,
.controls-leave-to {
  opacity: 0;
  transform: translateX(40px);
}
.controls-container {
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.controls-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.action-buttons {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
/* 
.gather-button,
.explore-button,
.build-button {
  padding: 8px 16px;
  border: 1px solid gray;
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
} */
.gather-button:hover,
.explore-button:hover,
.build-button:hover {
  background-color: dimgrey;
  color: aliceblue;
  transition: all 0.7s;
  transition-timing-function: ease-out;
}

.gather-container,
.explore-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
</style>
>
