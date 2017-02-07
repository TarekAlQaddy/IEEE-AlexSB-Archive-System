var searchApp = angular.module('searchApp',['ngRoute','ngAnimate']);
//config routing among views
searchApp.config(function($routeProvider){
    $routeProvider.when('/',{
        templateUrl:'search.html',
        controller:'searchCont'
    })
    .when('/search-results',{
        templateUrl:'search-results.html',
        controller:'resultsCont'
    })
    .otherwise({
        redirectTo:'/'
    })
});
//custom service to share data among controllers
searchApp.service('searchSvc',function(){
    this.text = null;
    this.type = '0';
    this.data = null;
    this.editReport = null;
});

//searchCont for first view 'search.html'
searchApp.controller('searchCont',['$scope','searchSvc',function ($scope,searchSvc) {
    $scope.searchText = searchSvc.text;
    $scope.searchType = searchSvc.type;
    $scope.$watch('searchText',function(){
        searchSvc.text = $scope.searchText;
    });
    $scope.$watch('searchType',function(){
        searchSvc.type = $scope.searchType;
    });
    $scope.getView = function(url){
        window.location.href = url;
    }
}]);

//resultsCont for second view 'search-results.html' and its edit modal
searchApp.controller('resultsCont',['$scope','searchSvc','$http',function ($scope,searchSvc,$http) {

    $scope.searchData = null;
    $scope.errorMsg = null;

    $scope.searchText2 = searchSvc.text;
    $scope.searchType2 = searchSvc.type;

    $scope.$watch('searchText2',function(){
        searchSvc.text = $scope.searchText2;
    });
    $scope.$watch('searchType2',function(){
        searchSvc.type = $scope.searchType2;
    });
    $scope.$watch('searchData',function(){
        searchSvc.data = $scope.searchData;
    });
    $scope.$watch('editReport',function(){
        searchSvc.editReport = $scope.editReport;
    });



    $scope.getData = function(){
        $http.get('api.json',{'text':searchSvc.text,'type':searchSvc.type}).then(function(success){
            $scope.searchData = success.data;
            $scope.errorMsg = null;
        },function(e){
            console.log(e);
            $scope.searchData = null;
            $scope.errorMsg = "Error has occurred"
        })
    };
    $scope.getData();


    $scope.getReport = function(report){
        $scope.editReport = report;
        //console.log(report);
    };


    $scope.deleteReport = function(){
        //TODO: send POST request
    };
    $scope.editReportFunc = function(){
        //TODO: send POST request
    }


}]);
