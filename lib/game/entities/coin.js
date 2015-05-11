ig.module(
	'game.entities.coin'
)
.requires(
    // note that anything in abstractities
    // is an abstract entity that needs to be extended
    'plusplus.abstractities.character',
    // require the glow ability
    // lets see some lights!
    //'plusplus.abilities.glow',
    // if you want to use the config
    // don't forget to require it
    'plusplus.core.config',
    // and some utils
    'plusplus.helpers.utils'
)
.defines(function(){
    "use strict";
    
    var _ut = ig.utils;
            
    ig.EntityCoin = ig.global.EntityCoin = ig.Character.extend({
        
        score: 1,
        
        size: {x: 12, y: 13},
        offset: {x: 2, y: 1},
        
        // coins don't need to collide
        
        collides: ig.EntityExtended.COLLIDES.NEVER,
        
        // coins don't move or update
        
        performance: ig.EntityExtended.PERFORMANCE.STATIC,
        
        animSheet: new ig.AnimationSheet( 'media/coin.png', 16, 16 ),
        
        animInit: "idleX",
        
        animSettings: {
            idleX: {
                frameTime: 1,
                sequence:  [0]
            }
        },
        
        // never needs to flip on y
        
        canFlipX: false,
        canFlipY: false,
        
        invulnerable: true,
        
        // use this method to add properties
        // that need to be initialized one time
        // before the entity is added to the game
        
        initProperties: function () {
                
            this.parent();
                
        },
        
        initTypes: function() {
        
            this.parent();
            
            _ut.addType(ig.EntityExtended, this, 'type', "COLLECTABLE");
        
        }
            
    });

});