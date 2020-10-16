sap.ui.define([
        "sap/ui/core/mvc/Controller",
        "z/sap/com/LouisApp1/model/MyOperation"
	],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
	function (Controller,myOperation) {
		"use strict";

		return Controller.extend("z.sap.com.LouisApp1.controller.View1", {
			onInit: function () {
                console.log("Louis: onInit");
            },
            onAfterRendering: function () {
		        console.log("Louis: onAfterRendering");
            },
            clickHello: function(oEvent)
            {
                /*
                // @ts-ignore
                var name = this.byId("input0").getValue();
                // @ts-ignore
                var name2 = this.getOwnerComponent().myName;
                window.alert("Hello: "+name +", "+name2);
                */
                var myData = 
                {
                    
                    "title": "SAPUI5",
                    "descr": "SAPUI5 training material",
                    "stock": 999,
                    "price": "168",
                    "currency_code": "USD",
                    author_ID: "cbfec09e-0ff4-4cfc-adf1-0a37500da750",
                    genre_ID: 3,
                };
                myOperation.CreateOrder(myData);
            },
            clickHelloFromComponent: function(oEvent)
            {
               
                // @ts-ignore
              this.getOwnerComponent().HelloFromComponent();
           
            },
            selectCustomer: function(oEvent)
            {
               // @ts-ignor
               var index = oEvent.getSource().getParent().indexOfItem(oEvent.getSource());
               // @ts-ignore
               var c =this.byId("form1");
               var sPath = "myListModel>/"+index;
               c.bindElement(sPath);
           
            }
            ,
             onGotoCreate: function(oEvent){
                    // @ts-ignore
                 var oRouter = this.getOwnerComponent().getRouter();
                 oRouter.navTo("RouteCreate");
                    
             },
             deleteBook: function(oEvent)
            {
                // @ts-ignore
                var oModel = this.getOwnerComponent().getModel("myListModel");                 
                    // @ts-ignore
                    var oTable =this.getView().byId("table0");
                   var sPath = oTable.getSelectedContexts()[0].sPath;
                   myOperation.DeleteOrder(oModel.getProperty(oTable.getSelectedContexts()[0].sPath));
                   // @ts-ignore
                   this.getOwnerComponent().HelloFromComponent();
                   //odataModelOperation.deleteBook(oModel,sPath);
           
            }
		});
	});
