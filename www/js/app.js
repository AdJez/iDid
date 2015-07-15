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
      return JSON.parse($window.localStorage[key] || '[]');
    },
    removeItem: function(key){
      $window.localStorage.removeItem(key);
    }
  }
}]);

angular.module('ididApp', ['ionic','ui.router','ionic.utils'])
    .run(function($ionicPlatform,$localstorage) {
        $ionicPlatform.ready(function() {
            if(window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if(window.StatusBar) {
                StatusBar.styleDefault();
            }
            if($localstorage.get('ididCount',0) == 0) {
                $localstorage.set('ididCount', 1);
                $localstorage.set('idids', []);
            }
            else {
                $localstorage.set('ididCount',  parseInt($localstorage.get('ididCount')) + 1);
            }

        });
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
    },
    isFirstTime: function() {
      return ($localstorage.get('ididCount') == '1' ) ? true : false;
    },
    isEmptyList: function() {
        return ($localstorage.getObject('idids').length == 0) ? true : false;
    },
    removeAll: function() {
        $localstorage.removeItem('idids');
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

.controller('MainController',function($scope,$ionicPopup,ididStorage) {
        $scope.isFirstTime = ididStorage.isFirstTime();
        $scope.isEmptyList = ididStorage.isEmptyList();
        if($scope.isFirstTime)
            $ionicPopup.alert({
                title: 'Welcome for the first time!',
                template: 'Just press the + at the top right corner to add a new item',
                okType: 'button-balanced'
            });
        $scope.idids = ididStorage.getIdids();
        $scope.removeAllIdids = function() {
            ididStorage.removeAll('idids');
            $scope.idids = [];
            $scope.isEmptyList = true;
        };

        $scope.$on('addIdid', function(event,data){
            $scope.isEmptyList =false;
            $scope.idids.push({description: data.description, category: data.category});
        });
})

.controller('AddIdidController',function($scope,$state,ididStorage) {
        $scope.categories = ['Activities','Daily','Personal','Work'];
        $scope.newIdid = {category: "Activities"};
        $scope.addIdid = function () {
            if($scope.newIdid.description) {
                ididStorage.addIdid({
                    category: $scope.newIdid.category,
                    description: $scope.newIdid.description
                });
                $scope.$emit('addIdid',$scope.newIdid);
                $scope.newIdid.description = "";
                $state.go('idids');
            }
            else {
                console.log("No description!");
            }
        };
});
