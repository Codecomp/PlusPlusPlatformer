ig.module(
    'game.entities.laser'
)

.requires(
    'plusplus.abstractities.projectile'
)

.defines(function () {
    ig.EntityLaser = ig.global.EntityLaser = ig.Projectile.extend({
        collides: ig.EntityExtended.COLLIDES.LITE,
        size: {x: 4, y: 4},
        offset: {x: 2, y: 2},
        animSheet: new ig.AnimationSheet( 'media/laser.png', 8, 8),
        animInit: "idleX",
        animSettings: {
            moveX: { sequence: [0], frameTime: 1 },
            deathX: { sequence: [1,2,3,4,5], frameTime: 0.05 }
        },
        damage: 2, // lasers hurt
        lifeDuration: 1, // lasers eventually fade (like a particle)
        gravityFactor: 0, // lasers ignore gravity
        friction: {x:0, y:0}, // lasers have no friction
        bounciness: 0, // lasers don't bounce
        collisionKills: true, // lasers stop if they hit a wall
    });
});