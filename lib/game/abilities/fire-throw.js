ig.module(
    'game.abilities.fire-throw'
)

.requires(
    'plusplus.abilities.ability-shoot',
    'game.entities.fireball'
)

.defines(function () {
    ig.FireThrow = ig.AbilityShoot.extend({
        spawningEntity: ig.EntityFireball,
		costActivate: 10,
        offsetVelX: 200,
        shootLocationMinPctY: 0.7,
        shootLocationMaxPctY: 0.7,
    });
});