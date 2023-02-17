<template>
  <div class="loginContainer">
    <div class="login">
      <h1>Login To Your Account</h1>

      <input type="text" placeholder="Email" v-model="email" />
      <input type="text" placeholder="Password" v-model="password" />
      <p v-if="errMsg">{{ errMsg }}</p>

      <Button @click="register" buttonText="Submit" />
      <Button @click="signInWithGoogle" buttonText="Sign In With Google" />
      <router-link to="/register">Click here to sign up</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useLogin } from "../stores/login";
import Button from "../components/Button.vue";

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
<style scoped>
.loginContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.login {
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
