ig.module(
	'game.main'
)

.requires(
	'plusplus.core.plusplus',
	'game.levels.test',
	'plusplus.debug.debug'
)

.defines(function () {
	"use strict";
	var _c = ig.CONFIG;
	var myGame = ig.GameExtended.extend({
	
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),
	
	//Define players score
	score: 0,
	
	init: function () {
		this.parent();
		this.loadLevel(ig.global.LevelTest);
	},
	inputStart: function () {
		this.parent();
		ig.input.bind(ig.KEY.X, 'jump');
		ig.input.bind(ig.KEY.C, 'shoot');
		ig.input.bind(ig.KEY.MOUSE1, 'shoot');
		ig.input.bind(ig.KEY.E, 'swap');
		ig.input.bind(ig.KEY.MOUSE2, 'swap');
	},
	inputEnd: function () {
		this.parent();
		ig.input.bind(ig.KEY.X, 'jump');
		ig.input.unbind(ig.KEY.C, 'shoot');
		ig.input.unbind(ig.KEY.MOUSE1, 'shoot');
		ig.input.unbind(ig.KEY.E, 'swap');
		ig.input.unbind(ig.KEY.MOUSE2, 'swap');
	},
	draw: function(){
		
		this.parent();
		
		this.font.draw( this.score, ig.system.width, 8, ig.Font.ALIGN.RIGHT );
		
	}/*,
	shapesPasses: [
		// for climbing
		// we ignore solids and one ways
		// to only retrieve climbable areas
		{
			ignoreSolids: true,
			ignoreOneWays: true
		},
		// for lighting and shadows
		// we ignore climbables and the edge boundary
		{
			ignoreClimbable: true,
			// throw away the inner loop of the edge of the map
			discardBoundaryInner: true,
			// throw away the outer loop of the edge of the map
			retainBoundaryOuter: false
		}
	]*/
});

ig.main( '#canvas', myGame, 60, 320, 240, 1, ig.LoaderExtended );

});