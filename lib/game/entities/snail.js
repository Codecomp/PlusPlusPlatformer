ig.module(
	'game.entities.snail'
)
.requires(
    // note that anything in abstractities
    // is an abstract entity that needs to be extended
    'plusplus.abstractities.creature',
    // if you want to use the config
    // don't forget to require it
    'plusplus.core.config',
    // and some utils
    'plusplus.helpers.utils'
)
.defines(function(){
    "use strict";
    
    var _ut = ig.utils;
            
    ig.EntitySnail = ig.global.EntitySnail = ig.Creature.extend({
            
        size: {x: 16, y: 12},
        
        // animations the Impact++ way
        // note that these animations are for
        // both side scrolling and top down mode
        // you will likely only need one or the other
        // so your animSettings will be much simpler
        
        offset: {x: 0, y: 4},
        animSheet: new ig.AnimationSheet( 'media/snail.png', 16, 16 ),
        
        animInit: "idleX",
        
        // for example, a sidescroller's animSettings
        // will only use idleX and moveX
        // while a top down where entities can flip on X and Y
        // will use idleX/Y, moveX/Y
        // but if the entities CANNOT flip on X and Y
        // will use idleLeft/Right/Up/Down, moveLeft/Right/Up/Down
        
        animSettings: {
            idleX: {
                frameTime: 1,
                sequence: [1]
            },
            moveX: {
                frameTime: 0.4,
                sequence: [2, 3]
            }
        },
        
        // lets slow it downnnnnnn
        
        maxVelGrounded: { x: 25, y: 25 },
        frictionGrounded: { x: 800, y: 800 },
        speed: { x: 100, y: 100 },
        
        // stats
        
        health: 10,
        
        // explode with a few red particles when killed
        
        deathSettings: {
            spawnCountMax: 30,
            spawnSettings: {
                animTileOffset: ig.EntityParticleColor.colorOffsets.RED
            }
        },
        
        // snails can't jump or climb
        
        canJump: false,
        canClimb: false,
        
        // but they can wander!
        
        canWanderX: true,
        canWanderY: false,
        
        // use this method to add types for checks
        // since we are using bitwise flags
        // we can take advantage of the fact that they can be added
        
        initTypes: function () {
                
            this.parent();
            
            
            // snails can be damaged
            
            _ut.addType(ig.EntityExtended, this, 'type', "DAMAGEABLE");
            
            // snails are in enemy group and will not collide with or hurt each other
            
            _ut.addType(ig.EntityExtended, this, 'group', "ENEMY", "GROUP");
            
            // snails will collide and hurt any character not in their group
            
            _ut.addType(ig.EntityExtended, this, 'checkAgainst', "CHARACTER");
	    
        },
        
        check: function( entity ) {
                
            this.parent(entity);
            
            entity.receiveDamage( 10, this );
            
        }
        
    });

});