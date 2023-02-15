<template>
  <div>
    <br />
    <transition-group name="message" tag="div">
      <div :key="currentIndex">
        {{ currentMessage }}
      </div>
    </transition-group>
    <br />
  </div>
</template>

<script>
export default {
  data() {
    return {
      messages: [
        "You find yourself stranded on a deserted island.",
        "You must gather resources to survive and build a shelter.",
        "Be careful, there are dangers on the island that can harm you.",
      ],
      currentMessageString: "",
      currentIndex: 0,
    };
  },
  computed: {
    currentMessage() {
      return this.messages[this.currentIndex];
    },
  },
  mounted() {
    setInterval(() => {
      this.currentIndex++;
      if (this.currentIndex >= this.messages.length) {
        clearInterval();
      }
    }, 4000);
  },
};
</script>
<style scoped>
.message-enter-active,
.message-leave-active {
  transition: all 0.5s ease-out;
}
.message-enter-from,
.message-leave-to {
  opacity: 0;
  transform: translateX(40px);
}
</style>
