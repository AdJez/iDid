app.controller('MainController',function($scope,$ionicPopup,ididStorage) {
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