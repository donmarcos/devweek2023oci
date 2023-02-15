import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

const pinia = createPinia();
const app = createApp(App);

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKTGtcC7QUddrS3RXfL2CPP9OLmVg44us",
  authDomain: "survival-island-9b7e9.firebaseapp.com",
  projectId: "survival-island-9b7e9",
  storageBucket: "survival-island-9b7e9.appspot.com",
  messagingSenderId: "993301136734",
  appId: "1:993301136734:web:da920bda62f7ff5e2dbbcf",
};

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);

export const db = getFirestore(firebase);

app.use(router);

app.use(pinia);

app.mount("#app");

