sap.ui.define([
        "sap/ui/core/mvc/Controller",
        "z/sap/com/createPo/formatter/Formatter",
        'sap/m/MessageToast'
	],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
	function (Controller,formatter2,MessageToast) {
		"use strict";

		return Controller.extend("z.sap.com.createPo.controller.createPo", {
            formatter: formatter2,
			onInit: function () {

            },
            onCreatePO:function () {

                var result = this.getOwnerComponent().createPO();
                result.then(function () {
					 MessageToast.show("表單建立送審成功");
				}, function (err) {
					 MessageToast.show(err);
				});
                // if(result.status==="S")
                // {
                //     MessageToast.show("表單建立送審成功");
                // }
                // else{
                //     MessageToast.show(result.message);
                // }
            }
		});
	});
