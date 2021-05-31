/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-unused-vars */
// @ts-nocheck
// eslint-disable-next-line no-undef
sap.ui.define(['sap/m/MessageToast'
], function (MessageToast) {
    "use strict";
    var MyOperation = {
        getPO: function (FORM_NO) {
            var rtn = {};
            // @ts-ignore
            // eslint-disable-next-line no-undef
            jQuery.ajax({
                type: "get",
                async: false,
                contentType: "application/json",
                url: jQuery.sap.getModulePath("z.sap.com.LouisApp1") + "/PO_SERVICE/rest/PO/getPO_Form?FORM_NO=" + FORM_NO,
                dataType: "json",
                cache: false, //預設設定true 不過browser要清cache才可以測
                // @ts-ignore           
                success: function (data, textStatus, jqXHR) { rtn = data; }
            });
            return rtn;
        },
        CreatePO: function (zOrder) {
            var rtn = {};
            // @ts-ignore
            // eslint-disable-next-line no-undef                
            jQuery.ajax({
                type: 'POST',
                url: jQuery.sap.getModulePath("z.sap.com.createPo") + "/PO_SERVICE/rest/PO/createPO_Form",
                contentType: "application/json",
                data: JSON.stringify(zOrder),
                dataType: "json",
                async: false,
                cache: false,
                success: function (data, textStatus, jqXHR) {
                    rtn = data;
                },
                error: function (data, textStatus, jqXHR) {
                }

            });
            return rtn;
        },
        StartWorkflow: function (zOrder) {
            // @ts-ignore
            var promise = new Promise(function (resolve, reject) 
            {
                var rtn = { "status": "", "message": "" };
                var mydata = JSON.stringify({
                    "definitionId": "po_approval",
                    "context": {
                        "PO_NO": zOrder.PO_HEADER.PO_NO,
                        "FORM_TYPE": "PO"
                    }
                });

                $.ajax({
                    //url: "/bpmworkflowruntime/rest/v1/xsrf-token",

                    url: jQuery.sap.getModulePath("z.sap.com.createPo") + "/bpmworkflowruntime/v1/xsrf-token",
                    method: "GET",
                    headers: {
                        "X-CSRF-Token": "Fetch"
                    },
                    success: function (result, xhr, data) 
                    {
                        var token = data.getResponseHeader("X-CSRF-Token");

                        // after receiving the token, call the task completion REST API
                        jQuery.ajax({
                            type: "post",
                            async: false,
                            data: mydata,
                            headers: {
                                "X-CSRF-Token": token
                            },
                            contentType: "application/json",
                            url: jQuery.sap.getModulePath("z.sap.com.createPo") + "/bpmworkflowruntime/v1/workflow-instances",
                            dataType: "json",
                            cache: false, //預設設定true 不過browser要清cache才可以測     
                            // @ts-ignore
                            success: function (data, textStatus, jqXHR) {

                                // @ts-ignore
                                rtn.status = "S";
                                rtn.message = JSON.stringify(data);
                                // MessageToast.show(JSON.stringify(data));
                                resolve(rtn);
                            },
                            error: function (result) {
                                //MessageToast.show("error");
                                rtn.status = "E";
                                rtn.message = JSON.stringify(result);
                                reject(Error(rtn));
                            }

                        });

                    },
                    error: function (xhr, textStatus, errorText) {
                        reject(Error(errorText));
                    }
                });
            });
                return promise;
        }
    };

    return MyOperation;

}, /* bExport= */ true);
