<template>
  <div v-if="health > 0" class="gatherButtons">
    <button
      id="gather-wood"
      v-if="canGather"
      @click="gather('wood', 1)"
      :disabled="isWoodDisabled"
    >
      Gather Wood
    </button>
    <button
      v-if="canGather"
      @click="gather('stone', 1)"
      :disabled="isStoneDisabled"
    >
      Gather Stone
    </button>
    <button
      v-if="canGather"
      @click="gather('food', 2)"
      :disabled="isFoodDisabled"
    >
      Gather Food
    </button>
    <div v-else>You cannot gather resources right now.</div>
  </div>
</template>

<script>
import { useGame } from "../stores/useGame";

export default {
  emits: ["gatherResource"],
  data() {
    return {
      isWoodDisabled: false,
      isStoneDisabled: false,
      isFoodDisabled: false,
    };
  },
  setup() {
    const { gatherResources, health, userTools } = useGame();
    return { gatherResources, health, userTools };
  },
  computed: {
    canGather() {
      return this.health.playerHealth > 0;
    },
    health() {
      return this.health.playerHealth;
    },
    userTools() {
      return this.userTools;
    },
  },
  methods: {
    gather(resource, amount) {
      this.$emit("gatherResource");
      this.gatherResources(resource, amount);

      //Disable gather button for each resource after click
      if (resource === "wood") {
        this.isWoodDisabled = true;
        setTimeout(() => {
          this.isWoodDisabled = false;
        }, 5000);
      }

      if (resource === "stone") {
        this.isStoneDisabled = true;
        setTimeout(() => {
          this.isStoneDisabled = false;
        }, 5000);
      }

      if (resource === "food") {
        this.isFoodDisabled = true;
        setTimeout(() => {
          this.isFoodDisabled = false;
        }, 5000);
      }
    },
  },
};
</script>
<style scoped>
.gatherButtons {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.gatherButtons button {
  padding: 10px 20px;
  margin: 10px 0;
  font-size: 16px;
  background-color: lightgray;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.gatherButtons button:disabled {
  background-color: gray;
  cursor: not-allowed;
}
.gatherButtons div {
  font-size: 14px;
  color: gray;
  margin-top: 10px;
}
</style>
