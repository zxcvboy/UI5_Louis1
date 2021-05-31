sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
    "z/sap/com/createPo/model/models",
    "z/sap/com/createPo/model/MyOperation"
], function (UIComponent, Device, models, myOperation) {
	"use strict";

	return UIComponent.extend("z.sap.com.createPo.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function () {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// enable routing
			this.getRouter().initialize();

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
        },
        createPO: function ()
        {
            var poDate = this.getModel("myPoModel").getData();
            for(var i=0;i<poDate.PO_ITEMS.length;i++)
            {
                poDate.PO_ITEMS[i].PO_NO = poDate.PO_HEADER.PO_NO;
            }
            var result = myOperation.CreatePO(poDate);
            
            if(result.status==="S")
            {
               result = myOperation.StartWorkflow(poDate);
            }
            return result;
        }
       
	});
});
