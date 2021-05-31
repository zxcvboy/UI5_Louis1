sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
    "z/sap/com/approvePo/model/models",
    "z/sap/com/approvePo/model/ContextModel"
], function (UIComponent, Device, models,ContextModel) {
	"use strict";

	return UIComponent.extend("z.sap.com.approvePo.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
        init: function () {

                    var that = this;
                    
                    // set the device model
                    this.setModel(models.createDeviceModel(), "device");

                    // set application model
                    this.setModel(new sap.ui.model.json.JSONModel(this.appModel), "appModel");

                    // get task instance ID	and read the process context
                    try {
                        var taskId = this._getTaskId();

                        var p = ContextModel.readContext(that, taskId);
                        p.then(function (oContext) {
                            // loading of context data was successfull

                            // TODO Here you can add some initialization if necessary

                            // adding that "data" model. data.ctx contains the context
                            var oStartupParameters = that.getComponentData().startupParameters;
                            var oTaskData = oStartupParameters.taskModel.getData();
                            var oDataModel = new sap.ui.model.json.JSONModel({
                                context: oContext,
                                task: {
                                    description: "",
                                    title: oTaskData.TaskTitle,
                                    priority: oTaskData.Priority,
                                    priorityText: oTaskData.PriorityText,
                                    status: oTaskData.Status,
                                    statusText: oTaskData.StatusText,
                                    createdOn: oTaskData.CreatedOn,
                                    createdBy: oTaskData.CreatedBy
                                }
                            });
 
                               that.getModel("myPoModel").setData(ContextModel.getPO(oContext.PO_NO));

                            
                            // Setting task description
                            oStartupParameters.inboxAPI.getDescription("NA", taskId)
                                .done(function (dataDescr) {
                                    oDataModel.setProperty("/task/description", dataDescr.Description);
                                })
                                .fail(function (errorText) {
                                    that._handleError.call(that, Error(errorText));
                                });
                            //
                            
                            
                            // set the model for binding
                            that.setModel(oDataModel, "data");

                            // add buttons to approve and reject
                            that._addAction("APPROVE", "GENERIC_COMPLETE_TITLE", "Accept", function (button) {
                                that._callbackAction(oDataModel, "APPROVE");
                            });

                            that._addAction("REJECT", "GENERIC_REJECT_TITLE", "Reject", function (button) {
                                that._callbackAction(oDataModel, "REJECT");
                            });
                        
                            
                            // remove busy indicator
                            that.setBusy(false);
                            
                        
                            
                        }, function (err) {
                            that._handleError.call(that, err);
                        });
                    } catch (err) {
                        that._handleError.call(that, err);
                    }
                

                    // call the base component's init function
                    UIComponent.prototype.init.apply(this, arguments);

                    // enable routing
                    this.getRouter().initialize();

                    // set the device model
                    this.setModel(models.createDeviceModel(), "device");
                },
            _callbackAction: function (oDataModel, action) {

			var that = this;
			var _checkAction = false;
			if (action === "APPROVE") {
				_checkAction = that._checkApproveData(oDataModel.getData());
			} else if(action === "REJECT") {
				_checkAction = that._checkRejectData(oDataModel.getData());
			}
			if (_checkAction) {
				var taskId = that.oComponentData.inboxHandle.attachmentHandle.detailModel.getData().InstanceID;
				
				var f = oDataModel.getData();
				var now = new Date();
                f.context.approvalResult = that.getModel("approvalModel").getData();
               f.context.approvalResult.result =action;
				

				var p = ContextModel.triggerComplete(that,taskId, action,f.context);
				p.then(function () {
					that._refreshTask.call(that);
				}, function (err) {
					that._handleError.call(that, err);
				});
			}

		},

		/**
		 * 
		 */
		_handleError: function (err) {
			// to ensure busy indicator is off
			this.setBusy(false);

			// show a message box with the error
			jQuery.sap.require("sap.m.MessageBox");
			sap.m.MessageBox.error(err.toLocaleString(), {
				title: this.getModel("i18n").getResourceBundle().getText("GENERIC_ERROR_TITLE")
			});
		},

		/**
		 *
		 */
		_checkApproveData: function (oData) {
			// TODO check data and return either true or false
			return true;
		},

		/**
		 *
		 */
		_checkRejectData: function (oData) {
			// TODO check data and return either true or false
			return true;
		},

		/**
		 *
		 */
		setBusy: function (isBusy) {
			var oModel = this.getModel("appModel");
			oModel.setProperty("/isBusy", isBusy);
			oModel.refresh();
		},

		/**
		 *
		 */
		_getTaskId: function () {
			var oCompontentData = this.getComponentData();
			if (oCompontentData.startupParameters) {
				var startupParameters = oCompontentData.startupParameters;
				var taskData = startupParameters.taskModel.getData();
				var taskId = taskData.InstanceID;

				return taskId;
			}

			throw Error("no startupParameter available");
		},

		/**
		 *
		 */
		_addAction: function (sName, sButtonText, sButtonType, fnPressed) {
			var oCompontentData = this.getComponentData();
			if (oCompontentData.startupParameters) {
				var startupParameters = this.getComponentData().startupParameters;
				startupParameters.inboxAPI.addAction({
					action: sName,
					label: this.getModel("i18n").getResourceBundle().getText(sButtonText),
					type: sButtonType
				}, fnPressed, this);
			}
		},

		/**
		 *
		 */
		_refreshTask: function () {
			this.getComponentData().startupParameters.inboxAPI.updateTask("NA", this._getTaskId());
		}
	});
});
