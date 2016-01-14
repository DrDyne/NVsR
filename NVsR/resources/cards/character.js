// Template for action card in NVsR

useLibrary( 'diy' );
useLibrary( 'ui' );
useLibrary( 'imageutils' );

var titleBox;
var specialTextBox;

if( sourcefile == 'Quickscript' ) {
	useLibrary( 'project:NVsR/resources/test-lib.js' );
}


const NVsR = Eons.namedObjects.NVsR;

function create( diy ) {
	diy.cardVersion = 1;
	diy.extensionName = 'NVsR.seext';
	diy.faceStyle = FaceStyle.PLAIN_BACK;
	diy.frontTemplateKey = 'char-front';
	diy.backTemplateKey = 'char-back';

	diy.portraitKey = 'char';
	diy.portraitBackgroundFilled = true;
	diy.portraitScaleUsesMinimum = false;
	diy.portraitClipping = false;
	
	// install the example character
	diy.name = #nvsr-char-name;
	$Faction = #nvsr-faction;
	$SpecialTitle = #nvsr-abilities-title;
	$SpecialText = #nvsr-abilities-text;
	$Atk = '1';
	$Def = '1';
	$Life = '50';
}

function onClear() {
	$Faction = '';
	$SpecialTitle = '';
	$SpecialText = '';
	$Atk = '1';
	$Def = '1';
	$Life = '50';
}

function createInterface( diy, editor ) {
	var nameField = textField();
	diy.nameField = nameField;

	var bindings = new Bindings( editor, diy );

	// Background panel
	var bkgPanel = new Grid( '', '[min:pref][0:pref,grow,fill][0:pref][0:pref]', '');
	bkgPanel.setTitle( @nvsr_content );
	bkgPanel.place( @nvsr_title, '', nameField, 'growx, span, wrap' );

	// Faction
	var factions = ['Ninjas', 'Robots'];
	let combo_faction = comboBox( factions );
	bkgPanel.place( 'Faction', '', combo_faction, 'span');
	bindings.add( 'Faction', combo_faction, [0] );

	// Stats
	var statItems = ['0', '1', '2', '3', '4', '5', '6'];
	let combo_atk = comboBox( statItems );
	bkgPanel.place(noteLabel(#nvsr_atk), 'gap unrel');
	bkgPanel.place( combo_atk, 'growx, width pref+16lp, gap unrel');
	bindings.add( 'Atk', combo_atk, [0] );
	
	let combo_def = comboBox( statItems );
	bkgPanel.place(noteLabel(#nvsr_def), 'gap unrel');
	bkgPanel.place( combo_def, 'growx, width pref+16lp, gap unrel');
	bindings.add( 'Def', combo_def, [0] );
	
	var lifeValues = ['40', '45', '50', '55', '60'];
	let combo = comboBox( lifeValues );
	bkgPanel.place(noteLabel(#nvsr_life), 'gap unrel');
	bkgPanel.place( combo, 'growx, width pref+16lp, gap unrel, wrap');
	bindings.add( 'Life', combo, [0] );	
	
	// Special Abilities Title
	var specialTitleField = textArea( '', 1, 15, false );
	bkgPanel.place( 'Ability Title :', 'span, wrap' );
	bkgPanel.place( specialTitleField, 'span, gap para, growx, wrap' );
	bindings.add( 'SpecialTitle', specialTitleField, [0] );
	
	// Special Abilities Text
	var specialTextField = textArea( '', 17, 15, true );
	bkgPanel.place( 'Ability Text :', 'span, wrap' );
	//bkgPanel.place( #nvsr-abilities-title, 'span, wrap' );
	bkgPanel.place( specialTextField, 'span, gap para, growx, wrap' );
	bindings.add( 'SpecialText', specialTextField, [0] );

	bkgPanel.addToEditor( editor, @nvsr_content, null, null, 0 );	
	bindings.bind();
}

function createFrontPainter( diy, sheet ) {

	if( sheet.sheetIndex == 2 ) return;
	
	// the character title (our name field)
	titleBox = NVsR.titleBox( sheet, true, 13 );
	titleBox.alignment = titleBox.LAYOUT_LEFT;
	
	// the text of the special ability
	specialTextBox = NVsR.titleBox( sheet, false, 7.5 );	
	specialTextBox.lineTightness = 1.5;
	specialTextBox.alignment = specialTextBox.LAYOUT_TOP|specialTextBox.LAYOUT_LEFT;

}

function paintFront( g, diy, sheet ) {
	if( sheet.sheetIndex == 2 ) {}
	
	// Background
	sheet.paintTemplateImage( g );

	
	// Character portrait
	sheet.paintPortrait( g );
	
	// Name of the character
	titleBox.markupText = diy.name;
	titleBox.drawAsSingleLine( g, R('title') );
	
	// Ability zone background
	sheet.paintImage( g, 'gen-bg-ability', 16, 330);
	
	// Add symbols for life def and atk
	sheet.paintImage( g, 'gen-sym-atk', 10, 50, 40, 40);
	sheet.paintImage( g, 'gen-sym-def', 10, 98, 36, 36);
	sheet.paintImage( g, 'gen-sym-life', 10, 148, 36, 36);
	
	// draw the special ability
	//sheet.drawTitle( g, #nvsr_abilities-title, R('special-title'), NVsR.titleFont, 10, sheet.ALIGN_LEFT );
	sheet.drawTitle( g, $SpecialTitle, R('special-title'), NVsR.titleFont, 10, sheet.ALIGN_LEFT );
	specialTextBox.markupText = $SpecialText;
	specialTextBox.draw( g, R('special-text') );
	
	// Set font color
	g.setPaint( Color.BLACK );

	// draw the stats around the outside
	paintStat( g, sheet, #nvsr_atk, $Atk, 'atk');
	paintStat( g, sheet, #nvsr_def, $Def, 'def');
	paintStat( g, sheet, #nvsr_life, $Life, 'life');
	
	// Add the faction symbol
	sheet.paintImage( g, 'fac-sym-bg', 3, 270, 55, 55);
	sheet.paintImage( g, 'fac-sym-' + $Faction, 14, 281, 33, 33);
	sheet.paintImage( g, 'fac-sym-bg-' + $Faction, 180, 345, 180, 180);
		
}

function paintStat( g, sheet, stat, value, region) {
	if( value != null ) {
		stat = sprintf( #nvsr_stat_format, value );
	}
	sheet.drawTitle ( g, stat, R(region), NVsR.titleFont, 10, sheet.ALIGN_LEFT );
}

function paintMarker( g, sheet ) {
	sheet.paintMarkerPortrait( g );
	sheet.paintTemplateImage( g );
}

function createBackPainter( diy, sheet ) {}
function paintBack( g, diy, sheet ) {
	sheet.paintTemplateImage( g );
}

function onRead() {}
function onWrite() {}

function R( nametag ) {
	var value = $('char-' + nametag + '-region');
	if( value == null ) {
		throw new Error( 'region not defined: ' + nametag );
	}
	return new Region( value );
}

testDIYScript( 'NVsR' );