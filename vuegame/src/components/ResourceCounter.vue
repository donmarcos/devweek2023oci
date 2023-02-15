<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>Resource</th>
          <th>Quantity</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(quantity, resource) in resources" :key="resource">
          <td>{{ resource }}</td>
          <td>{{ quantity }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { useGame } from "../stores/useGame";

export default {
  setup() {
    const { resources } = useGame();
    return { resources };
  },
  computed: {
    wood() {
      return this.resources.wood;
    },
    stone() {
      return this.resources.stone;
    },
    food() {
      return this.resources.food;
    },
  },
};
</script>
<style scoped>
.survivorCounter {
  display: flex;
  margin-left: 1.5rem;
  margin-top: 1rem;
}
</style>
