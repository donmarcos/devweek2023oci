<template>
  <div>
    <div class="multiPlayerControls">
      <div class="playerStats" v-if="playerJoined && !playerLeft">
        <div>Player Score:{{ this.playerScore }}</div>
        <div>Opponent Score: {{ this.opponentScore }}</div>
        <div>Current Game:<br />{{ this.currentGame }}</div>
      </div>
      <div v-if="playerJoined && !gameEnded && !playerLeft" class="leaveGame">
        <h3>Player has joined</h3>
        <button @click="leaveGame()">Leave Current Game</button>
      </div>
    </div>

    <div v-if="playerLeft">Player Left Game</div>

    <button v-if="playerLeft" @click="reloadPage">Close</button>
    <div v-if="gameEnded">
      <h3>Game Over</h3>
      <p>{{ gameOverMessage }}</p>
      <button @click="reloadPage">Close</button>
    </div>
    <div v-if="playerJoined && !gameEnded && !playerLeft">
      <MultiPlayerGame />
    </div>
    <div v-if="!playerJoined">
      <div v-if="joinedGame">
        <h2>Joining game...</h2>
        <button @click="joinedGame = !joinedGame">Cancel</button>
      </div>

      <div class="matchMaking" v-if="!joinedGame">
        <div v-if="lookingForPlayers">Looking for players...</div>
        <button
          v-if="!lookingForPlayers && !showOpenGames"
          @click="testFirebase"
        >
          Start Match making
        </button>

        <button
          v-if="lookingForPlayers"
          @click="lookingForPlayers = !lookingForPlayers"
        >
          Cancel
        </button>

        <button
          v-if="!lookingForPlayers && !showOpenGames"
          @click="showOpenGames = !showOpenGames"
        >
          Show Open Games
        </button>
        <div class="openGames" v-if="showOpenGames">
          <button @click="showOpenGames = !showOpenGames">Close</button>
          <button @click="loadGames">Refresh</button>

          <div v-if="showOpenGames">
            <div>Games To Join:</div>
            <div v-for="(game, index) in openGamesArray" :key="index">
              <p>Game: {{ game.gameId }}</p>
              <button @click="joinGame(game.gameId)">Join</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../main";
import {
  collection,
  addDoc,
  Timestamp,
  where,
  query,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  onSnapshot,
  limit,
} from "firebase/firestore";
import { useLogin } from "../stores/login";
import { useGame } from "../stores/useGame";
import { useMultiPlayer } from "../stores/useMultiPlayer";
import MultiPlayerGame from "./MultiPlayerGame.vue";

export default {
  data() {
    return {
      lookingForPlayers: false,
      openGamesArray: [],
      showOpenGames: false,
      joinedGame: false,
      currentGame: "",
      player1Score: null,
      player2Score: 0,
      playerLeft: false,
    };
  },
  setup() {
    const {
      multiplayer,
      playerJoinedGame,
      playerLeftGame,
      setCurrentGame,
      addPlayerScore,
      getPlayerScore,
      closeMultiplayer,
      handleMultiPlayer,
    } = useMultiPlayer();
    const { handleMultiPlayerMode } = useGame();

    return {
      multiplayer,
      playerJoinedGame,
      playerLeftGame,
      setCurrentGame,
      addPlayerScore,
      getPlayerScore,
      closeMultiplayer,
      handleMultiPlayer,
      handleMultiPlayerMode,
    };
  },
  components: {
    MultiPlayerGame,
  },
  computed: {
    opponentScore() {
      return this.multiplayer.opponentScore;
    },
    playerScore() {
      return this.multiplayer.playerScore;
    },
    playerJoined() {
      return this.multiplayer.playerJoined;
    },
    gameEnded() {
      return this.multiplayer.gameEnded;
    },
    winner() {
      return this.multiplayer.winner;
    },
    gameOverMessage() {
      return this.multiplayer.gameOverMessage;
    },
    multiPlayerGame() {
      return this.multiplayer.multiPlayerGame;
    },
  },
  mounted() {
    this.loadGames();
    this.handleMultiPlayerMode();

    let intervalId = setInterval(() => {
      this.getPlayerScore();
    }, 1000);
  },

  updated() {
    this.loadGames();
  },
  methods: {
    async addScore() {
      this.addPlayerScore(15);
    },
    reloadPage() {
      this.playerLeft = false;
      this.playerLeftGame();
      this.lookingForPlayers = false;
      this.joinedGame = false;
      this.showOpenGames = false;
      this.currentGame = "";
    },

    async testFirebase() {
      try {
        const { user } = useLogin();
        const docRef = await addDoc(collection(db, "games"), {
          completed: false,
          test: true,
          player1: user,
          player1Score: 0,
          player2: null,
          player2Score: 0,
          participants: 1,
          started: Timestamp.fromDate(new Date()),
        });
        this.currentGame = docRef.id;
        this.setCurrentGame(docRef.id);
        this.getPlayerScore();
        const unsub = onSnapshot(doc(db, "games", docRef.id), (doc) => {
          console.log("Current data: ", doc.data());
          if (doc.data().completed === true) {
            this.playerLeft = true;
          }
          if (doc.data().player2 != null) {
            this.playerJoinedGame();
          }
        });
        console.log("Document written with ID: ", docRef.id);
        this.lookingForPlayers = true;
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },
    async joinGame(gameId) {
      const { user } = useLogin();
      const gameRef = doc(db, "games", gameId);
      this.setCurrentGame(gameId);
      this.currentGame = gameId;
      this.getPlayerScore();

      const unsub = onSnapshot(doc(db, "games", gameId), (doc) => {
        console.log("Current data: ", doc.data());
        if (doc.data().completed === true) {
          this.playerLeft = true;
        }
        if (doc.data().player2.length > 0) {
          this.playerJoinedGame();
        }
      });

      await updateDoc(gameRef, {
        player2: user,
        participants: 2,
      });

      this.joinedGame = true;
    },
    async leaveGame() {
      const gameRef = doc(db, "games", this.currentGame);
      this.playerLeftGame();

      await updateDoc(gameRef, {
        completed: true,
      });
    },

    async loadGames() {
      const gamesRef = collection(db, "games");
      const q = query(gamesRef, where("participants", "<", 2), limit(5));

      const querySnapshot = await getDocs(q);
      this.openGamesArray = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        this.openGamesArray.push({ gameId: doc.id, gameData: doc.data() });
      });
    },
  },
};
</script>

<style>
button {
  padding: 8px 16px;
  border: 1px solid gray;
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
}

button:hover {
  background-color: dimgrey;
  color: aliceblue;
  transition: all 0.4s;
  transition-timing-function: ease-out;
}

.matchMaking {
  display: flex;
  margin-top: 6rem;
  align-items: center;
  justify-content: center;
}
.leaveGame {
  position: fixed;
  top: 10rem;
  right: 4rem;
}
.playerStats {
  position: fixed;
  display: flex;
  flex-direction: column;
  top: 20rem;
  right: 4rem;
}
.multiPlayerControls {
  background-color: #f4f4f4;

  border-radius: 10px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  transition: all 0.3s ease;
}
</style>
