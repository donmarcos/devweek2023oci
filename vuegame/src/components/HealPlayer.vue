<template>
  <div class="button">
    <button v-if="health > 0 && this.resources.food > 0" @click="eatFood">
      Eat Food
    </button>
    <div v-if="this.resources.food === 0">You have no food to eat</div>
  </div>
</template>

<script>
import { useGame } from "../stores/useGame";

export default {
  setup() {
    const { healHealth, playerHealth, health, resources } = useGame();
    return { healHealth, playerHealth, health, resources };
  },
  methods: {
    eatFood() {
      const randomNumber = Math.floor(Math.random() * 25);
      if (this.resources.food > 0) {
        this.healHealth(randomNumber);
        this.resources.food--;
      } else {
        console.log("You have no food");
      }
    },
  },
  computed: {
    health() {
      return this.health.playerHealth;
    },
  },
};
</script>
<style scoped>
.button{
  display: inline;
}
</style>
