<template>
  <div class="buildShelterButtons">
    <p v-if="shelterProgress >= 100">You have built a shelter</p>
    <div v-if="health > 0 && shelterProgress < 100">
      <button v-if="canBuild" @click="build()">Build Shelter</button>

      <div v-else>You do not have enough resources to build a shelter.</div>
      <div>Progress: {{ shelterProgress }}%</div>
    </div>
  </div>
</template>

<script>
import { useGame } from "../stores/useGame";

export default {
  setup() {
    const { buildShelter, resources, shelter, health } = useGame();
    return {
      buildShelter,
      resources,
      shelter,
      health,
    };
  },
  computed: {
    canBuild() {
      return this.resources.wood >= 10 && this.resources.stone >= 5;
    },
    shelterProgress() {
      return this.shelter.shelterProgress;
    },

    health() {
      return this.health.playerHealth;
    },

    shelterBuilt() {
      return this.shelter.shelterBuilt;
    },
  },
  methods: {
    build() {
      this.buildShelter();
    },
  },
};
</script>
<style scoped>
.buildShelterButtons {
  margin-top: 2rem;
}
</style>
