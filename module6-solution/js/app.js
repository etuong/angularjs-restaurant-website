(function () {
  'use strict';

  angular.module('LunchCheck', [])
    .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];
  function LunchCheckController($scope) {
    $scope.items = '';
    $scope.message = '';

    $scope.checkLunch = () => {
      // Split string to array of items
      const splittedItems = $scope.items.split(',');

      // Use case where string only contains commas and no actual items
      let flag = splittedItems.every(elem => elem == "")

      var items = splittedItems
        .map(item => item.trim()) // Remove whitespaces at the ends
        .filter(item => item.length > 0); // Filter out blank items

      var length = items.length;
      var color = length ? 'green' : 'red'

      // We do not consider empty items
      if (length != splittedItems.length) {
        flag = true
      }

      $scope.emptyDishMessage = flag ? 'Empty items do not affect the count.' : '';
      $scope.messageStyle = { 'color': `${color}` };
      $scope.textBoxStyle = { 'border': `2px solid ${color}` };
      $scope.message = length ? length <= 3 ? 'Enjoy!' : 'Too much!' : 'Please enter data first';
    };
  }
})();