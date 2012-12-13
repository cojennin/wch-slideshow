//Handling default inheritance, consult http://underscorejs.org/
//for _.extend functionality

$(function(){

  var backTest = Backbone.Model.extend({
    defaults: {
      name: "Connor"
    }
  });

  

  var printBackTest = new backTest();

  printBackTest.set({new_attr: "New Attribute"})

  console.log(printBackTest.get("new_attr"))
 
})
