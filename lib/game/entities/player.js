ig.module(
        'game.entities.player'
)

.requires(
    'plusplus.abstractities.player',
    //'game.abilities.fire-ball',
    'game.abilities.laser-gun',
    'game.abilities.fire-throw',
    'plusplus.ui.ui-meter',
    'plusplus.helpers.utils'
)

.defines(function () {
    var _ut = ig.utils;
    
    ig.EntityPlayer = ig.global.EntityPlayer = ig.Player.extend({
        size: {x: 16, y: 20},
        offset: {x: 0, y: 12},
        health:20,
        healthMax:20,
        energy:20,
        energyMax: 20,
        regen: true,
        regenEnergy: true,
        regenRateEnergy: 0.1,
        maxVelUngrounded: { x: 100, y: 350 },
        jumpForce: 7.5,
        animSheet: new ig.AnimationSheet( "media/player.png", 16, 32),
        animInit: "idleX",
        animSettings: {
            idleX: { sequence: [1], frameTime: 0.1 },
            moveX: { sequence: [9, 10], frameTime: 0.1 },
            jumpX: { sequence: [2], frameTime: 0.1 },
            fallX: { sequence: [3], frameTime: 0.1 },
            climb: { sequence: [5, 6], frameTime: 0.2 }//,
            //shootX: { sequence: [6, 7], frameTime: 0.4 }            
        },
        initProperties: function() {
            this.parent();
            this.shoot = new ig.LaserGun(this);
            this.abilities.addDescendants([
                this.shoot
            ]);
	    this.fire = new ig.FireThrow(this);
            this.abilities.addDescendants([
               this.fire
            ]);
        },
        
        //Array of skills the user is able to cycle through
        unlockedSkills: [/*'melee', */'laser-gun', 'fire-throw'],
        //ID of the currently active skill
        activeSkill: 0,
        
        handleInput: function() {
            this.parent();
            if (ig.input.pressed('swap')){
                this.activeSkill++;
                if (this.activeSkill ==  this.unlockedSkills.length){
                    this.activeSkill = 0;
                }
            }
            
            if (ig.input.pressed('shoot') && !this.climbing && this.unlockedSkills[this.activeSkill] == 'laser-gun') {
				this.shoot.activate({
                    x: this.flip.x ? this.pos.x : this.pos.x + this.size.x,
                    y: this.pos.y + this.size.y * 0.5
                });
            }
	    if (ig.input.pressed('shoot') && !this.climbing && this.unlockedSkills[this.activeSkill] == 'fire-throw') {
		this.fire.activate({
                    x: this.flip.x ? this.pos.x : this.pos.x + this.size.x,
                    y: this.pos.y + this.size.y * 0.5
                });
            }
        },
        initTypes: function() {
        
            this.parent();
            
	    this.activate();
			
            _ut.addType(ig.EntityExtended, this, 'checkAgainst', "COLLECTABLE");
        
        },
        check: function( entity ) {
            
            ig.log( entity );
            
            ig.game.score += entity.score;
            entity.die();
            
            //this.collectCollectable();
            
        },
        ui: {},
        activate: function(){
            ig.log('Activate');
            
            this.ui.healthMeter = ig.game.spawnEntity(ig.UIMeter, 0, 0, {
                animSheetPath: 'icons_stats.png',
                animSettings: true,
                fillStyle: 'rgb(255,54,90)',
                size: { x: 8, y: 8 },
                // by default margins are assumed to be a percent
                marginAsPct: false,
                margin: { x: 15, y: 15 }
            });
            this.ui.energyMeter = ig.game.spawnEntity(ig.UIMeter, 0, 0, {
                animSheetPath: 'icons_stats.png',
                animTileOffset: 1,
                animSettings: true,
                fillStyle: 'rgb(69,170,255)',
                size: { x: 8, y: 8 },
                linkedTo: this.ui.healthMeter,
                linkAlign: { x: 0, y: 1	},
                // by default margins are assumed to be a percent
                marginAsPct: false,
                margin: { x: 0,	y: 10 }
            });
            
        },
        deactivate: function () {
            this.parent();
            if ( this.ui.healthMeter ) {
                ig.game.removeEntity( this.ui.healthMeter );
                this.ui.healthMeter = null;
            }
	    
            if (this.ui.energyMeter) {
                ig.game.removeEntity(this.ui.energyMeter);
                this.ui.energyMeter = null;
            }
        },
        cleanupPersistent: function() {
           this.deactivate();
       },
       receiveDamage: function(amount, from, unblockable) {
            var killed = this._killed;
            var applied = this.parent(amount, from, unblockable);
            if (!killed && applied && this.ui.healthMeter) {
                this.ui.healthMeter.setMeterValue(this.health / this.healthMax);
            }
            return applied;
       },
       receiveHealing: function(amount, from) {
            this.parent(amount, from);
            if (!this._killed && this.ui.healthMeter) {
                this.ui.healthMeter.setMeterValue(this.health / this.healthMax);
            }
       },
       drainEnergy: function(amount, from, unblockable) {
            var killed = this._killed;
            var applied = this.parent(amount, from, unblockable);
            if (!killed && applied && this.ui.energyMeter) {
                this.ui.energyMeter.setMeterValue(this.energy / this.energyMax);
            }
       },
       receiveEnergy: function(amount, from) {
            this.parent(amount, from);
            if (!this._killed && this.ui.energyMeter) {
                this.ui.energyMeter.setMeterValue(this.energy / this.energyMax);
            }
       }
    });
});