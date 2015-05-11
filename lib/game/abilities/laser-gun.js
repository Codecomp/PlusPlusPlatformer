ig.module(
    'game.abilities.laser-gun'
)

.requires(
    'plusplus.abilities.ability-shoot',
    'game.entities.laser'
)

.defines(function () {
    ig.LaserGun = ig.AbilityShoot.extend({
        spawningEntity: ig.EntityLaser,
		costActivate: 2,
        offsetVelX: 200,
        shootLocationMinPctY: 0.7,
        shootLocationMaxPctY: 0.7,
    });
});