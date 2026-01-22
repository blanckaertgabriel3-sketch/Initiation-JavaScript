console.log("==========Instance de la Game 1==========");

const game1 = new Game();
game1.update(backendData);
console.log(structuredClone(game1));

console.log("==========MetaData Test==========");
backendData.isOver = true;
backendData.timer = 192;
backendData.players["28ead291-fcea-4b41-a596-d3c876c49a53"].name =
  "MetaDataTEST";
backendData.players["3cd71bbb-6a6b-4d4e-80e3-107130328a27"].hp = 2;
game1.update(backendData);
console.log(structuredClone(game1));

console.log("==========AddPlayer Test==========");
const newPlayer = "new-player-666";

backendData.players[newPlayer] = {
  name: "Le Petit Nouveau",
  skinPath: "./assets/1.png",
  position: [0.5, 0.5],
  lvl: 1,
  hp: 100,
  maxHp: 100,
  hpRegenRate: 10,
  speed: 0.2,
  direction: 1,
  isAttacking: false,
  isWalking: true,
  isDying: false,
  attackCooldown: 1,
  currentAttackCooldown: 0,
};

game1.update(backendData);
console.log(structuredClone(game1));

console.log("==========DeletePlayer Test==========");

delete backendData.players[newPlayer];
game1.update(backendData);
console.log(structuredClone(game1));