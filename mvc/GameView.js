export default class GameView {
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
		//chargement du background
		this.bgPath = new Image();
		this.bgPath.src = "img/bg-piscine.png";
		this.ctx.src = this.bgPath;
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
		// this.ctx.fillStyle = "pink";
		this.ctx.drawImage(
			this.bgPath,
			0,
			0,
			this.canvas.width,
			this.canvas.height
		);

		// this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
		
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
		const sWidthAttack = 192; //128 ou 192
		const sHeightAttack = 192;
		const dWidthAttack = 192; //128 ou 192
		const dHeightAttack = 192;

		// Dimensions de rendu sur canvas (toujours 64x64 pour la taille du joueur)
		const dWidth = 64;
		const dHeight = 64;

		// Coordonnées de rendu du joueur sur le canvas
		const dx = player.renderX * this.canvas.width;
		const dy = player.renderY * this.canvas.height;
		
		// --- ATTACK ---
		if (player.isAttacking || player.currentAttackSpriteStep > 0 || player.attackSpriteIndex > 0) {
			const dxAttack = player.renderX * this.canvas.width - 64;
			const dyAttack = player.renderY * this.canvas.height - 64;
			// Coordonnées dans la sprite sheet
			const sx = player.attackSpriteIndex * sWidthAttack;
			//sy = la ligne de l'attaque + les 54frames normales au dessus de la hauteur dHeight
			const sy = 54 * dHeight + player.attackRowIndex * sHeightAttack;
			this.ctx.drawImage(
				player.img,
				sx, sy, sWidthAttack, sHeightAttack, // source
				dxAttack, dyAttack, dWidthAttack, dHeightAttack // destination
			);
		} 
		// --- WALK / IDLE ---
		else {
			let sx = player.walkSpriteIndex * sWidth;
			let sy = player.walkRowIndex * sHeight;
			
			if (player.isDying) {
				sx = player.deathSpriteIndex * sWidth;
				sy = player.deathRowIndex * sHeight;
			}
			this.ctx.drawImage(
				player.img,
				sx, sy, sWidth, sHeight, // source
				dx, dy, dWidth, dHeight // destination
			);
		}
		
		let percentage = player.hp / player.maxHp
		let hpSize = 64*percentage;
		if(!player.isDying && !player.isDead) {
			//afficher le name
			this.ctx.fillStyle = "black";
			this.ctx.font = "12px Arial";
			this.ctx.textAlign = "center";
			this.ctx.fillText(player.name,dx + 32,dy + 78);
			//afficher le level
			this.ctx.fillStyle = "black";
			this.ctx.font = "12px Arial";
			this.ctx.textAlign = "center";
			this.ctx.fillText("Lv " + player.lvl,dx + 32,dy - 12);
			//barre de vie
			this.ctx.fillStyle = "red";
			this.ctx.fillRect(dx, dy-7, 64, 5);
			this.ctx.fillStyle = "green";
			this.ctx.fillRect(dx, dy-7, hpSize, 5);
			//barre de cooldown
			this.ctx.fillStyle = "blue"; 
			this.ctx.fillRect(dx, dy, 64*player.currentAttackCooldown, 5);
		}
		
	}
	drawTimerNbPlayer() {
		//afficher le timer
		this.ctx.fillStyle = "black";
		this.ctx.font = "32px Mali";
		this.ctx.textAlign = "center";
		this.ctx.fillText(this.game.timer.toFixed(2), 140, 25);
		//afficher le nombre de joueurs
		this.ctx.fillStyle = "black";
		this.ctx.font = "32px Mali";
		this.ctx.textAlign = "center";
		this.ctx.fillText(this.alivePlayer + "/" + this.totalPlayers, 700, 25);
		
	}	
	
	//Nettoie le canvas + Dessine le fond
	render(alpha){
		this.clear();
		this.drawBackground();
		//compter le nomber de joueurs
		this.totalPlayers = Object.keys(this.game.players).length;
		//compter les joueurs vivants
		this.alivePlayer = 0;
		//boucle pour parcourir tout les joueurs et les afficher
		for(const id in this.game.players) {
			const player = this.game.players[id];
			//sécurité anti-crash
			if (!player || player.renderX === undefined || player.renderY === undefined) {
				continue;
			}
			if(!player.isDying && !player.isDead) {
				this.alivePlayer ++;
			}
			//les animations des joueurs
			player.animate();
			player.interpolate(alpha);
			this.drawPlayer(player);
		}
		this.drawTimerNbPlayer();
	}
}
