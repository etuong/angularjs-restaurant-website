(() => {
  'use strict';
  angular.module('data')
    .service('MenuDataService', MenuDataService)
    .constant('restaurantUrl', 'https://davids-restaurant.herokuapp.com/');

  MenuDataService.$inject = ['$http', 'restaurantUrl']
  function MenuDataService($http, restaurantUrl) {
    this.getAllCategories = () =>
      $http({ method: 'GET', url: restaurantUrl + 'categories.json' })
        .then(response => response.data);

    this.getItemsForCategory = (categoryShortName) =>
      $http({ method: 'GET', url: restaurantUrl + 'menu_items.json?category=' + categoryShortName })
        .then(response => response.data.menu_items);
  }
})();