sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
    "z/sap/com/LouisApp1/model/models",
    "z/sap/com/LouisApp1/model/MyOperation"
], function (UIComponent, Device, models,myOperation) {
	"use strict";

	return UIComponent.extend("z.sap.com.LouisApp1.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function () {
            console.log("Louis: Component Init");
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);
            
			// enable routing
			this.getRouter().initialize();

			// set the device model
            this.setModel(models.createDeviceModel(), "device");
            
            
            var myJsonModel = new sap.ui.model.json.JSONModel();
            var myJsonModel2 = new sap.ui.model.json.JSONModel("model/myData.json"); 
            var myData = 
                {
                    "Name":"Louis",
                    "Company": "SAP",
                    "Email":"louis.huang@sap.com",
                    "Title":"Consultant",
                    "Department": "DBS"
                };
            myJsonModel.setData(myData);
            this.setModel(myJsonModel,"myTestModel");
             this.setModel(myJsonModel2,"myTestModel2");

             /* Create the model */
                var oModel = new sap.ui.model.json.JSONModel();
                /* Assign the model to the view */
               
                /* Load the data */
                oModel.loadData("/services/userapi/currentUser");
                /* Add a completion handler to log the json and any errors*/
                oModel.attachRequestCompleted(function onCompleted(oEvent) {
                    if (oEvent.getParameter("success")) {
                            this.setData({"json" : this.getJSON(), "status": "Success"}, true);
                    } else {
                    var msg = oEvent.getParameter("errorObject").textStatus;
                    if (msg) {
                            this.setData("status", msg);
                    } else {
                            this.setData("status", "Unknown error retrieving user info");
                    }
                    }
                });
             /* End model creation and loading*/
        },
        HelloFromComponent:function()
        {
            //window.alert("HelloFromComponent");
           var a = myOperation.getBookList();
            this.getModel("myListModel").setData(a.d.results);
            var c = myOperation.getPO();
        }
	});
});
