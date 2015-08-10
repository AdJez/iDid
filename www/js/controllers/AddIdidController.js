app.controller('AddIdidController',function($scope,$state,ididStorage) {
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