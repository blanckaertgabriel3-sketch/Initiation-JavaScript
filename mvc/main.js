import Game from "./Game.js";
import GameView from "./GameView.js";
import GameController from "./GameController.js";


//Model 
const game = new Game();
console.log("game", game);
//View 
const gameView = new GameView(game);
//Controller (Launch )
console.log(game, gameView);
new GameController(game, gameView);
