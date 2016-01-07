importClass( gamedata.Game );

var settings;
var nvsrGame = Game.get( 'NVsR' );
if( nvsrGame != null ) {
	settings = nvsrGame.masterSettings;
} else {
	settings = Settings.shared;
}
settings.addSettingsFrom( 'settings.settings' );

var projBase = 'project:NVsR/resources/text/';
Language.getInterface().addStrings( projBase + 'common' );
Language.getGame().addStrings( projBase + 'game' );

useLibrary( 'project:NVsR/resources/objects.js' );