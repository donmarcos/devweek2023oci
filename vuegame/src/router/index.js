import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createRouter, createWebHistory } from "vue-router";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: () => import("../pages/Splash.vue") },
    { path: "/register", component: () => import("../pages/Register.vue") },
    { path: "/login", component: () => import("../pages/Login.vue") },
    {
      path: "/game",
      component: () => import("../pages/Game.vue"),
      // meta: {
      //   requiresAuth: true,
      // },
    },
    {
      path: "/multiplayer",
      component: () => import("../pages/Multiplayer.vue"),
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    );
  });
};

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next();
    } else {
      alert("Please login to continue");
      next("/login");
    }
  } else {
    next();
  }
});

export default router;
