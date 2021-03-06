// Template for item card in NVsR

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
	diy.frontTemplateKey = 'item-front';
	diy.backTemplateKey = 'item-back';

	diy.portraitKey = 'item';
	diy.portraitBackgroundFilled = false;
	diy.portraitScaleUsesMinimum = true;
	diy.portraitClipping = false;
	
	// install the example character
	diy.name = #nvsr-item-name;
	$Faction = #nvsr-faction;
	$Slot = #nvsr-item-slot;
	//$SpecialTitle = #nvsr-item-specialtitle;
	$SpecialText = #nvsr-item-text;
	$Atk = '1';
	$Def = '0';
	$Buy = '3';
	$Sell = '2';
}

function onClear() {
	$Faction = '';
	$Slot = '';
	//$SpecialTitle = '';
	$SpecialText = '';
	$Atk = '1';
	$Def = '1';
	$Buy = '1';
	$Sell = '1';
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
	var factions = ['Neutral', 'Ninjas', 'Robots'];
	let combo_faction = comboBox( factions );
	bkgPanel.place( 'Faction', '', combo_faction, 'span');
	bindings.add( 'Faction', combo_faction, [0] );

	// Slot
	var slots = ['Hands', 'Head', 'Feet'];
	let combo_slot = comboBox( slots );
	bkgPanel.place( 'Slot', '', combo_slot, 'span');
	bindings.add( 'Slot', combo_slot, [0] );

	// Stats
	var statItems = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
	var statsPanel = new Grid( 'center, fillx, insets 0', '[center][center][center][center]' );
	// the $Settings to store the stats in
	var statSettings = ['Atk', 'Def', 'Buy', 'Sell'];
	var statLabels = [#nvsr_atk, #nvsr_def, #nvsr_buy, #nvsr_sell];	
	// the range of possible values for each stat
	for( let i=0; i<4; ++i ) {
		let combo = comboBox( statItems );
		statsPanel.place( statLabels[i],'' , combo, 'growx, width pref+16lp, gap unrel');
		bindings.add( statSettings[i], combo, [0] );
	}
	// add the --- Stats --- divider and panel
	bkgPanel.place( statsPanel, 'span' );
	
	/* Special Abilities Title
	var specialTitleField = textArea( '', 1, 15, false );
	bkgPanel.place( 'Ability Title :', 'span, wrap' );
	bkgPanel.place( specialTitleField, 'span, gap para, growx, wrap' );
	bindings.add( 'SpecialTitle', specialTitleField, [0] );
	*/
	
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
	
	// the item title (our name field)
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

	// Name of the item
	titleBox.markupText = diy.name;
	titleBox.drawAsSingleLine( g, R('title') );
	
	// Item picture
	sheet.paintPortrait( g );
		
	// Add symbols
	sheet.paintImage( g, 'gen-sym-atk', 10, 50, 40, 40);
	sheet.paintImage( g, 'gen-sym-def', 10, 98, 36, 36);
	sheet.paintImage( g, 'gen-sym-buy', 326, 22, 38, 38);
	sheet.paintImage( g, 'gen-sym-sell', 326, 71, 38, 38);

	// Add the slot symbol
	var slot_key = 'item-sym-' + $Slot;
	sheet.paintImage( g, slot_key, 10, 148, 36, 36);
	
	// Set font color
	g.setPaint( Color.BLACK );

	// Add the stats values
	paintStat( g, sheet, #nvsr_atk, $Atk, 'atk');
	paintStat( g, sheet, #nvsr_def, $Def, 'def');
	paintStat( g, sheet, #nvsr_buy, $Buy, 'buy');
	paintStat( g, sheet, #nvsr_sell, $Sell, 'sell');
	
	// draw the special ability
	// Ability zone background
	sheet.paintImage( g, 'gen-bg-ability', 16, 330);
	//sheet.drawTitle( g, #nvsr_abilities-title, R('special-title'), NVsR.titleFont, 10, sheet.ALIGN_LEFT );
	//sheet.drawTitle( g, $SpecialTitle, R('special-title'), NVsR.titleFont, 10, sheet.ALIGN_LEFT );
	specialTextBox.markupText = $SpecialText;
	specialTextBox.draw( g, R('special-text') );
	
	// Add the faction symbol	
	if ( $Faction != 'Neutral' ) {
		sheet.paintImage( g, 'fac-sym-bg', 3, 270, 55, 55);
		sheet.paintImage( g, 'fac-sym-' + $Faction, 14, 281, 33, 33);
		sheet.paintImage( g, 'fac-sym-bg-' + $Faction, 180, 345, 180, 180);	
	}
		
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
	var value = $('item-' + nametag + '-region');
	if( value == null ) {
		throw new Error( 'region not defined: ' + nametag );
	}
	return new Region( value );
}

function getFactions() {
	// $files = file_scan_directory('img/', '/.faction_*\.png$/ig');
	$files = file_scan_directory('.', '/.*\.*$/');
	return files;
}

testDIYScript( 'NVsR' );