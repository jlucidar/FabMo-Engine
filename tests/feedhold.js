var machine = require('../machine')

machine.driver.on('connect', function(err, data) {

	// Print any state changes
	machine.driver.on('state', function(data) {
		console.log(data);
		console.log(machine.driver.status);
	});

	// Return to zero
	machine.driver.gcode('G0X0');

	// Kick off a long move, but stop it
	setTimeout(function() {
		machine.driver.runString('G0X16');
		setTimeout(function() {
			machine.driver.feedHold();
			setTimeout(function() {
				machine.driver.resume();
			},3000) // Time to dwell before resuming after stop
		}, 1000); // Time to move before stopping
	}, 10000); // Time to return to zero
});
