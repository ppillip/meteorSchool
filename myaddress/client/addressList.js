/*
* addressList 템플릿 매니저들 구현
* */

Template.addressList.helpers({
    list : function(){
        return AddressBook.find({},{limit:3,sort:{name:1}});
    }
});

Template.addressList.events({

});


/*
 * addressListItem 템플릿 매니저들 구현
 * */

Template.addressListItem.helpers({

});

Template.addressListItem.events({
    "click button[name=remove]" : function(evt,tmpl){
        AddressBook.remove({_id:this._id});
    }
});