<template>
  <button>{{ buttonText }}</button>
</template>

<script>
export default {
  props: {
    buttonText: {
      type: String,
      default: () => "Click",
    },
  },
};
</script>

<style scoped>
button {
  padding: 8px 16px;
  border: 1px solid gray;
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
}

button:hover {
  background-color: rgba(105, 105, 105, 0.843);
  color: aliceblue;
  transition: all 0.7s;
  transition-timing-function: ease-out;
}
</style>
