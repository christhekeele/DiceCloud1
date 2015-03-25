Template.featureDialog.events({
	"color-change": function(event, instance){
		Features.update(instance.data.featureId, {$set: {color: event.color}});
	},
	"tap #deleteButton": function(event, instance){
		Features.softRemove(instance.data.featureId);
		GlobalUI.deletedToast(instance.data.featureId, "Features", "Feature");
		GlobalUI.closeDetail();
	},
	"change #featureNameInput": function(event){
		var name = Template.instance().find("#featureNameInput").value;
		Features.update(this._id, {$set: {name: name}});
	},
	"change #featureDescriptionInput": function(event){
		var description = Template.instance().find("#featureDescriptionInput").value;
		Features.update(this._id, {$set: {description: description}});
	},
	"change #limitUseCheck": function(event){
		var currentUses = this.uses;
		var featureId = this._id;
		if( event.target.checked && !_.isString(currentUses) ){
			Features.update(featureId, {$set: {uses: ""}}, {removeEmptyStrings: false});
		} else if (!event.target.checked && _.isString(currentUses)){
			Features.update(featureId, {$unset: {uses: ""}});
		}
	},
	"change #usesInput, input #quantityInput": function(event){
		var value = event.target.value;
		var featureId = this._id;
		Features.update(featureId, {$set: {uses: value}});
	},
	"core-select #enabledDropdown": function(event){
		var detail = event.originalEvent.detail;
		if(!detail.isSelected) return;
		var value = detail.item.getAttribute("name");
		var setter;
		if(value === "enabled"){
			setter = {enabled: true, alwaysEnabled: false};
		} else if (value === "disabled"){
			setter = {enabled: false, alwaysEnabled: false};
		} else{
			setter = {enabled: true, alwaysEnabled: true};
		}
		if (setter.enabled === this.enabled && setter.alwaysEnabled === this.alwaysEnabled) return;
		Features.update(this._id, {$set: setter});
	},
});

Template.featureDialog.helpers({
	feature: function(){
		return Features.findOne(this.featureId);
	},
	usesSet: function(){
		return _.isString(this.uses);
	},
	isEnabled: function(){
		return this.enabled !== "disabled";
	}
});