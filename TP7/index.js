const game = new Game();

// Test 1 : sync initiale
console.log("Avant update :", game);
game.update(backendData);
console.log("Après update :", game);

// Test 2 : ajout joueur
const backendData2 = structuredClone(backendData);
backendData2.players["test-player-id"] = {
  name: "testeur",
  skinPath: "./spritesheets/5.png",
  position: [0.1, 0.2],
  lvl: 1,
  hp: 100,
  maxHp: 100,
  hpRegenRate: 10,
  speed: 0.2,
  direction: 1,
  isAttacking: false,
  isWalking: false,
  isDying: false,
  attackCooldown: 1,
  currentAttackCooldown: 0
};

game.update(backendData2);
console.log("Après ajout joueur :", game.players);

// Test 3 : update joueur
const backendData3 = structuredClone(backendData2);
backendData3.players["test-player-id"].hp = 42;

game.update(backendData3);
console.log("HP test-player-id :", game.players["test-player-id"].hp);

// Test 4 : suppression joueur
const backendData4 = structuredClone(backendData3);
delete backendData4.players["3cd71bbb-6a6b-4d4e-80e3-107130328a27"];

game.update(backendData4);
console.log("Après suppression joueur :", game.players);

const backendData5 = JSON.parse(JSON.stringify(backendData));
delete backendData5.players["test-player-id"];
game.update(backendData5);
console.log("Après vraie suppression :", game.players);
