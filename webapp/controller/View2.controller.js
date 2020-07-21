sap.ui.define([
	"ibm/fin/ar/controller/BaseController",
	"sap/m/MessageBox",
	"sap/m/MessageToast"
], function(Controller, MessageBox, MessageToast) {
	"use strict";

	return Controller.extend("ibm.fin.ar.controller.View2", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf ibm.fin.ar.view.View2
		 */
		onInit: function() {
			var oRouter = this.getOwnerComponent().getRouter();
			//whenever the route changes, browser back-forth, manually, select an item
			oRouter.attachRoutePatternMatched(this.herculis,this);
		},
		herculis : function(oEvent){
			var selectedIndex = oEvent.getParameter("arguments").myVar;
			this.getView().bindElement("/bigData/" + selectedIndex); 
		},		
			onBack: function() {
			//get the mother object of this view
			var oApp = this.getView().getParent();
			//use the mother object to call the View1
			oApp.to("idView1", "flip");
		},
		onReset: function (oEvent) {
			var sMessage = "onReset trigered";
			MessageToast.show(sMessage);
		},

		onSearch: function (oEvent) {
			var sMessage = "onSearch trigered";
			MessageToast.show(sMessage);
		},
		spartan: function(choice) {
			var sOrderId = "5947488";
			if (choice === "OK") {
				var sMsgText =
					this.getView().getModel("i18n").getResourceBundle().getText("XMSG_CONFORM", sOrderId);
				MessageToast.show(sMsgText, {
					duration: 10000
				});
			} else {
				/*var oMsgText=
				this.getView().getModel("i18n").getResourceBundle().getText("XMSG_ERROR",sOrderId);
				MessageToast.show(oMsgText);*/
				MessageBox.error("save terminated");
			}
		},
		onSave: function() {
			var sMsg = this.getView().getModel("i18n").getResourceBundle().getText("XMSG_SAVE");
			MessageBox.confirm(sMsg, {
				title: "Confirmation",
				onClose: this.spartan.bind(this)

			});
		},
		onCancel:function(){
			var sMsg = this.getView().getModel("i18n").getResourceBundle().getText("XMSG_CANCEL");
			MessageBox.confirm(sMsg, {
				title: "Confirmation"

			});
		},
		onTest: function() {
			this.someBaseMethod();
		},
		fieldId: "",
		cityPopup: null,
		agencyPopup: null,
		onSupplierPopup: function(oEvent) {
			if (this.agencyPopup === null) {
				this.agencyPopup = new sap.ui.xmlfragment("ibm.fin.ar.fragments.popup", this);
				this.agencyPopup.bindAggregation("items", {
					path: '/agency',
					template: new sap.m.DisplayListItem({
						label: "{name}",
						value: "{city}"	
					})
				});
				//making the  guest as friend  to give access of resources like model
				this.getView().addDependent(this.agencyPopup);
				this.agencyPopup.setTitle("Supplier Data");
			}
			this.agencyPopup.open();
		},
		onF4Help: function(oEvent) {
			//Step 1 : know the id of the input field
			this.fieldId = oEvent.getSource().getId();
			if (this.cityPopup === null) {
				this.cityPopup = new sap.ui.xmlfragment("ibm.fin.ar.fragments.popup", this);
				var oSorter = new sap.ui.model.Sorter('name');
				this.cityPopup.bindAggregation("items", {
					path: "/cities",
					sorter: oSorter,
					template: new sap.m.DisplayListItem({
						label: "{name}",
						value: "{calledFor}"
					})
				});
				//making the  guest as friend  to give access of resources like model
				this.getView().addDependent(this.cityPopup);
				this.cityPopup.setTitle("Cities");
			}

			this.cityPopup.open();

		},
		onConfirm: function(oEvent) {
			//step 1: we read the event parameter which gives object of selected item
			var selectedItem = oEvent.getParameter("selectedItem");
			//step 2: read the label from the item selected as city name was supplied in label
			var myVal = selectedItem.getLabel();
			//set the value to the input field on which F4 is pressed
			sap.ui.getCore().byId(this.fieldId).setValue(myVal);
		},
		onPopup: function(oEvent) {
				var query = oEvent.getParameter("value");
				//filter object it is used to filter the data from the model
				var oFilter = new sap.ui.model.Filter('name',
					sap.ui.model.FilterOperator.Contains, query);
				var oPopup = oEvent.getSource();
				oPopup.getBinding("items").filter([oFilter]);

			},
			
		handleLinkPress: function (oEvent) {
			debugger;
			MessageBox.alert("Link was clicked!");
		}
			/**
			 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
			 * (NOT before the first rendering! onInit() is used for that one!).
			 * @memberOf ibm.fin.ar.view.View2
			 */
			//	onBeforeRendering: function() {
			//
			//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf ibm.fin.ar.view.View2
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf ibm.fin.ar.view.View2
		 */
		//	onExit: function() {
		//
		//	}

	});

});