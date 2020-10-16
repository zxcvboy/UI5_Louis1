/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-unused-vars */
// @ts-nocheck
// eslint-disable-next-line no-undef
sap.ui.define(['sap/m/MessageToast'
    ],function(MessageToast) {
	"use strict";
	var OdataModelOperation = {
        readBooks: function(oModel){
            var rtn = {};
                // @ts-ignore
                // eslint-disable-next-line no-undef                
            var sPath = "/Books";
            oModel.read(sPath,{ 
                success: function(odata, response) {
                    MessageToast.show("OdataModel: 書籍資料查詢成功");
                }, 
                error: function(oError) {
                     MessageToast.show("OdataModel: 書籍資料查詢失敗");
                }
            });
            return rtn;
        },
        createBook: function(oModel, entry){
            //entry.ID = entry.title;
            var sPath = "/Books";
            oModel.create(sPath, entry, {
                success: function() {
                    MessageToast.show("OdataModel: 書籍資料建立成功");
                }, 
                error: function() {
                     MessageToast.show("OdataModel: 書籍資料建立失敗");
                }
            });
        }
        ,
        updateBook: function(oModel,sPath, entry){
            //var sPath = "/Books('"+entry.ID+"')";
            oModel.update(sPath, entry, {
                success: function() {
                    MessageToast.show("OdataModel: 書籍資料更新成功");
                }, 
                error: function() {
                     MessageToast.show("OdataModel: 書籍資料更新失敗");
                }
            });
        }
        ,
        deleteBook: function(oModel, sPath){
          
            oModel.remove(sPath, {
                success: function() {
                    MessageToast.show("OdataModel: 書籍資料刪除成功");
                }, 
                error: function() {
                     MessageToast.show("OdataModel: 書籍資料刪除失敗");
                }
            });
        }
	};

	return OdataModelOperation;

}, /* bExport= */ true);
