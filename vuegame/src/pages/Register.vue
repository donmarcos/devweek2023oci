<template>
  <div class="registerContainer">
    <div class="register">
      <h1>Create an Account</h1>
      <input type="text" placeholder="Email" v-model="email" />
      <input type="text" placeholder="Password" v-model="password" />
      <Button @click="register" buttonText="Submit" />
      <Button @click="signInWithGoogle" buttonText="Sign In With Google" />

      <router-link to="/login">Click here to login</router-link>
    </div>
  </div>
</template>

<script setup>
import Button from "../components/Button.vue";
import { ref } from "vue";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useRouter } from "vue-router";
const email = ref("");
const password = ref("");
const router = useRouter();
const register = () => {
  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      console.log("Successfully registered");
      router.push("/game");
    })
    .catch((error) => {
      console.log(error.code);
      alert(error.message);
    });
};
const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider)
    .then((result) => {
      console.log(result.user);
      router.push("/game");
    })
    .catch((error) => {});
};
</script>

<style>
.registerContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.register {
  position: fixed;
  top: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border: 1px solid #ccc;
  background-color: #f4f4f4;
  border-radius: 5px;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.router-link {
  margin-top: 20px;
  text-align: center;
}
</style>
