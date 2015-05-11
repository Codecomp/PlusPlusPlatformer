ig.module(
	'game.entities.crate'
)
.requires(
	'plusplus.abstractities.character',
        'plusplus.helpers.utils'
)
.defines(function(){
	"use strict"
        
	var _ut = ig.utils;
        
	ig.EntityCrate = ig.global.EntityCrate = ig.Character.extend({
		
                style: 0,
		
                health: 1,
                
		size: {x: 16, y: 16},
		
		collides: ig.EntityExtended.COLLIDES.ACTIVE,
		
		performance: ig.EntityExtended.PERFORMANCE.DYNAMIC,
		
		animSheet: new ig.AnimationSheet( 'media/crate.png', 16, 16 ),
		
		animInit: "idleX",
		
		animSettings: {
                        idle: {
				frameTime: 1,
				sequence:  [0]
			},
			style0: {
				frameTime: 1,
				sequence:  [0]
			},
			style1: {
				frameTime: 1,
				sequence:  [1]
			},
			style2: {
				frameTime: 1,
				sequence:  [2]
			},
			style3: {
				frameTime: 1,
				sequence:  [3]
			}
			
		},
		
		animsExpected: [
			"idle",
			"style0",
			"style1",
			"style2",
			"style3"
		],
		
		canWanderX: false,
                canWanderY: false,
                
                deathSettings: {
                    spawnCountMax: 30,
                    spawnSettings: {
                        animTileOffset: ig.EntityParticleColor.colorOffsets.BROWN
                    }
                },
                
                initTypes: function () {
                    
                    this.parent();
                    _ut.addType(ig.EntityExtended, this, 'type', "DAMAGEABLE");
                   
                    //_ut.addType(ig.EntityExtended, this, 'group', "ENEMY", "GROUP");
                    
                    //_ut.addType(ig.EntityExtended, this, 'checkAgainst', "CHARACTER");
	    
		}/*,
		
		initProperties: function( entity ){
			this.parent(entity);
			
			//this.currentAnim = this.anims['style'+0];
			//this.currentAnim = 'style'+this.style;
			
			//ig.log( this.currentAnim );
			ig.log( this.style );
		}/*,
		
		check: function( entity ) {
			
		    this.parent(entity);
		    
		    entity.receiveDamage( 10, this );
		    
		}*/
		
	});


});