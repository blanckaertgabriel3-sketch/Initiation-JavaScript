import Player from "./Player.js";

export default class Game {
   constructor(){
      this.isRunning = true;
      this.isOver = false;
      this.timer = 0;
      this.players = {};
   }
   update(gameStateFromServer) {
  // Metadonnées
  this.isRunning = gameStateFromServer.isRunning;
  this.isOver = gameStateFromServer.isOver;
  this.timer = gameStateFromServer.timer;

  const serverPlayers = gameStateFromServer.players;

  // Supprimer les joueurs absents du serveur
  for (const id in this.players) {
    if (!serverPlayers[id]) {
      delete this.players[id];
    }
  }

  // Ajouter ou mettre à jour les joueurs
  for (const id in serverPlayers) {
    const data = serverPlayers[id];

    if (!this.players[id]) {
      // Nouveau joueur → instance Player
      this.players[id] = new Player(
        id,
        data.name,
        data.skinPath,
        data.position
      );
    } else {
      // Joueur existant → update
      this.players[id].update(data);
    }
  }
}

}