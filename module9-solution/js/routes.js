(() => {
  'use strict';

  angular.module('MenuApp')
    .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function RoutesConfig($stateProvider, $urlRouterProvider) {
    // Redirect to Home if no other URL matches
    $urlRouterProvider.otherwise('/');

    // Set up UI states
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'templates/home.html'
      })

      // Categories page
      .state('categories', {
        url: '/categories',
        templateUrl: 'templates/categories.html',
        controller: 'CategoriesController as categoriesCtrl',
        resolve: {
          categories: ['MenuDataService', MenuDataService => {
            return MenuDataService.getAllCategories();
          }]
        }
      })

      // Items page
      .state('categories.items', {
        url: '/items/{shortName}',
        templateUrl: 'templates/items.html',
        controller: 'ItemsController as itemsCtrl',
        resolve: {
          items: ['$stateParams', 'MenuDataService', ($stateParams, MenuDataService) => {
            return MenuDataService.getItemsForCategory($stateParams.shortName);
          }]
        }
      });
  }
})();
