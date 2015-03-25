Template.containerDialog.helpers({
	container: function(){
		return Containers.findOne(this.containerId);
	}
});

Template.containerDialog.events({
	"color-change": function(event, instance){
		Containers.update(instance.data.containerId, {$set: {color: event.color}});
	},
	"tap #deleteButton": function(event, instance){
		Containers.softRemove(instance.data.containerId);
		GlobalUI.deletedToast(instance.data.containerId, "Containers", "Container and contents");
		GlobalUI.closeDetail()
	},
	//TODO validate input (integer, non-negative, etc) for these inputs and give validation errors
	"change #containerNameInput, input #containerNameInput": function(event){
		console.log("changed Nameinput")
		var name = Template.instance().find("#containerNameInput").value;
		Containers.update(this._id, {$set: {name: name}});
	},
	"change #weightInput, input #weightInput": function(event){
		var weight = +Template.instance().find("#weightInput").value;
		Containers.update(this._id, {$set: {weight: weight}});
	},
	"change #valueInput, input #valueInput": function(event){
		var value = +Template.instance().find("#valueInput").value;
		Containers.update(this._id, {$set: {value: value}});
	},
	"change #containerDescriptionInput": function(event){
		var description = Template.instance().find("#containerDescriptionInput").value;
		Containers.update(this._id, {$set: {description: description}});
	}
});
