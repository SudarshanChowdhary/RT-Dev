SharedService.$inject = ['$http', '$q', 'spinnerService'];

function SharedService($http, $q, spinnerService) {
    var sharedService = {
        getYears: getYears,
        getQuarter: getQuarter,
        getSearchTestScripts: getSearchTestScripts,
        getUser: getUser,
        getSpocDetails: getSpocDetails,
        getSearchTestScriptsByBhuid: getSearchTestScriptsByBhuid
    };
    return sharedService;

    function getYears() {
        var date = new Date,
            year = date.getFullYear() + 1,
            yearArr = [];

           for (var i = 0; year >= 2014; i++) {
            yearArr.push(year--);
           }

        return yearArr;
    }

    function getQuarter() {
        var quar = ['Q1', 'Q2', 'Q3', 'Q4'];
        return quar;
    }

    function getSearchTestScripts(keyword){
        var def = $q.defer();
        spinnerService.show();
        $http.get("search/searchvalue/" + keyword).success(function(data) {
            def.resolve(data);
            spinnerService.hide();
        }).error(function() {
            def.reject("Failed to get data");
        });
        return def.promise;
    }

    function getUser(){
      var def = $q.defer();
        spinnerService.show();
        $http.get("https://rtdashboardp.rno.apple.com:9012/homepage/userProfile?callback=angular.callbacks._0").success(function(data) {
            def.resolve(data);
            spinnerService.hide();
        }).error(function() {
            def.reject("Failed to get data");
        });
        return def.promise;   
    }

    function getSpocDetails(spoc){
          var def = $q.defer();
                
                $http.get("utils/users/"+ spoc).success(function(data) {
                    def.resolve(data);
                    spinnerService.hide();
                }).error(function() {
                    def.reject("Failed to get data");
                });
                return def.promise;     
            }

    function getSearchTestScriptsByBhuid(bhuId){
        var def = $q.defer();
        spinnerService.show();
        $http.get("tickets/bhudetails/"+bhuId).success(function(data) {
            def.resolve(data);
            spinnerService.hide();
        }).error(function() {
            def.reject("Failed to get data");
        });
        return def.promise;
    }
}
module.exports = SharedService;