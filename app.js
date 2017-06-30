////////////////////////////////////////////////////////////
var budgetController = ( function() {
  var Expense = function( id, description, value ) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var Income = function( id, description, value ) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    }
  };

  return {
    addItem: function( type, des, val ) {
      var newItem, id;

      // Create new id
      data.allItems[ type ].length > 0 ? id = data.allItems[ type ][ data.allItems[ type ].length - 1 ].id + 1 : id = 0;

      // Create new item based on 'exp' or 'inc' type
      if ( type === "exp" ) {
        newItem = new Expense( id, des, val );
      } else if ( type === "inc" ) {
        newItem = new Income( id, des, val );
      };

      // Push new item into our data structure
      data.allItems[type].push(newItem);

      // Return the new item
      return newItem;
    },
    testing: function() {
      console.log( data );
    }
  }


})();
////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////
var UIController = ( function() {
  var DOMstrings = {
      inputType: ".add__type",
      inputDescription: ".add__description",
      inputValue: ".add__value",
      inputBtn: ".add__btn"
  };

  return  {
    getInput: function() {
      return {
        type: document.querySelector( DOMstrings.inputType ).value, // will be either inc or exp
        description: document.querySelector( DOMstrings.inputDescription ).value,
        value: document.querySelector( DOMstrings.inputValue ).value
      };
    },
    getDOMStrings: function() {
      return DOMstrings;
    }
  };
})();
////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////
var controller = ( function( budgetCtrl, UICtrl ) {
  var setupEventListeners = function() {
    var DOM = UICtrl.getDOMStrings();

    document.querySelector( DOM.inputBtn ).addEventListener( "click", ctrlAddItem );

    document.addEventListener( "keypress", function( event ) {
      if ( event.keycode === 13 || event.which === 13 ) {
        ctrlAddItem();
      }
    });
  };


  var ctrlAddItem = function() {
    var input, newItem;

    // 1. Get the field input data
    input = UICtrl.getInput();
    // 2. Add the item to the budget controller
    newItem = budgetCtrl.addItem( input.type, input.description, input.value );

    // 3. Add the item to the UI

    // 4. Calculate the budget

    // 5. Display the budget on the UI


  };

  return {
    init: function() {
      console.log("APP IS RUNNING");
      setupEventListeners();
    }
  };
})( budgetController, UIController );

controller.init();

////////////////////////////////////////////////////////////
