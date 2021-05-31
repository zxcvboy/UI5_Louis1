/*global QUnit*/

sap.ui.define([
	"z/sap/com/approvePo/controller/approve.controller"
], function (Controller) {
	"use strict";

	QUnit.module("approve Controller");

	QUnit.test("I should test the approve controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
