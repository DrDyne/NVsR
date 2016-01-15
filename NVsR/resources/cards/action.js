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
	diy.frontTemplateKey = 'action-front';
	diy.backTemplateKey = 'action-back';

	diy.portraitKey = 'action';
	diy.portraitBackgroundFilled = false;
	diy.portraitScaleUsesMinimum = true;
	diy.portraitClipping = false;
	
	// install the example character
	diy.name = #nvsr-action-name;
	$Faction = #nvsr-faction;
	$SpecialText = #nvsr-action-text;
	$Buy = '3';
	$Sell = '2';
}

function onClear() {
	$Faction = '';
	$SpecialText = '';
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

	// Stats
	var statItems = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
	var statsPanel = new Grid( 'center, fillx, insets 0', '[center][center][center][center]' );
	// the $Settings to store the stats in
	var statSettings = ['Buy', 'Sell'];
	var statLabels = [#nvsr_buy, #nvsr_sell];	
	// the range of possible values for each stat
	for( let i=0; i<2; ++i ) {
		let combo = comboBox( statItems );
		statsPanel.place( statLabels[i],'' , combo, 'growx, width pref+16lp, gap unrel');
		bindings.add( statSettings[i], combo, [0] );
	}
	// add the --- Stats --- divider and panel
	bkgPanel.place( statsPanel, 'span' );
	
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
	titleBox = NVsR.titleBox( sheet, true, 36 );
	titleBox.alignment = titleBox.LAYOUT_CENTER|titleBox.LAYOUT_MIDDLE;
	
	// the text of the special ability
	specialTextBox = NVsR.titleBox( sheet, false, 8 );	
	specialTextBox.lineTightness = 1.5;
	specialTextBox.alignment = specialTextBox.LAYOUT_TOP|specialTextBox.LAYOUT_LEFT;

}

function paintFront( g, diy, sheet ) {
	if( sheet.sheetIndex == 2 ) {}
	
	// Background
	sheet.paintTemplateImage( g );

	// Name of the action
	titleBox.markupText = diy.name;
	titleBox.drawAsSingleLine( g, R('title') );
	
	// Action picture
	sheet.paintPortrait( g );
	
	// Ability zone background
	sheet.paintImage( g, 'gen-bg-ability', 30, 680, 690, 340);
	
	// Add symbols
	sheet.paintImage( g, 'gen-sym-buy', 640, 40, 90, 90);
	sheet.paintImage( g, 'gen-sym-sell', 640, 160, 90, 90);

	// Set font color
	g.setPaint( Color.BLACK );

	// Add the stats values
	paintStat( g, sheet, #nvsr_buy, $Buy, 'buy');
	paintStat( g, sheet, #nvsr_sell, $Sell, 'sell');
	
	// draw the special ability
	specialTextBox.markupText = $SpecialText;
	specialTextBox.draw( g, R('special-text') );
	
	// Add the faction symbol
	if ( $Faction != 'Neutral' ) {
		sheet.paintImage( g, 'fac-sym-bg', 15, 550, 100, 100);
		sheet.paintImage( g, 'fac-sym-' + $Faction, 33, 568, 62, 62);
		sheet.paintImage( g, 'fac-sym-bg-' + $Faction, 370, 710, 280, 280);	
	}
}

function paintStat( g, sheet, stat, value, region) {
	if( value != null ) {
		stat = sprintf( #nvsr_stat_format, value );
	}
	sheet.drawTitle ( g, stat, R(region), NVsR.titleFont, 14, sheet.ALIGN_CENTER );
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
	var value = $('action-' + nametag + '-region');
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