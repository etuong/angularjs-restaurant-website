(function () {
  'use strict';

  angular.module('public')
    .controller('InfoController', InfoController);

  InfoController.$inject = ['userPreferences'];
  function InfoController(userPreferences) {
    var controller = this;
    controller.userPreferences = userPreferences;
  }
})()
