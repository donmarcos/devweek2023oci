<template>
  <div>
    <h1>Login To Your Account</h1>

    <input type="text" placeholder="Email" v-model="email" />
    <input type="text" placeholder="Password" v-model="password" />
    <p v-if="errMsg">{{ errMsg }}</p>
    <button @click="register">Submit</button>
    <button @click="signInWithGoogle">Sign In With Google</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useLogin } from "../stores/login";

import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import { useRouter } from "vue-router";

const { setUser } = useLogin();
const email = ref("");
const password = ref("");
const errMsg = ref();
const router = useRouter();
const register = () => {
  signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      console.log("Successfully registered");
      setUser(data.user.uid);
      router.push("/game");
    })
    .catch((error) => {
      console.log(error.code);
      switch (error.code) {
        case "auth/invalid-email":
          errMsg.value = "Invalid email";
          break;
        case "auth/user-not-found":
          errMsg.value = "No Account with that email was found";
          break;
        case "auth/wrong-password":
          errMsg.value = "Invalid Password";
          break;
        default:
          errMsg.value = "Email or password was incorrect";
      }
    });
};
const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider)
    .then((result) => {
      console.log(result.user);
      setUser(result.user.uid);
      router.push("/game");
    })
    .catch((error) => {
      console.log(error.message);
    });
};
</script>
