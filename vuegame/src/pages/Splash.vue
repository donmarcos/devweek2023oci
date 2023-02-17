<template>
  <div class="splash-container">
    <div class="splash-screen">
      <div class="splash-text">
        <h1>Welcome to Survival Island</h1>
        <h2>Explore at your own risk..</h2>

        <router-link to="/game">
          <button class="landing-button">
            Explore The Island
          </button></router-link
        >
      </div>
      <div class="splash-image">
        <img
          src="../assets/isometric-island.png"
          alt="Survival Island Splash"
          class="islandImage"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Quintessential&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Island+Moments&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Ceviche+One&display=swap");

.splash-screen {
  display: grid;
  position: fixed;
  top: 0;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  height: 100vh;
  width: 100vw;
  background: rgb(34, 193, 195);
  background: linear-gradient(
    0deg,
    rgba(34, 193, 195, 1) 0%,
    rgba(253, 187, 45, 1) 100%
  );
}

.splash-text {
  display: flex;

  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: aliceblue;
  text-shadow: 2px 2px 4px #464141;
}
.splash-text h1 {
  font-family: "Quintessential", cursive;
  font-size: 50px;
  letter-spacing: 3px;
  text-shadow: 4px 4px 4px #353131;
}

.splash-image {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
}

@media (max-width: 768px) {
  .splash-screen {
    grid-template-columns: 1fr;
  }
  .islandImage {
    display: none;
  }
}

.islandImage {
  position: absolute;
  right: 10%;
  bottom: 22%;
  width: 600px;
  height: 400px;
  border-radius: 5%;
}

.landing-button {
  padding: 8px 16px;
  border: 1px solid gray;
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
}

.landing-button:hover {
  background-color: rgba(105, 105, 105, 0.312);
  color: aliceblue;
  transition: all 0.7s;
  transition-timing-function: ease-out;
}
</style>
