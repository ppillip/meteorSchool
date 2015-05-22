/*
* addressList 템플릿 매니저들 구현
* */

Template.addressList.helpers({
    list : function(){
        return AddressBook.find({},{sort:{name:1}});
    }
});

Template.addressList.events({

});

Template.addressList.onCreated(function(){

    Session.set("cnt",30);

    var self = this;

    var 산책  = function(){
        self.subscribe("AddressBookData",Session.get("cnt"),"hi");
    };


    self.autorun(산책);

    $(window).scroll(function () {
        var scrollHeight = $(window).scrollTop() + $(window).height();
        var documentHeight = $(document).height();

        if (scrollHeight + 200 >= documentHeight) {

            Session.set("cnt" , Session.get("cnt") + 30);

        }
    });




});


/*
 * addressListItem 템플릿 매니저들 구현
 * */

Template.addressListItem.helpers({

});

Template.addressListItem.events({
    "click button[name=remove]" : function(evt,tmpl){
        AddressBook.remove({_id:this._id});
    },
    'click button[name=modify]' : function(evt,tmpl){
        Session.set("editItem",this._id);
    },
    'click button[name=cancel]' : function(evt,tmpl){
        Session.set("editItem",null);
    },

    'click .edit-thing' : function(evt,tmpl){
        Session.set("editItem",this._id);
    }


});

Template.addressListItem.helpers({
    editing : function(){
        return this._id == Session.get("editItem");
}});

Template.addressListItem.onCreated(function(){

});


/*
* addressInput 템플릿 매니저들 구현
* */
Template.addressInput.helpers({

});

Template.addressInput.events({
    "click button[name=saveAddress]" : function(evt,tmpl){
        var address = {
            name: tmpl.find("input[name=name]").value
            , phone: tmpl.find("input[name=phone]").value
            , email: tmpl.find("input[name=email]").value
            , company: tmpl.find("input[name=company]").value
            , birthday: tmpl.find("input[name=birthday]").value
        };


        try {

            check(address.name , NotEmptyString);
            check(address.email , EmailString);
            check(address.phone, PhoneString);
            check(address.company , NotEmptyString);
            check(address.birthday , BirthDayString);

        }catch(err){
            alert("입력값을 확인하세요  : [" + err.message + "]");
            return ;
        }





        AddressBook.insert(address);

        tmpl.find("input[name=name]").value = "";
        tmpl.find("input[name=phone]").value = "";
        tmpl.find("input[name=email]").value = "";
        tmpl.find("input[name=company]").value = "";
        tmpl.find("input[name=birthday]").value = "";

    }
});
















