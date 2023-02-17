<template>
  <transition-group name="inventoryGroup">
    <div class="inventory" v-if="isIntroComplete">
      <ResourceCounter />

      <div class="survivorHandler">
        <SurvivorHandler />
      </div>
      <div class="toolTracker">
        <ToolTracker />
      </div>
      <div>
        <div class="healthTracker">
          <HealthTracker />
        </div>
        <div class="healPlayer">
          <HealPlayer />
        </div>
      </div>
    </div>
  </transition-group>
</template>

<script>
import ResourceCounter from "../components/ResourceCounter.vue";
import HealthTracker from "../components/HealthTracker.vue";
import HealPlayer from "../components/HealPlayer.vue";
import ToolTracker from "../components/ToolTracker.vue";
import SurvivorHandler from "../components/SurvivorHandler.vue";
import { useMultiPlayer } from "../stores/useMultiPlayer";
export default {
  components: {
    ResourceCounter,
    HealthTracker,
    HealPlayer,
    ToolTracker,
    SurvivorHandler,
  },
  data() {
    return {
      isIntroComplete: false,
    };
  },
  setup() {
    const { multiplayer } = useMultiPlayer();
    return { multiplayer };
  },
  computed: {
    playerJoined() {
      return this.multiplayer.playerJoined;
    },
  },
  mounted() {
    let intervalId = setInterval(() => {
      this.isIntroComplete = true;
      clearInterval(intervalId);
    }, 13500);
  },
};
</script>

<style>
.inventory {
  position: fixed;
  top: 10rem;

  margin-left: 4rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f4f4f4;

  border-radius: 10px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  transition: all 0.3s ease;

  width: 10rem;
}

.inventoryGroup-enter-active,
.inventoryGroup-leave-active {
  transition: all 1s ease-out;
}
.inventoryGroup-enter-from,
.inventoryGroup-leave-to {
  opacity: 0;
  transform: translateX(40px);
}
</style>
