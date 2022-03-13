Funbit.Ets.Telemetry.Dashboard.prototype.initialize = function (skinConfig, utils) {

	//
	// skinConfig - a copy of the skin configuration from config.json
	// utils - an object containing several utility functions (see skin tutorial for more information)
	//
	// this function is called before everything else, 
	// so you may perform any DOM or resource initializations / image preloading here

	utils.preloadImages([
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

	// trailer
	data.trailer.mass = (data.trailer.mass / 1000.0).toFixed(2) + 't';
	data.trailer.name = data.trailer.name + ' (' + data.trailer.mass + ')';

	// navigation
	data.navigation.estimatedDistance = (data.navigation.estimatedDistance / 1000.0).toFixed(1) + 'km';

	// job
	data.job.income = data.job.income + '€';
	data.job.sourceCity = data.job.sourceCity + ' / ' + data.job.sourceCompany;
	data.job.destinationCity = data.job.destinationCity + ' / ' + data.job.destinationCompany;

	// return changed data to the core for rendering
	return data;
};


Funbit.Ets.Telemetry.Dashboard.prototype.render = function (data, utils) {
  
	// data - same data object as in the filter function
	// utils - an object containing several utility functions (see skin tutorial for more information)
	//
	// you may use jQuery here to update DOM or CSS

	var el1 = document.getElementById('remainingTimeDiv');
	el1.style.color = data.job.remainingTime === 'Overdue' ? '#FF0000' : '#d7d7d7';

	var inGameTimespan = new Date(data.navigation.estimatedTime);
	var days = inGameTimespan.getUTCDate() - 1 > 0 ? inGameTimespan.getUTCDate() - 1 + "d:" : '';
	var hours = inGameTimespan.getUTCHours() > 0 ? inGameTimespan.getUTCHours() + "h:" : '';
	var minutes = inGameTimespan.getUTCMinutes() > 0 ? inGameTimespan.getUTCMinutes() + "m" : '';

	var absMinutes = ((inGameTimespan.getUTCDate() - 1) * 24 * 60) + (inGameTimespan.getUTCHours() * 60) + inGameTimespan.getUTCMinutes();
	var realTimespan = Math.round(absMinutes / data.game.timeScale);
	var el2 = document.getElementById('etaDiv');
	el2.innerHTML = days + hours + minutes + "(" + realTimespan.toFixed() + "m)";
};
