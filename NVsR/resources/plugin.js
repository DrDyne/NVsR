useLibrary( 'extension' );
importClass( gamedata.SymbolVariantUtilities );

function initialize() {

	try {
		const uiLang = Language.getInterface();
		const gameLang = Language.getGame();

		// load localized strings
		uiLang.addStrings( 'text/ui' );
		uiLang.addStrings( 'text/common' );
		gameLang.addStrings( 'text/game' );
		gameLang.addStrings( 'text/common' );

		// create the NVsR named object
		useLibrary( 'res://objects.js' );
		const NVsR = Eons.namedObjects.NVsR;

		// register NVsR as a game supported by Strange Eons
		registerGame();
		//registerOfficialExpansions();
		
		Game.get( 'NVsR' ).masterSettings.addSettingsFrom( 'settings.settings' );
		
		ClassMap.add( 'base.classmap' );

	} catch( ex ) {
		Eons.log.severe( 'NVsR plug-in failed to start' );
		Error.handleUncaught( ex );
		return false;
	}
	return true;
}

function getName() {
    return @nvsr_plug_name;
}

function getDescription() {
    return @nvsr_plug_desc;
}

function getVersion() {
    return 1.0;
}

function registerGame() {
	var est = new AbstractExpansionSymbolTemplate() {};
	return Game.register('NVsR', @nvsr_game, ImageUtils.get( 'img/icon.png' ));
}

function registerOfficialExpansions() {
	// this script contains the actual registration code;
	// it is in a separate library because we also register
	// expansions during testing
	//useLibrary( 'res://resources/register-exps.js' );
}