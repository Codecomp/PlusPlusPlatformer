ig.module(
    'game.entities.spring'
)
.requires(
    'plusplus.abstractities.creature',
    'plusplus.helpers.utils'
)
.defines(function(){
    "use strict"
    
    var _ut = ig.utils;
    
    ig.EntitySpring = ig.global.EntitySpring = ig.Character.extend({
        
        springVelocity: 350,
        
        size: {x: 16, y: 8},
        offset: {x: 0, y: 8},
        
        collides: ig.EntityExtended.COLLIDES.STATIC,
        
        performance: ig.EntityExtended.PERFORMANCE.STATIC,
        
        animSheet: new ig.AnimationSheet( 'media/spring.png', 16, 16 ),
        
        animInit: "idle",
        
        animSettings: {
            idle: {
                frameTime: 1,
                sequence: [2]
            },
            bounce: {
                frameTime: 0.3,
                sequence: [2, 1, 0, 0, 1, 2]
            }
        },
        
        animsExpected: [
                "idle",
                "bounce"
        ],
        
        canWanderX: false,
        canWanderY: false,
        
        initTypes: function () {
            
            this.parent();
            
            _ut.addType(ig.EntityExtended, this, 'checkAgainst', "CHARACTER");
            
        },
        
        check: function( entity ) {
                
            this.parent(entity);
            
            if ( entity instanceof EntityPlayer )  {
                
                ig.log(this.currentAnim);
                ig.log(this.anims["bounce"]);
                
                this.currentAnim = this.anims["bounce"];
                
                if ( ig.input.state('jump') ) {
                    entity.vel.y = -1 * Math.abs(this.springVelocity + 50);
                } else {
                    entity.vel.y = -1 * Math.abs(this.springVelocity);
                }
                ig.log('Jump velocity: '+entity.vel.y);
            }
            
        }
            
    });


});