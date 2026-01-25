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
		// Charger l'image si nécessaire
		if (!player.img) {
			player.img = new Image();
			player.img.src = player.skinPath;
		}

		// Dimensions des sprites
		const sWidth = 64;
		const sHeight = 64;
		const sWidthAttack = 128;
		const sHeightAttack = 128;

		// Dimensions de rendu sur canvas (toujours 64x64 pour la taille du joueur)
		const dWidth = 64;
		const dHeight = 64;

		// Coordonnées de rendu du joueur sur le canvas
		const dx = player.renderX * this.canvas.width;
		const dy = player.renderY * this.canvas.height;

		// --- ATTACK ---
		if (player.isAttacking || player.currentAttackSpriteStep > 0 || player.attackSpriteIndex > 0) {
			// Coordonnées dans la sprite sheet
			const sx = player.attackSpriteIndex * sWidthAttack;
			const sy = player.attackRowIndex * sHeightAttack;

			// Centrer le sprite plus grand sur le joueur
			const drawX = dx - sWidthAttack / 2 + dWidth / 2;
			const drawY = dy - sHeightAttack / 2 + dHeight / 2;

			this.ctx.drawImage(
				player.img,
				sx, sy, sWidthAttack, sHeightAttack, // source
				drawX, drawY, sWidthAttack, sHeightAttack // destination
			);
		} 
		// --- WALK / IDLE ---
		else {
			const sx = player.walkSpriteIndex * sWidth;
			const sy = player.walkRowIndex * sHeight;

			this.ctx.drawImage(
				player.img,
				sx, sy, sWidth, sHeight, // source
				dx, dy, dWidth, dHeight // destination
			);
		}
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
