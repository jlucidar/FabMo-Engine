var G2 = require('./g2').G2
var PLATFORM = require('process').platform
var Engine = require('tingodb')(),
    assert = require('assert');


switch(PLATFORM) {

	case 'linux':
		path = '/dev/ttyACM0';
		break;

	case 'darwin':
		path = '/dev/cu.usbmodem001';
		break;

	default:
		path = null;
		break;
}

if(path) {
	driver = new G2();
	driver.connect(path, function(err, data) {
		console.log('Connected to G2 on ' + path);
	});

	//driver.on('message', function(msg) { console.log('G2_MSG:  ');console.log(msg);});
	driver.on('error', function(msg) { console.log('G2_ERR:  ' + msg) });
	//driver.on('status', function(msg) { console.log('G2_STAT: ');console.log(msg);});
	//driver.on('error', function(msg) {});
} else {
	driver = null;
}

exports.driver = driver;
