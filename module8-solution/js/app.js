(function () {
  'use strict';
  angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .constant('menu_items_url', 'https://davids-restaurant.herokuapp.com/menu_items.json')
    .directive('foundItems', FoundItemsDirective);

  function FoundItemsDirective() {
    return {
      scope: {
        found: '<',
        onRemove: '&'
      },
      bindToController: true,
      templateUrl: 'itemTemplate.html',
      controller: NarrowItDownController,
      controllerAs: 'menu_items'
    };
  }

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    this.found = [];
    console.log(this.searchTerm)
    this.search = (searchTerm) => {
      MenuSearchService.getMatchedMenuItems(searchTerm)
        .then(response => { this.found = response; console.log(response); })
        .catch(error => console.log(error));
    };
    this.removeItem = (index) => {
      this.found.splice(index, 1);
    }
  }

  MenuSearchService.$inject = ['menu_items_url', '$http'];
  function MenuSearchService(menu_items_url, $http) {
    this.getMatchedMenuItems = (searchTerm) => {
      var config = {
        method: "GET",
        url: menu_items_url
      };
      return $http(config)
        .then(result => {
          let foundItems = [];
          for (let item of result.data.menu_items) {
            if (item.description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
              foundItems.push(item);
            }
          }
          return foundItems;
        })
        .catch(error => console.log(error));
    };
  }
})();