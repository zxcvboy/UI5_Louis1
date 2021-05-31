/*global QUnit*/

sap.ui.define([
	"z/sap/com/createPo/controller/createPo.controller"
], function (Controller) {
	"use strict";

	QUnit.module("createPo Controller");

	QUnit.test("I should test the createPo controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
