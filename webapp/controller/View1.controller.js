sap.ui.define([
	"ibm/fin/ar/controller/BaseController"
], function(Controller) {
	"use strict";

	return Controller.extend("ibm.fin.ar.controller.View1", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf ibm.fin.ar.view.View1
		 */
		onInit: function() {
			this.oRouter= this.getOwnerComponent().getRouter();
			this.oRouter.attachRoutePatternMatched(this.herculis,this);
		},
		herculis : function(oEvent){
			var selectedIndex = oEvent.getParameter("arguments").myVar;
			var oList = this.getView().byId("myList");
			var itemToBeSelected = oList.getItems()[parseInt(selectedIndex)];
			oList.setSelectedItem(itemToBeSelected);
			
		},
		uCan : function(oEvent){
			debugger;
			var selectedIndex = oEvent.getParameter("arguments").myVal;
			this.getView().bindElement("/bigData/" + selectedIndex);
		},
		onNext : function(myIndex){
			//get the mother object	of this view
			//var oApp = this.getView().getParent();
			//use the mother object to call another view 
			//oApp.to("idView2","flip");
			this.oRouter.navTo("smith",{
				myVar : myIndex
			});
		},
		onSearch :function(oEvent){
			
			
			var valueEnteredByUserOnScreen = oEvent.getParameter("query");
			if(!valueEnteredByUserOnScreen) {
				valueEnteredByUserOnScreen = oEvent.getParameter("newValue");
			}
			//filter object it is used to filter the data from the model
			var oFilter1 = new sap.ui.model.Filter("name",
			sap.ui.model.FilterOperator.Contains,valueEnteredByUserOnScreen);
			var oFilter2 = new sap.ui.model.Filter("prefecture",
			sap.ui.model.FilterOperator.Contains,valueEnteredByUserOnScreen);
			var oFilter = new sap.ui.model.Filter(
				{
					filters:[oFilter1,oFilter2],
					and : false
				});
			var aFilter =[oFilter]; //AND operator by default
			var oList = this.getView().byId("myList");
			oList.getBinding("items").filter(aFilter);
		},
		onDelete : function(oEvent){
			var itemToBeDeleted = oEvent.getParameter("listItem");
			//var oList = this.getView().byId("myList"); dont use id for all if someone changes function
			//will not work, try to work without id
			var oList = oEvent.getSource();
			oList.removeItem(itemToBeDeleted);
		},
		onItemPress : function(oEvent){
			var addressOfSelectedItem = oEvent.getParameter("listItem").getBindingContextPath();
			
			var myIndex = addressOfSelectedItem.split("/")[addressOfSelectedItem.split("/").length-1];
			this.onNext(myIndex);
			//get mother of both brothers
			/*
			var oApp = this.getView().getParent().getParent();
			//get the second child of the mother
			var oView2 = oApp.getDetailPages()[0];
			//bind the address of selected item to whole of view2
			oView2.bindElement(addressOfSelectedItem);*/
			
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf ibm.fin.ar.view.View1
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf ibm.fin.ar.view.View1
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf ibm.fin.ar.view.View1
		 */
		//	onExit: function() {
		//
		//	}

	});

});