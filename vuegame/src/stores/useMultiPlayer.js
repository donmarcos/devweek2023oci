import { doc, getDoc, increment, updateDoc } from "firebase/firestore";
import { defineStore } from "pinia";
import { db } from "../main";
import { useLogin } from "../stores/login";

export const useMultiPlayer = defineStore({
  id: "multiplayer",
  state: () => ({
    multiplayer: {
      multiPlayerGame: false,
      lookingForPlayers: false,
      openGamesArray: [],
      showOpenGames: false,
      joinedGame: false,
      playerJoined: false,
      gameEnded: false,
      currentGame: "",
      currentUser: "",
      playerScore: 0,
      opponentScore: 0,
      gameOverMessage: "",
    },
    resources: {
      wood: 6,
      stone: 4,
      food: 5,
    },
    shelter: {
      shelterBuilt: false,
      shelterProgress: 0,
      shelters: 0,
    },
    health: {
      playerHealth: 100,
    },
    survival: {
      daysSurvived: 0,
      winConditionsMet: 90,
      gameOver: false,
      gameWon: false,
    },
    tools: [
      { name: "Axe", cost: { wood: 8, stone: 6 } },
      { name: "Fishing Rod", cost: { wood: 10, stone: 5 } },
      { name: "Spear", cost: { wood: 5, stone: 8 } },
    ],
    danger: {
      dangers: [],
      dangerOccurred: false,
    },
    survivors: 0,
    exploration: {
      newResourceFound: false,
      otherSurvivorFound: false,
      dangerFound: false,
      survivors: 0,
    },
    story: {
      storyLines: [],
      currentStoryIndex: 0,
      currentMessage: [],
      updatedIndex: 0,
      showMessage: true,
    },

    userTools: [],

    discoveries: [],
  }),

  actions: {
    handleMultiPlayer() {
      this.multiplayer.multiplayerGame = !this.multiplayer.multiplayerGame;
    },
    playerJoinedGame() {
      this.multiplayer.playerJoined = true;
    },
    playerLeftGame() {
      this.multiplayer.playerJoined = false;
      this.multiplayer.gameEnded = false;
      console.log(this.multiplayer.playerJoined);
    },
    setCurrentGame(gameId) {
      this.currentGame = gameId;
      console.log(this.currentGame);
    },
    closeMultiplayer() {
      this.multiplayer.gameEnded = false;
    },
    async getPlayerScore() {
      const { user } = useLogin();
      if (this.currentGame === undefined) {
        return;
      }

      const gameRef = doc(db, "games", this.currentGame);
      const docSnap = await getDoc(gameRef);

      if (docSnap.data().player1 === user) {
        this.currentUser = "player1";
      } else if (docSnap.data().player2 === user) {
        this.currentUser = "player2";
      }

      if (docSnap.data().player1Score >= 500) {
        this.multiplayer.gameEnded = true;
        this.currentGame = undefined;
        if (this.currentUser === "player1") {
          this.multiplayer.gameOverMessage = "You Won The Game";
        } else {
          this.multiplayer.gameOverMessage = "You Lost The Game";
        }
        return;
      } else if (docSnap.data().player2Score >= 500) {
        this.multiplayer.gameEnded = true;
        this.currentGame = undefined;
        if (this.currentUser === "player2") {
          this.multiplayer.gameOverMessage = "You Won The Game";
        } else {
          this.multiplayer.gameOverMessage = "You Lost The Game";
        }
        return;
      }

      if (this.currentUser === "player1") {
        this.multiplayer.playerScore = docSnap.data().player1Score;
        this.multiplayer.opponentScore = docSnap.data().player2Score;
        return;
      } else if (this.currentUser === "player2") {
        this.multiplayer.playerScore = docSnap.data().player2Score;
        this.multiplayer.opponentScore = docSnap.data().player1Score;
        return;
      }
    },
    async addPlayerScore(amount) {
      const { user } = useLogin();
      const gameRef = doc(db, "games", this.currentGame);
      const docSnap = await getDoc(gameRef);
      if (docSnap.data().player1 === user) {
        this.currentUser = "player1";
      } else if (docSnap.data().player2 === user) {
        this.currentUser = "player2";
      }
      console.log(this.currentUser);

      if (this.currentUser === "player1") {
        await updateDoc(gameRef, {
          player1Score: increment(amount),
        });
      } else if (this.currentUser === "player2") {
        await updateDoc(gameRef, {
          player2Score: increment(amount),
        });
      }
    },

    gatherResources(resource, amount) {
      const hasAxe = this.userTools.filter((tool) => tool === "Axe");
      const hasFishingRod = this.userTools.filter(
        (tool) => tool === "Fishing Rod"
      );
      const hasPickaxe = this.userTools.filter((tool) => tool === "Pickaxe");
      // check if user has axe
      if (hasAxe.length >= 1 && resource === "wood") {
        const doubleAmount = amount * 2;
        this.resources[resource] += doubleAmount;
        this.story.storyLines.pop();
        this.story.showMessage = true;
        this.story.storyLines.push("You gather much more wood with your axe");
        this.tick();
        return;
      }
      // check if user has fishing rod
      if (hasFishingRod.length >= 1 && resource === "food") {
        const doubleAmount = amount * 2;
        this.resources[resource] += doubleAmount;
        this.story.storyLines.pop();
        this.story.showMessage = true;
        this.story.storyLines.push(
          "You caught some large fish with your fishing rod"
        );
        this.tick();
        return;
      }
      // check if user has pickaxe
      if (hasPickaxe.length >= 1 && resource === "stone") {
        const doubleAmount = amount * 2;
        this.resources[resource] += doubleAmount;
        this.story.storyLines.pop();
        this.story.showMessage = true;
        this.story.storyLines.push(
          "You mine twice as much stone with your Pickaxe "
        );
        this.tick();
        return;
      }
      this.resources[resource] += amount;
      this.story.storyLines.pop();
      this.story.updatedIndex++;
      this.story.showMessage = true;
      this.story.storyLines.push("You gathered some" + " " + resource);
      this.tick();
    },
    useResources(resource, amount) {
      this.resources[resource] -= amount;
    },
    discoverNewResource(resource, amount) {
      this.resources[resource] += amount;
      this.exploration.newResourceFound = true;
      this.tick();
      this.story.showMessage = true;
      this.story.storyLines.pop();
      this.story.storyLines.push("You found a new supply of " + resource);
    },
    discoverOtherSurvivor() {
      this.exploration.otherSurvivorFound = true;
      this.exploration.survivors++;
      this.tick();
      this.story.showMessage = true;
      this.story.storyLines.pop();
      this.story.storyLines.push("You found a survivor");
    },
    discoverDanger() {
      this.exploration.dangerFound = true;
      this.damageHealth(15);
      this.tick();
      this.story.showMessage = true;
      this.story.storyLines.pop();
      this.story.storyLines.push("You we're injured while exploring");
    },

    addShelterProgress(amount) {
      this.shelter.shelterProgress += amount;
    },

    buildShelter() {
      if (this.resources.wood >= 10 && this.resources.stone >= 5) {
        this.useResources("wood", 10);
        this.useResources("stone", 5);
        this.addShelterProgress(25);
        this.tick();
      }
      if (this.shelter.shelterProgress >= 100) {
        this.shelter.shelterBuilt = true;
        this.story.storyLines.pop();
        this.story.showMessage = true;
        this.story.storyLines.push(
          "You have built a modest shelter... While building you discover a pickaxe in the sand."
        );
        this.userTools.push("Pickaxe");
      }
    },

    canCreate(cost) {
      return Object.entries(cost).every(
        ([resource, value]) => this.resources[resource] >= value
      );
    },

    createTool(name) {
      const tool = this.tools.find((t) => t.name === name);
      if (!tool) return;
      const cost = tool.cost;
      Object.entries(cost).forEach(([resource, value]) => {
        this.resources[resource] -= value;
      });
      this.userTools.push(tool.name);
      this.story.storyLines.pop();
      this.story.showMessage = true;
      this.story.storyLines.push("You Crafted The " + " " + tool.name);

      console.log(this.userTools);
    },
    damageHealth(amount) {
      this.health.playerHealth -= amount;
      if (this.health.playerHealth <= 0) {
        this.survival.gameOver = true;
        console.log("Game Over ==>", this.survival.gameOver);
      }
    },
    healHealth(amount) {
      const newNum = this.health.playerHealth + amount;
      const subtractFromTotal = newNum - 100;
      console.log(newNum);
      console.log(subtractFromTotal);
      if (this.health.playerHealth >= 100) {
        return;
      }
      if (this.health.playerHealth + amount > 100) {
        this.health.playerHealth -= subtractFromTotal;
      }
      this.health.playerHealth += amount;
    },
    addDanger(danger) {
      this.dangers.push(danger);
    },
    removeDanger(danger) {
      this.dangers = this.dangers.filter((d) => d !== danger);
    },

    checkForDanger() {
      const randomNum = Math.random();
      const hasAxe = this.userTools.filter((tool) => tool === "Axe");
      const hasSpear = this.userTools.filter((tool) => tool === "Spear");

      if (randomNum < 0.3) {
        // generates storm
        this.danger.dangerOccurred = true;
        this.danger.dangers = "storm";
        //check if player has built shelter, if not decrease player health
        if (!this.shelter.shelterBuilt) {
          this.story.showMessage = true;
          this.story.storyLines.pop();
          this.story.storyLines.push("You were injured by a Storm");
          this.damageHealth(15);
        } else {
          this.story.storyLines.pop();
          this.story.showMessage = true;
          this.story.storyLines.push(
            "A storm violently blows over your shelter"
          );
        }
      } else if (randomNum < 0.6) {
        // generates wild animal
        this.danger.dangerOccurred = true;
        this.danger.dangers = "wild animal";
        //check if user has a weapon, if not decrease player health
        if (hasAxe.length > 0 || hasSpear.length > 0) {
          this.story.storyLines.pop();
          this.story.storyLines.push("You fought off a Wild Animal");
        } else {
          this.story.showMessage = true;
          this.story.storyLines.pop();
          this.story.storyLines.push("You were injured by a Wild Animal");
          this.damageHealth(15);
        }
      } else {
        //no danger generated
        this.danger.dangerOccurred = false;
      }
      console.log(this.danger.dangers);
    },
    checkForStory() {
      const messages = this.story.storyLines;
      this.story.currentStoryIndex++;

      if (this.story.currentStoryIndex >= messages.length) {
        this.story.currentStoryIndex = 0;
      }
      this.story.currentMessage = messages[this.story.currentStoryIndex];
    },

    triggerSurvivorStory() {
      this.story.showMessage = true;
      this.story.storyLines.pop();
      this.story.storyLines.push("The survivor says they can help you");
    },
    triggerSurvivorStory2() {
      this.story.showMessage = true;
      this.story.storyLines.pop();
      this.story.storyLines.push("They are good at building..");
    },

    addDiscovery(discovery) {
      this.discoveries.push(discovery);
    },

    tick() {
      //move game forward one day, if no food decrease player health
      const randomNumber = Math.floor(Math.random() * 16);
      if (this.survival.daysSurvived >= this.survival.winConditionsMet) {
        this.survival.gameWon = true;
      }

      this.survival.daysSurvived++;
      if (this.resources.food > 0) {
        this.resources.food--;
      } else {
        this.damageHealth(randomNumber);
      }
    },
  },
});
