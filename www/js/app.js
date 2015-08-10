var app = angular.module('ididApp', ['ionic','ui.router','ionic.utils'])
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


app.config(function($stateProvider, $urlRouterProvider) {

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




