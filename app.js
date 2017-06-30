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
      inputBtn: ".add__btn",
      incomeContainer: ".income__list",
      expensesContainer: ".expenses__list"
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
    },
    addListItem: function( obj, type ) {
      var html, newHTML, element;
      // 1. Create HTML string with placeholder text

      if ( type === "inc" ) {
        element = DOMstrings.incomeContainer;

        html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
      } else if ( type === "exp" ) {
        element = DOMstrings.expensesContainer;

        html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
      }

      // 2. Replace placeholder text with actual data from the object
      newHTML = html.replace('%id%', obj.id);
      newHTML = newHTML.replace('%description%', obj.description);
      newHTML = newHTML.replace('%value%', obj.value);


      // 3. Insert the HTML into the DOM
      document.querySelector( element ).insertAdjacentHTML( 'beforeend', newHTML );
    },
    clearFields: function() {
      var fields, fieldsArray;

      fields = document.querySelectorAll( DOMstrings.inputDescription + ", " + DOMstrings.inputValue);
      fieldsArray = Array.prototype.slice.call( fields );

      fieldsArray.forEach( function( current, index, array ) {
        current.value = "";
      });

      fieldsArray[0].focus();

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
    UICtrl.addListItem( newItem, input.type );

    // 4. Clear the fields
    UICtrl.clearFields();
    // 5. Calculate the budget

    // 6. Display the budget on the UI


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
