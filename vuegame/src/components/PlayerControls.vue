<template>
  <transition-group name="controls">
    <div v-if="introIsFinished" class="playerControls">
      <!-- <button @click="$emit('someEvent')">Click it</button> -->
      <div>
        <div>What would you like to do?</div>
        <div class="buttons">
          <button
            v-if="!isGathering || !isBuilding || !isExploring"
            @click="isCurrentlyGathering"
          >
            Gather
          </button>
          <button
            v-if="!isGathering || !isBuilding || !isExploring"
            @click="isCurrentlyExploring"
          >
            Explore
          </button>
          <button
            v-if="!isGathering || !isBuilding || !isExploring"
            @click="isCurrentlyBuilding"
          >
            Build
          </button>
          <!-- <HealPlayer /> -->
        </div>
        <transition-group name="buildButtonGroup">
          <div v-if="isBuilding" class="buildButtons">
            <BuildShelter />
            <ToolCreator />
          </div>
          <div v-if="isGathering">
            <GatherResources @gather-resource="moveCube" />
          </div>
          <div v-if="isExploring">
            <Exploration />
          </div>
        </transition-group>
      </div>
    </div>
  </transition-group>
</template>

<script>
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
    setInterval(() => {
      this.introIsFinished = true;
    }, 500);
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
.buttons {
  display: inline;
}
.controls-enter-active,
.controls-leave-active {
  transition: all 0.5s ease-out;
}
.controls-enter-from,
.controls-leave-to {
  opacity: 0;
  transform: translateX(40px);
}

.playerControls {
  margin-top: 2rem;
}
</style>
>
