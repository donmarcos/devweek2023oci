<template>
  <div>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/login">Login</router-link>
      <router-link to="/register">Register</router-link>
      <router-link to="/game">Game</router-link>
      <router-link to="/multiplayer">Multiplayer</router-link>
      <button @click="handleSignOut" v-if="isLoggedIn">Sign out</button>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "vue-router";

const router = useRouter();
const isLoggedIn = ref(false);

let auth;

onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true;
    } else {
      isLoggedIn.value = false;
    }
  });
});

const handleSignOut = () => {
  signOut(auth).then(() => {
    router.push("/");
  });
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  height: 100%;
}
.healthTracker {
  display: flex;

  align-items: flex-start;
  padding: 1.5rem;
}
.healPlayer {
  display: flex;

  align-items: flex-start;
  padding-left: 1.5rem;
}
.storyLines {
  padding-bottom: 50px;
}
.toolTracker {
  padding: 1.5rem;
}
.playerControls {
  display: flex;
  flex-direction: row;

  justify-content: center;
}
.introMessage {
  display: flex;
  align-items: center;
  justify-content: center;
}
.survivorHandler {
  display: flex;

  align-items: flex-start;
  padding: 1.5rem;
}
</style>

