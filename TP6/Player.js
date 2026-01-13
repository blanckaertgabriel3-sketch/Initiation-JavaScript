class Player {
	constructor(name, position){
		this.name = name;
		this.level = 1;
		this.speed = 1;
		this.health = 100;
		this.couldown = 1;
		this.damage = 1;
		this.position = position;
		//dying
		this.isDying = false;
		this.dyingSpriteIndex = 0;
		this.dyingSpriteNumber = 9;
		this.dyingSpriteDuration = 2;
		this.currentDyingSpriteStep = 0;
		//attacking
		this.isAttacking = false;
		this.attackingSpriteIndex = 0;
		this.attackingSpriteNumber = 9;
		this.currentAttackingSpriteStep = 0;
		this.attackingSpriteDuration = 2;
		//moving
		this.isMoving = false;
		this.walkSpriteIndex = 0;
		this.walkSpriteNumber = 9;
		this.currentWalkSpriteStep = 0;
		this.walkSpriteDuration = 2;
		//idle
		this.isIdle = false;
		this.idleSpriteIndex =0;
		this.idleSpriteNumber = 9;
		this.currentIdleSpriteStep = 0;
		this.idleSpriteDuration = 2;
	}
	
	updade() {
		//...
	}
	animate() {
		//if the player is not Idle
		if (this.isMoving === true || this.isAttacking === true || this.isDying === true) {
			this.isIdle = false;
		}
		//if the player is Idle
		else if (this.isMoving === false && this.isAttacking === false && this.isDying === false) {
			this.isIdle = true;
		}
		//the player is moving
		if (this.isMoving) {
			
			this.currentWalkSpriteStep ++;
			this.walkSpriteIndex ++;
			if (this.currentWalkSpriteStep >= this.walkSpriteDuration) {
				this.currentWalkSpriteStep = 0;
			}
			if (this.walkSpriteIndex >= this.walkSpriteNumber) {
				this.walkSpriteIndex = 0;
			}
		}
		//the player is attacking
		else if (this.isAttacking) {
			this.attackingSpriteIndex ++;
			this.currentAttackingSpriteStep ++;
			if (this.currentAttackingSpriteStep >= this.attackingSpriteDuration) {
				this.currentAttackingSpriteStep = 0;
			}
			if (this.attackingSpriteIndex >= this.attackingSpriteNumber) {
				this.attackingSpriteIndex = 0;
			}

		}
		//the player is dying
		else if (this.isDying) {
			this.dyingSpriteIndex ++;
			this.currentDyingSpriteStep ++;
			if (this.currentDyingSpriteStep >= this.dyingSpriteDuration) {
				this.currentDyingSpriteStep = 0;
			}
			if (this.dyingSpriteIndex >= this.dyingSpriteNumber) {
				this.dyingSpriteIndex = 0;
			}
		}
		//is idle
		else {
			this.idleSpriteIndexSpriteIndex ++;
			this.currentIdleSpriteStep ++;
			if (this.currentIdleSpriteStep >= this.idleSpriteDuration) {
				this.currentIdleSpriteStep = 0;
			}
			if (this.idleSpriteIndex >= this.idleSpriteNumber) {
				this.idleSpriteIndex = 0;
			}
		}
		
	}
}

player1 = new Player("toto", [0, 0]);
player1.isMoving = true;
for (let i = 0; i < 10 ; i++) {
	player1.animate();
}
