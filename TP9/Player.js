/*
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
*/

const directions = {
    north: 0,
    east: 1,
    south: 2,
    west: 3
}

class Player {
    constructor(id, name, skinPath, position) {
        // Unique identifier attributed by the server
        this.id = id;
        // Name of the player (chosen at portal)
        this.name = name;
        // Path to the spritesheet used to represent the player (idem)
        this.skinPath = skinPath;

        // --- RENDER positions ---
        this.renderX = position[0];
        this.renderY = position[1];

        // --- Stats ---
        this.lvl = 1;
        this.hp = 100;
        this.maxHp = 100;
        this.speed = 0.2;

        // --- Direction & states ---
        this.direction = directions.south;
        this.isWalking = false;
        this.isAttacking = false;
        this.isDying = false;
        this.isDead = false;
        
        // --- Animations (remains non affected by server updates, only concernes frontend logic) ---
        
        
        this.walkSpriteIndex = 0;
        this.walkSpritesNumber = 9;
        this.currentWalkSpriteStep = 0;
        this.walkSpriteDuration = 3;
        
        this.attackSpriteIndex = 0;
        this.attackSpritesNumber = 6;
        this.currentAttackSpriteStep = 0;
        this.attackSpriteDuration = 12;
        
        this.deathSpriteIndex = 0;
        this.deathSpritesNumber = 6;
        this.currentDeathSpriteStep = 0;
        this.deathSpriteDuration = 5;

        this.walkRowIndex = 40; // default = south
    }
    
    update(updateData) {
        
        // Update authoritative position
        [this.renderX, this.renderY] = updateData.position;
        
        // Update stats
        this.name = updateData.name
        this.lvl = updateData.lvl;
        this.hp = updateData.hp;
        this.maxHp = updateData.maxHp;
        this.attackCooldown = updateData.attackCooldown;
        this.currentAttackCooldown = updateData.currentAttackCooldown;
        this.speed = updateData.speed;
        
        this.direction = updateData.direction;
        this.isAttacking = updateData.isAttacking;
        this.isWalking = updateData.isWalking;
        this.isDying = updateData.isDying;
        this.skinPath = updateData.skinPath;
    }
    
    animate() {
        // If the player is walking
        if (this.isWalking) {
            // Reset attack sprite index and current attack sprite's step to 0 as we may have interrupted an attack animation
            // -----------------------------------------------------------------this.attackSpriteIndex = 0;
            switch(this.direction) {
                // north
                case 0:
                    this.walkRowIndex = 21;
                    this.walkSpritesNumber = 6;
                    break;
                    // east
                case 1:
                    this.walkRowIndex = 11;
                    this.walkSpritesNumber = 9;
                    break;
                // south
                case 2:
                    this.walkRowIndex = 40;
                    this.walkSpritesNumber = 8;
                    break;
                // west
                case 3:
                    this.walkRowIndex = 9;
                    this.walkSpritesNumber = 9;
                    break;
            }
            //-------------------------------------------------------------------------------- this.currentAttackSpriteStep = 0;
            
            // Increment the current walk sprite step to display the current walking animation sprite for the right number of frames
            this.currentWalkSpriteStep++;
            // If we displayed it for long enough
            if (this.currentWalkSpriteStep >= this.walkSpriteDuration) {
                // Then we reset our step and increment our sprite index to go for the next sprite in the animation
                this.currentWalkSpriteStep = 0;
                this.walkSpriteIndex++;
            }
            // If we reach the last sprite in the animation and try going for the next one
            if (this.walkSpriteIndex >= this.walkSpritesNumber) {
                // We reset our index to display the first sprite of the animation instead, forming a looping animation
                this.walkSpriteIndex = 0;
            }
        }
        // If the player is attacking, or the attack animation started already
        else if (this.isAttacking || this.currentAttackSpriteStep > 0 || this.attackSpriteIndex > 0) {
            // Reset the walking animation variables as we may have interrupted a walking animation
            this.currentWalkSpriteStep = 0;
            this.walkSpriteIndex = 0;
            
            switch(this.direction) {
                // north
                case 0:
                    this.attackRowIndex = 1;
                    this.attackSpritesNumber = 6;
                    break;
                    // east
                case 1:
                    this.attackRowIndex = 4;
                    this.attackSpritesNumber = 6;
                    break;
                // south
                case 2:
                    this.attackRowIndex = 3;
                    this.attackSpritesNumber = 6;
                    break;
                // west
                case 3:
                    this.attackRowIndex = 2;
                    this.attackSpritesNumber = 6;
                    break;
            }
            // Increment the current attack sprite step to display the current attacking animation sprite for the right number of frames
            this.currentAttackSpriteStep++;
            // If we displayed it for long enough
            if (this.currentAttackSpriteStep >= this.attackSpriteDuration) {
                // Then we reset our step and increment our sprite index to go for the next sprite in the animation
                this.currentAttackSpriteStep = 0;
                this.attackSpriteIndex++;
            }
            // If we reach the last sprite in the animation and try going for the next one
            if (this.attackSpriteIndex >= this.attackSpritesNumber){
                /*
                    We reset our sprite index to 0 for the next attack animation.
                    This reset does not serve a looping purpose like for the walking animation ;
                    The else if condition leading to our attack animation needs at least one of currentAttackSpriteStep and attackSpriteIndex to be > 0
                    When we reach the if we are in right now, currentAttackSpriteStep is always equal to 0
                    When we'll get out of it, attackSpriteIndex will be set to 0 too
                    This will signify that the animation is over, and the else if condition leading to our attack animation should not trigger anymore.
                    This mecanism is implemented to avoid playing several attacking animations in a row (graphically incoherent with our attack cooldown).
                    The only exception would be for the server to maintain isAttacking at true even after the end of the animation.
                    This is not supposed to happen as i programmed the server to maintain isAttacking at true for a very short amount of time.
                    */
                   
                   this.attackSpriteIndex = 0;
                }
        }
        // If the player is dying, or the dying animation already started
        else if (this.isDying || this.currentDeathSpriteStep > 0 || this.deathSpriteIndex > 0) {
            // No resets here as this will be the last animation of the player (ce n'est qu'un au revoir bebou).
            // Increment the current death sprite step to display the current death animation sprite for the right number of frames
            this.currentDeathSpriteStep++;
            // If we displayed it for long enough
            if (this.currentDeathSpriteStep >= this.deathSpriteDuration) {
                // Then we reset our step and increment our sprite index to go for the next sprite in the animation
                this.currentDeathSpriteStep = 0;
                this.deathSpriteIndex++;
            }
            // If we reach the last sprite in the animation and try going for the next one
            if (this.deathSpriteIndex >= this.deathSpritesNumber) {
                // It means the animation is over ; we set isDead at true to keep the player from being displayed in next frames
                // e.g, we make it disappear like in the good old URSS days.
                this.isDead = true;
            }
        }
        // If the player is idle
        else {            
            // We just select the first sprite of its walking animation
            this.walkSpriteIndex = 0;
        }
    }
}