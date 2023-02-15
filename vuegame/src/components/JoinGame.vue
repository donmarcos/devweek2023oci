<template>
  <h2>Joining game...</h2>
</template>

<script>
import { useMultiPlayer } from "../stores/useMultiPlayer";
export default {
  mounted() {
    const { multiplayer } = useMultiPlayer();
    const currentGame = multiplayer.currentGame;
    const unsub = onSnapshot(doc(db, "games", currentGame), (doc) => {
      console.log("Current data: ", doc.data());
      if (doc.data().player2.length > 0) {
        this.playerJoinedGame();
      }
    });
  },
};
</script>

<style></style>
