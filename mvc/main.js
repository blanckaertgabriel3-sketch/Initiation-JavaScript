import Game from "./Game.js";
import GameView from "./GameView.js";
import GameController from "./GameController.js";


//Model 
const game = new Game();
//View 
const gameView = new GameView(game);
//Controller (Launch )
new GameController(game, gameView);
