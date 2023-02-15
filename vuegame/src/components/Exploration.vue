<template>
  <div class="exploreButtons">
    <button @click="explore">Explore The Island</button>
  </div>
</template>

<script>
import { useGame } from "../stores/useGame";

export default {
  setup() {
    const { exploration, resources } = useGame();
    return { exploration, resources };
  },
  computed: {
    newResourceFound() {
      return this.exploration.newResourceFound;
    },
    otherSurvivorFound() {
      return this.exploration.otherSurvivorFound;
    },
    dangerFound() {
      return this.exploration.dangerFound;
    },
    resources() {
      return this.resources;
    },
  },
  methods: {
    explore() {
      const {
        discoverNewResource,
        discoverOtherSurvivor,
        discoverDanger,
        resources,
      } = useGame();
      const discovery = Math.floor(Math.random() * 100);
      const resourcesArray = Object.keys(resources);
      const randomResource =
        resourcesArray[Math.floor(Math.random() * resourcesArray.length)];
      const randomResourceAmount = Math.floor(Math.random() * 14);

      if (discovery < 10) {
        discoverOtherSurvivor();
      } else if (discovery < 60) {
        discoverNewResource(randomResource, randomResourceAmount);
      } else {
        discoverDanger();
      }
    },
  },
};
</script>
<style scoped>
.exploreButtons {
  margin-top: 2rem;
}
</style>
