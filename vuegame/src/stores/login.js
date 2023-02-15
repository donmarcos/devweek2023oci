import { defineStore } from "pinia";

export const useLogin = defineStore({
  id: "login",
  state: () => ({
    user: "",
    hasLoggedIn: false,
  }),

  actions: {
    setUser(updatedUser) {
      this.user = updatedUser;
      this.hasLoggedIn = true;
      console.log(this.user);
    },
  },
  getters: {},
});
