angular.module('ionic.utils', [])
.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || 'EMPTY');
    }
  }
}]);

angular.module('ididApp', ['ionic','ui.router','ionic.utils'])
    .run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {
            if(window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if(window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })

.run(function($localstorage) {
    if($localstorage.getObject('idids') == 'EMPTY') {
        $localstorage.setObject('idids', []);
    };
    $localstorage.setObject('categories', [
        {id: 1, name: 'Ionic',     color: 'positive'},
        {id: 2, name: 'AngularJs', color: 'assertive'},
        {id: 3, name: 'GitHub',    color: 'dark'}
    ]);
})
.factory('ididStorage', function($localstorage) {
  var savedIdidsArray,
      newIdidsArray,
      categoriesArray;

  return {
    getIdids: function() {
      savedIdidsArray = $localstorage.getObject('idids');
      return savedIdidsArray;
    },
    addIdid: function(newIdid) {
        newIdidsArray = this.getIdids();
        newIdidsArray.push({ category: newIdid.category,description: newIdid.description });
        $localstorage.setObject('idids',newIdidsArray);
    },
    getCategories: function() {
      categoriesArray = $localstorage.getObject('categories');
      return categoriesArray;
    }
  }
})
.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/");

  $stateProvider
      .state('idids', {
        url: "/",
        templateUrl: "templates/idids.html"
      })
      .state('addIdid', {
        url: "/idids/add",
        templateUrl: "templates/addIdid.html",
        controller: 'AddIdidController'
      })
})

.controller('MainController',function($scope,ididStorage) {
        $scope.idids = ididStorage.getIdids();

        $scope.$on('addIdid', function(event,data){
            $scope.idids.push({description: data.description, category: data.category});
        });
})

.controller('AddIdidController',function($scope,$state,ididStorage) {
        $scope.categories = ididStorage.getCategories();
        $scope.addIdid = function (idid) {
            var newIdid = {};
            newIdid.category = idid.category.name;
            newIdid.description = idid.description;
            ididStorage.addIdid(newIdid);
            $scope.$emit('addIdid',newIdid);
            $state.go('idids');
        };
});
