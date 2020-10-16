sap.ui.define([
        "sap/ui/core/mvc/Controller",
        "z/sap/com/LouisApp1/model/MyOperation",
        "z/sap/com/LouisApp1/model/OdataModelOperation"
	],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
	function (Controller,myOperation,odataModelOperation) {
		"use strict";

		return Controller.extend("z.sap.com.LouisApp1.controller.Create", {
			onInit: function () {
               
            },
            Create: function(oEvent)
            {
                var myData = 
                {
                    
                    "title": "SAPUI5",
                    "descr": "SAPUI5 training material",
                    "stock": 999,
                    "price": "168",
                    "currency_code": "USD",
                    "author_ID": "cbfec09e-0ff4-4cfc-adf1-0a37500da750",
                    "genre_ID": 3
                };
                // @ts-ignore
                myData = this.getView().getModel("myTestModel3").getData();
                myOperation.CreateOrder(myData);
                 // @ts-ignore
               this.getOwnerComponent().HelloFromComponent();
            },
            onGotoView1: function(oEvent){
                    // @ts-ignore
                 var oRouter = this.getOwnerComponent().getRouter();
                 oRouter.navTo("RouteView1");
                    
             },
            onCreate_oModel: function(oEvent){
                    // @ts-ignore
                var oModel = this.getOwnerComponent().getModel("bookModelv2");
                // @ts-ignore
                var myData = this.getView().getModel("myTestModel3").getData();
                odataModelOperation.createBook(oModel,myData);
                    
             },
            onUpdate_oModel: function(oEvent){
                    // @ts-ignore
                   var oModel = this.getOwnerComponent().getModel("bookModelv2");                 
                    // @ts-ignore
                    var oTable =this.getView().byId("table0");
                   var sPath = oTable.getSelectedContexts()[0].sPath;
                   var myData = oModel.getProperty(sPath);
                   odataModelOperation.updateBook(oModel,sPath,myData);
                    
             },
            onDelete_oModel: function(oEvent){
                // @ts-ignore
                var oModel = this.getOwnerComponent().getModel("bookModelv2");                 
                    // @ts-ignore
                    var oTable =this.getView().byId("table0");
                   var sPath = oTable.getSelectedContexts()[0].sPath;
                   odataModelOperation.deleteBook(oModel,sPath);
                
                    
             },
            onSearch_oModel: function(oEvent){
                
                // @ts-ignore
                 var oTable =this.getView().byId("table0"); 
                // @ts-ignore
                var oModel = this.getOwnerComponent().getModel("bookModelv2");
                  odataModelOperation.readBooks(oModel); 
                
                 oTable.updateBindings();       
             }

		});
	});
