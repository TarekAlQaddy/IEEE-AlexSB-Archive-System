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
searchApp.controller('resultsCont',['$scope','searchSvc','$log',function ($scope,searchSvc,$log) {

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
        /*$http.get('url',{'text':searchSvc.text,'type':searchSvc.type}).then(function(success){
            $scope.searchData = success.data;
            $scope.errorMsg = null;
        },function(e){
            $scope.errorMsg = e;
        })*/
        $scope.searchData = [
            {
                name:'tarek alqaddy',
                date:2016,
                event:'EDM',
                reporter:'tarek tarek',
                id:1
            },
            {
                name:'mohamed agmed',
                date:2026,
                event:'ITW',
                reporter:'Mohamed tarek',
                id:2
            },
            {
                name:'Ahmed alqaddy',
                date:2012,
                event:'EDM',
                reporter:'tarek',
                id:3
            },
            {
                name:'tarek alqaddy',
                date:2016,
                event:'EDM',
                reporter:'tarek tarek',
                id:4
            }
        ]
    };
    $scope.getData();
    console.log($scope)

    //to pass the id of the html element and get it from the list here
    function searchKeyVal(ar,value){
        for(var i in ar){
            if(ar[i].id == value)
            return ar[i];
        }
        return null;
    }
    //get the report id and search for that report then set it to editReport
    $scope.getReport = function($event){
        var id = $event.target.dataset.edit;
        $scope.editReport = searchKeyVal($scope.searchData,id);
    };


    $scope.deleteReport = function(){
        //TODO: send POST request
    };
    $scope.editReportFunc = function(){
        //TODO: send POST request
    }


}]);
