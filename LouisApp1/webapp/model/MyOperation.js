/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-unused-vars */
// @ts-nocheck
// eslint-disable-next-line no-undef
sap.ui.define(['sap/m/MessageToast'
    ],function(MessageToast) {
	"use strict";
	var MyOperation = {
        getPO: function(){
			var rtn={};		
                // @ts-ignore
                // eslint-disable-next-line no-undef
                jQuery.ajax({
                    type: "get",
                    async: false,
                    contentType : "application/json",
                    url : jQuery.sap.getModulePath("z.sap.com.LouisApp1")+"/PO_SERVICE/rest/PO/getPO_Form?FORM_NO=00000005",
                    dataType : "json",
                    cache: false, //預設設定true 不過browser要清cache才可以測
                    // @ts-ignore           
                    success : function(data,textStatus, jqXHR) 
                    {rtn=data;}
                });
                return rtn;
        },
		getBookList: function(){
			var rtn={};		
                // @ts-ignore
                // eslint-disable-next-line no-undef
                jQuery.ajax({
                    type: "get",
                    async: false,
                    contentType : "application/json",
                    url : jQuery.sap.getModulePath("z.sap.com.LouisApp1")+"/OData_bookstore/v2/odata/v4/BooksService/Books?$expand=author",
                    dataType : "json",
                    cache: false, //預設設定true 不過browser要清cache才可以測
                    // @ts-ignore           
                    success : function(data,textStatus, jqXHR) 
                    {rtn=data;}
                });
                return rtn;
        },
        CreateOrder: function(zOrder){
            var rtn = {};
                // @ts-ignore
                // eslint-disable-next-line no-undef                
            jQuery.ajax({
            type: 'POST',
            url: jQuery.sap.getModulePath("z.sap.com.LouisApp1")+"/OData_bookstore/v2/odata/v4/BooksService/Books",
            contentType: "application/json",
            data: JSON.stringify(zOrder),
            dataType: "json",
            async: false,
	        cache: false,
            success: function (result){
                    rtn = result;
                      MessageToast.show("書籍資料建立成功");
                },
            error: function (result) {	
            }

        }); 
            return rtn;
        },
        DeleteOrder: function(zOrder){
            var rtn = {};
                // @ts-ignore
                // eslint-disable-next-line no-undef                
            jQuery.ajax({
            type: 'DELETE',
            url: jQuery.sap.getModulePath("z.sap.com.LouisApp1")+"/OData_bookstore/v2/odata/v4/BooksService/Books("+zOrder.ID+")",
            contentType: "application/json",
            data: JSON.stringify(zOrder),
            dataType: "json",
            async: false,
	        cache: false,
            success: function (result){
                    rtn = result;
                      MessageToast.show("書籍資料刪除成功");
                },
            error: function (result) {	
            }

        }); 
            return rtn;
        }
	};

	return MyOperation;

}, /* bExport= */ true);
