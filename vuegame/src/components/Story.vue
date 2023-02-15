<template>
  <div class="story">
    <div class="storyElements">
      <div class="introMessage">
        <IntroMessage />
      </div>
      <div class="storyLines">
        <StoryLines />
      </div>
    </div>
  </div>
</template>

<script>
import StoryLines from "../components/StoryLine.vue";
import IntroMessage from "../components/IntroMessage.vue";
export default {
  components: {
    StoryLines,
    IntroMessage,
  },
};
</script>

<style>
.story {
  margin-top: 50px;
}
.storyElements {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.storyLines {
  position: fixed;
  margin-top: 10px;
}
</style>
