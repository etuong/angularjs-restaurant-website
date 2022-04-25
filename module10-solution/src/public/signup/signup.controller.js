(function () {
  'use strict';

  angular.module('public')
    .controller('SignupController', SignupController);

  SignupController.$inject = ['MenuService', 'UserPreferenceService'];
  function SignupController(MenuService, UserPreferenceService) {
    var controller = this;

    controller.submit = form => {
      if (!controller.invalidMenuItem) {
        UserPreferenceService.setUserPreferences(controller.user);
        controller.saved = true;
        form.$setPristine();
      } else
        controller.saved = false;

    };

    controller.checkMenuItem = shortName => {
      if (shortName) {
        MenuService.doesMenuItemExist(shortName.toUpperCase()).then(validity => controller.invalidMenuItem = !validity)
      }
    }
  }
})()
