<template>
  <div>
    <nav class="nav">
      <router-link active-class="active" to="/">Home</router-link>
      <router-link active-class="active" v-if="!isLoggedIn" to="/login"
        >Login</router-link
      >

      <router-link active-class="active" to="/game">Game</router-link>
      <router-link active-class="active" to="/multiplayer"
        >Multiplayer</router-link
      >
      <Button @click="handleSignOut" v-if="isLoggedIn" buttonText="Sign Out" />
    </nav>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "vue-router";
import Button from "./components/Button.vue";

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
  padding-left: 0;

  /* background-color: #223848; */
}
html {
  overflow: hidden;
  background-color: aliceblue;
}
html,
body {
  margin: 0;
  height: 100vh;
  width: 100%;
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
  margin-top: 2rem;
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
.active {
  text-decoration: underline;
  text-decoration-color: #fcfcfc3b;
}

nav {
  z-index: 100;
  display: flex;
  position: fixed;
  top: 0;
  left: -5px;
  width: 100vw;
  justify-content: space-evenly;
  align-items: center;
  padding: 10px;
  background-color: #223848;
  color: #000000;
}
nav button {
  padding: 8px 16px;
  border: 1px solid gray;
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
}

nav button:hover {
  background-color: #28737a;
  color: aliceblue;
  transition: all 0.5s;
  transition-timing-function: ease-out;
}

nav a {
  color: #fff;
  text-decoration: none;
  margin-right: 10px;
}

nav a:hover {
  color: #28737a;

  transition: all 0.2s;
}
</style>

