/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"z/sap/com/approvePo/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});
