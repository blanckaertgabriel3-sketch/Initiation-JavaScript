class GameView {
	constructor(game) {
		this.game = game;
		//récupération de l'élément canvas
		this.canvas = document.getElementById("canvas");
		//récupération des dimentions canvas
		this.canvas.height = 500;
		this.canvas.width = 800;
		this.sWidth = 64;
		this.sHeight = 64;
		this.dWidth = 64;
		this.dHeight = 64;
		//mettre bordure pour la visibilité du canvas
		this.canvas.style.border = "2px solid black";
		//récupération du context canvas
		this.ctx = this.canvas.getContext("2d");
		//chargement de spritesheet
		this.img = new Image();
		//récupérer skinPath dans le localStorage
		this.skinPath = localStorage.getItem("skinPath");
		this.img.src = this.skinPath;
		console.log("GameView instancié");
	}
	//Nettoie le canvas
	clear() {
		this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
	}
	//Dessine le fond
	drawBackground() {
		//x, y, width, height
		this.ctx.fillStyle = "pink";
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
		
	}
	drawPlayer(player) {
		const sx = player.walkSpriteIndex * this.sWidth;
		const sy = player.rowIndex * this.sHeight;
		const dx = player.renderX * this.canvas.width;
		const dy = player.renderY * this.canvas.height;
		if (!player.img) {
			player.img = new Image();
			player.img.src = player.skinPath;
		}
		this.ctx.drawImage(player.img, sx, sy, this.sWidth, this.sHeight, dx, dy, this.dWidth, this.dHeight);
	}
	//Nettoie le canvas + Dessine le fond
	render(){
		this.clear();
		this.drawBackground();
		//boucle pour parcourir tout les joueurs et les afficher
		for(const id in this.game.players) {
			const player = this.game.players[id];
			//sécurité anti-crash
			if (!player || player.renderX === undefined || player.renderY === undefined) {
				continue;
			}
			//les animations des joueurs
			player.animate();
			this.drawPlayer(player);
		}
	}
}
