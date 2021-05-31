// @ts-nocheck
sap.ui.define([
    "sap/ui/model/json/JSONModel"
], function (JSONModel) {
    "use strict";
    /* globals Promise */

    return {

		/**
		 * Reads the process context from REST API
		 */
        readContext: function (oComponent, taskId) {
            // set the UI to busy
            oComponent.setBusy(true);
            var taskInstancesBaseURL = this._getTaskInstancesBaseURL(oComponent, taskId);
            var promise = new Promise(function (resolve, reject) {
                $.ajax({
                    //url: "/bpmworkflowruntime/rest/v1/task-instances/" + taskId + "/context",
                    
                    url: taskInstancesBaseURL+"/context",
                    method: "GET",
                    contentType: "application/json",
                    dataType: "json",
                    success: function (result, xhr, data) {
                        // resolve with the process context as result
                        resolve(data.responseJSON);
                    },
                    error: function (xhr, textStatus, errorText) {
                        reject(Error(errorText));
                    }
                });
            });

            // the method returns a promise!
            return promise;
        },
		/**
		 * Reads the process context from REST API
		 */
        readAttributes: function (oComponent, taskId) {
            // set the UI to busy
            oComponent.setBusy(true);
             var taskInstancesBaseURL = this._getTaskInstancesBaseURL(oComponent, taskId);
            var promise = new Promise(function (resolve, reject) {
                $.ajax({
                    //url: "/bpmworkflowruntime/rest/v1/task-instances/" + taskId + "/attributes",
                      url: taskInstancesBaseURL+"/attributes",
                    method: "GET",
                    contentType: "application/json",
                    dataType: "json",
                    success: function (result, xhr, data) {
                        // resolve with the process context as result
                        resolve(data.responseJSON);
                    },
                    error: function (xhr, textStatus, errorText) {
                        reject(Error(errorText));
                    }
                });
            });

            // the method returns a promise!
            return promise;
        },
		/**
		 * Triggers the completion of the task via REST API
		 */
        triggerComplete: function (oComponent,taskId, stage, oContext) {
            var workflowRuntimeBaseURL= this._getWorkflowRuntimeBaseURL(oComponent);
             var taskInstancesBaseURL = this._getTaskInstancesBaseURL(oComponent, taskId);
            var promise = new Promise(function (resolve, reject) {
                $.ajax({
                    //url: "/bpmworkflowruntime/rest/v1/xsrf-token",
                    url: workflowRuntimeBaseURL+"/xsrf-token",
                    method: "GET",
                    headers: {
                        "X-CSRF-Token": "Fetch"
                    },
                    success: function (result, xhr, data) {
                        var token = data.getResponseHeader("X-CSRF-Token");

                        // after receiving the token, call the task completion REST API
                        $.ajax({
                            //url: "/bpmworkflowruntime/rest/v1/task-instances/" + taskId,
                            url: taskInstancesBaseURL,
                            method: "PATCH",
                            contentType: "application/json",
                            data: "{\"status\":\"COMPLETED\",\"stage\":\"" + stage + "\",\"context\":" + JSON.stringify(oContext) + "}",
                            headers: {
                                "X-CSRF-Token": token
                            },
                            success: function (result, xhr, data) {
                                resolve(data);
                            },
                            error: function (xhr, textStatus, errorText) {
                                reject(Error(errorText));
                            }
                        });
                    },
                    error: function (xhr, textStatus, errorText) {
                        reject(Error(errorText));
                    }
                });
            });

            return promise;
        },
        _getTaskInstancesBaseURL: function (myComp,taskId) {
            return this._getWorkflowRuntimeBaseURL(myComp) + "/task-instances/" + taskId;
            //return _getWorkflowRuntimeBaseURL();
        },


        _getWorkflowRuntimeBaseURL: function (myComp) {
            var appId = myComp.getManifestEntry("/sap.app/id");
            var appPath = appId.replaceAll(".", "/");
            var appModulePath = jQuery.sap.getModulePath(appPath);

            return appModulePath + "/bpmworkflowruntime/v1";
        },
        getPO: function(FORM_NO){
			var rtn={};		
                // @ts-ignore
                // eslint-disable-next-line no-undef
                jQuery.ajax({
                    type: "get",
                    async: false,
                    contentType : "application/json",
                    url : jQuery.sap.getModulePath("z.sap.com.approvePo")+"/PO_SERVICE/rest/PO/getPO_Form?FORM_NO="+FORM_NO,
                    dataType : "json",
                    cache: false, //預設設定true 不過browser要清cache才可以測
                    // @ts-ignore           
                    success : function(data,textStatus, jqXHR) 
                    {rtn=data;}
                });
                return rtn;
        }
    };
});