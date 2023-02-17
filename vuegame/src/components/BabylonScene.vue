<template>
  <div class="babylonScene" v-if="!introIsFinished">
    <canvas ref="bjsCanvas" width="800" height="450" />
  </div>
</template>

<script>
import myScene from "../scenes/MyFirstScene";

export default {
  name: "BabylonScene",

  props: {
    position: {
      type: Object,
      default() {
        return { x: 0, y: 0, z: 0 };
      },
    },
  },
  data() {
    return {
      introIsFinished: false,
    };
  },

  watch: {
    position(val) {
      if (val) {
        myScene.setStick("stickTemplate", val.x, val.y, val.z);
      }
    },
  },
  mounted() {
    const bjsCanvas = this.$refs.bjsCanvas;

    if (bjsCanvas) {
      myScene.createScene(bjsCanvas);
    }
  },
};
</script>

<style scoped>
/* .babylonScene {
  margin-top: 50px;
} */
</style>
