class GameView {
	constructor(game) {
		this.game = game;
		//récupération de l'élément canvas
		this.canvas = document.getElementById("canvas");
		//récupération des dimentions canvas
		this.canvas.height = 500;
		this.canvas.width = 800;
		//mettre bordure pour la visibilité du canvas
		this.canvas.style.border = "2px solid black";
		//récupération du context canvas
		this.ctx = this.canvas.getContext("2d");
		this.images = {};
		
		console.log("GameView instancié")
	}
	//Nettoie le canvas
	clear() {
		this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
	}
	//Dessine le fond
	drawBackground() {
		//x, y, width, height
		this.ctx.fillStyle = "red";
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
		
	}
	drawPlayer(player) {

	}
	//Nettoie le canvas + Dessine le fond
	render(){
		this.clear();
		this.drawBackground();
		//boucle pour parcourir tout les joueurs et les afficher
		for(const id in this.game.players) {
			const player = this.game.players[id];
			this.drawPlayer(player)
		}
	}
}
