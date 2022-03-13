Funbit.Ets.Telemetry.Dashboard.prototype.initialize = function (skinConfig, utils) {

	//
	// skinConfig - a copy of the skin configuration from config.json
	// utils - an object containing several utility functions (see skin tutorial for more information)
	//
	// this function is called before everything else, 
	// so you may perform any DOM or resource initializations / image preloading here

	utils.preloadImages([
		'images/cabin-icon.png',
		'images/cargo-icon.png',
		'images/chassis-icon.png',
		'images/engine-icon.png',
		'images/gear-icon.png',
		'images/rest-icon.png',
		'images/trailer-icon.png',
		'images/truck-icon.png',
		'images/tyre-icon.png',
	]);
	
	// return to menu by a click
    
	$(document).add('body').on('click', function () {
		window.history.back();
	});
};


Funbit.Ets.Telemetry.Dashboard.prototype.filter = function (data, utils) {
    
	//
	// data - telemetry data JSON object
	// utils - an object containing several utility functions (see skin tutorial for more information)
	//    
	// This filter is used to change telemetry data     
	// before it is displayed on the dashboard.    
	// You may convert km/h to mph, kilograms to tons, etc.  

	data.hasJob = data.trailer.attached && !data.game.paused;
	//data.hasJob = true;

	// wear
	data.trailer.wear = data.trailer.wear.toFixed(2) + ' %';
	data.truck.wearTransmission = data.truck.wearTransmission.toFixed(2) + ' %';
	data.truck.wearCabin = data.truck.wearCabin.toFixed(2) + ' %';
	data.truck.wearChassis = data.truck.wearChassis.toFixed(2) + ' %';
	data.truck.wearEngine = data.truck.wearEngine.toFixed(2) + ' %';
	data.truck.wearWheels = data.truck.wearWheels.toFixed(2) + ' %';

	// return changed data to the core for rendering
	return data;
};


Funbit.Ets.Telemetry.Dashboard.prototype.render = function (data, utils) {
  
	// data - same data object as in the filter function
	// utils - an object containing several utility functions (see skin tutorial for more information)
	//
	// you may use jQuery here to update DOM or CSS

	var inGameTimespan = new Date(data.game.nextRestStopTime);
	var hours = inGameTimespan.getUTCHours() > 0 ? inGameTimespan.getUTCHours() + "h:" : '';
	var minutes = inGameTimespan.getUTCMinutes() > 0 ? inGameTimespan.getUTCMinutes() + "m" : '';

	var absMinutes = (inGameTimespan.getUTCHours() * 60) + inGameTimespan.getUTCMinutes();
	var realTimespan = Math.round(absMinutes / data.game.timeScale);
	var restDiv = document.getElementById('restDiv');
	restDiv.innerHTML = hours + minutes + "<br />(" + realTimespan.toFixed() + "m)";

	// set colors
	var light = '#d7d7d7';
	var yellow = '#fdad01';
	var red = '#FF0000';

	restDiv.style.color = inGameTimespan.getUTCHours() < 2 ? yellow : light;
	if (inGameTimespan.getUTCHours() === 0)	restDiv.style.color = red;
			
	var trailerWearDiv = document.getElementById('trailerWearDiv');
	trailerWearDiv.style.color = data.trailer.wear > 25 ? yellow : light;
	if (data.trailer.wear > 50)	trailerWearDiv.style.color = red;
	
	var trailerWearTransmissionDiv = document.getElementById('trailerWearTransmissionDiv');
	trailerWearTransmissionDiv.style.color = data.truck.wearTransmission > 25 ? yellow : light;
	if (data.truck.wearTransmission > 50) trailerWearTransmissionDiv.style.color = red;

	var trailerWearCabinDiv = document.getElementById('trailerWearCabinDiv');
	trailerWearCabinDiv.style.color = data.truck.wearCabin > 25 ? yellow : light;
	if (data.truck.wearCabin > 50) trailerWearCabinDiv.style.color = red;

	var trailerWearChassisDiv = document.getElementById('trailerWearChassisDiv');
	trailerWearChassisDiv.style.color = data.truck.wearChassis > 25 ? yellow : light;
	if (data.truck.wearChassis > 50) trailerWearChassisDiv.style.color = red;

	var trailerWearEngineDiv = document.getElementById('trailerWearEngineDiv');
	trailerWearEngineDiv.style.color = data.truck.wearEngine > 25 ? yellow : light;
	if (data.truck.wearEngine > 50) trailertrailerWearEngineDivWearDiv.style.color = red;

	var trailerWearWheelsDiv = document.getElementById('trailerWearWheelsDiv');
	trailerWearWheelsDiv.style.color = data.truck.wearWheels > 25 ? yellow : light;
	if (data.truck.wearWheelse > 50) trailerWearWheelsDiv.style.color = red;
};
