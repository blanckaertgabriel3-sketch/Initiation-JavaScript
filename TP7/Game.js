// Exemple de message recu par le backend, à utiliser pour vos tests :
const backendData = {
   "isRunning":true,
   "isOver":false,
   "timer":190.6000000000091,
   "players":{
      "3cd71bbb-6a6b-4d4e-80e3-107130328a27":{
         "name":"blabla",
         "skinPath":"./spritesheets/3.png",
         "position":[
            0.5600000000000003,
            0.17999999999999977
         ],
         "lvl":1,
         "hp":100,
         "maxHp":100,
         "hpRegenRate":10,
         "speed":0.2,
         "direction":3,
         "isAttacking":false,
         "isWalking":false,
         "isDying":false,
         "attackCooldown":1,
         "currentAttackCooldown":0
      },
      "28ead291-fcea-4b41-a596-d3c876c49a53":{
         "name":"bloublou",
         "skinPath":"./spritesheets/4.png",
         "position":[
            0.44,
            0.19
         ],
         "lvl":1,
         "hp":100,
         "maxHp":100,
         "hpRegenRate":10,
         "speed":0.2,
         "direction":0,
         "isAttacking":false,
         "isWalking":false,
         "isDying":false,
         "attackCooldown":1,
         "currentAttackCooldown":0
      }
   }
};

class Game {
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