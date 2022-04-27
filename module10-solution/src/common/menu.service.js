(function () {
  "use strict";

  angular.module('common')
    .service('MenuService', MenuService);

  MenuService.$inject = ['$http', '$q', 'ApiPath'];
  function MenuService($http, $q, ApiPath) {
    var service = this;

    service.getCategories = () => $http.get(`${ApiPath}/categories.json`).then(response => response.data);

    service.getMenuItems = category => {
      var config = {};
      if (category) {
        config.params = { 'category': category };
      }

      return $http.get(`${ApiPath}/menu_items.json`, config).then(response => response.data);
    };

    service.getMenuItem = shortName => $http.get(`${ApiPath}/menu_items/${shortName.toUpperCase()}.json`).then(response => response.data);

    service.doesMenuItemExist = shortname => {
      return service.getMenuItem(shortname).then(() => {
        return $q.resolve(true);
      }).catch(() => {
        return $q.resolve(false);
      });
    };
  }
})();
