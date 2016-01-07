useLibrary('extension');
useLibrary('imageutils');

const name = new java.lang.String( 'Ninja Vs Robots' );
// const game = Game.get('*');
const game = new java.lang.String( 'NVsR' );
const expName = new java.lang.String( 'NVsR_Cards' );
const expLabel = new java.lang.String( 'Cards for NVsR' );

function getName() { return name; }
function getDescription() { return @eue_l_plug_desc; }

const egGame = Game.register(game, name, name, ImageUtils.get('img/symbol1.png'));

if( game != null ) Expansion.register(
	egGame, expName, expLabel, expLabel, ImageUtils.get('img/icon.png'),
	[
		ImageUtils.get('img/symbol1.png'),
		ImageUtils.get('img/symbol2.png')
	]
);


// Add Card components
ClassMap.add( 'cards/card_character_b.js' );