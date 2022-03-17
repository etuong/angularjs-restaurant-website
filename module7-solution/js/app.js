(function () {
  'use strict';

  angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService)
    .filter('customCurrency', customCurrencyFilter);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var toBuyList = this;
    toBuyList.items = ShoppingListCheckOffService.items;

    toBuyList.addToCart = function (index) {
      if (Number.isInteger(index)) {
        ShoppingListCheckOffService.addToCart(index);
      }
    }

    toBuyList.isEmpty = () => toBuyList?.items?.length < 1
  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var cart = this;

    cart.items = ShoppingListCheckOffService.cart;

    cart.isEmpty = () => cart.items.length < 1;

  }

  function ShoppingListCheckOffService() {
    // List of prepopulated items to buy
    this.items = [
      { name: "Cookies", quantity: 10, pricePerItem: 1 },
      { name: "Chocolate", quantity: 8, pricePerItem: 3 },
      { name: "Chips", quantity: 20, pricePerItem: 1.5 },
      { name: "Milk", quantity: 2, pricePerItem: 2.5 },
      { name: "Oatmeal", quantity: 12, pricePerItem: 10 },
      { name: "Chicken", quantity: 5, pricePerItem: 3.4 },
      { name: "Popcorn", quantity: 8, pricePerItem: 2 },
      { name: "Pudding", quantity: 20, pricePerItem: 5.5 },
      { name: "Bread", quantity: 1, pricePerItem: 3.9 },
      { name: "Cake", quantity: 5, pricePerItem: 7 }
    ];

    this.cart = [];

    this.addToCart = index => {
      // Get the item and check validity of quantity before pushing to cart
      var item = this.items[index];
      var quantity = item.quantity;
      if (Number.isInteger(quantity) && quantity > 0) {
        this.cart.push(this.items.splice(index, 1)[0]);
      }
    }
  }

  function customCurrencyFilter() {
    return val => '$$$' + val.toFixed(2);
  }
})();