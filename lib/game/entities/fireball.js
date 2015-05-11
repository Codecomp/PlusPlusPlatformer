ig.module(
    'game.entities.fireball'
)

.requires(
    'plusplus.abstractities.projectile',
	'plusplus.abilities.glow'
)

.defines(function () {
    ig.EntityFireball = ig.global.EntityFireball = ig.Projectile.extend({
        collides: ig.EntityExtended.COLLIDES.LITE,
        size: {x: 12, y: 12},
        offset: {x: 2, y: 2},
        animSheet: new ig.AnimationSheet( 'media/fireball.png', 16, 16),
        animInit: "idleX",
        animSettings: {
            moveX: { sequence: [0, 1, 2, 3], frameTime: 0.05 },
            deathX: { sequence: [4, 5], frameTime: 0.05 }
        },
        damage: 5, // lasers hurt
        lifeDuration: 2, // lasers eventually fade (like a particle)
        gravityFactor: 0.7, // lasers ignore gravity
        friction: {x:0, y:0}, // lasers have no friction
        bounciness: 5, // lasers don't bounce
        collisionKills: false, // lasers stop if they hit a wall
		
		glowSettings: {
			sizeMod: 2,
			fadeInDuration: 0,
			r: 100,
			g: 0,
			b: 0
		},
		
		initProperties: function() {

			this.parent();

			this.glow = new ig.AbilityGlow(this);

		}
    });
});