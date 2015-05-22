Meteor.publish("AddressBookData" , function(count,b){

    console.log(b);
/*
    var userId = this.userId;

    if(userId){
*/
        return AddressBook.find({},{limit:count , sort : {name : 1} });
/*
    }
*/

});