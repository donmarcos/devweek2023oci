<template>
  <div v-if="userTools.length > 0">
    <div :key="userTools.length">
      <table>
        <thead>
          <tr>
            <th>Tool</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(tool, index) in userTools" :key="index">
            <td>{{ tool }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { useGame } from "../stores/useGame";
export default {
  setup() {
    const { userTools } = useGame();

    return { userTools };
  },
  computed: {
    userTools() {
      return this.userTools;
    },
  },
};
</script>

<style>
.tool-enter-active,
.tool-leave-active {
  transition: all 0.7s ease-out;
}
.tool-enter-from,
.tool-leave-to {
  opacity: 0;
  transform: translate(20px);
}
</style>
