SharedService.$inject = ['$http', '$q', '$rootScope', 'spinnerService'];

function SharedService($http, $q, $rootScope, spinnerService) {
    var sharedService = {
        getYears: getYears,
        getQuarter: getQuarter,
        getPhase: getPhase,
        getSearchTestScripts: getSearchTestScripts,
        getUser: getUser,
        getSpocDetails: getSpocDetails,
        getSearchTestScriptsByBhuid: getSearchTestScriptsByBhuid,
        getQuarterMonths: getQuarterMonths,
        getTeamMembers : getTeamMembers,
        getrtSpocsUsers : getrtSpocsUsers,
        getWindowWidth :getWindowWidth
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

    function getPhase() {
        var phase = ["Kick off", "Design / Dev","IT","UAT","RT","Warranty Phase","P2S Handover"];
        return phase;
    }

    function getQuarterMonths(quarter)
    {
        switch(quarter)
        {
            case "Q1": {
                return ["OCT","NOV","DEC"];
                break;
            }
            case "Q2": {
                return ["JAN","FEB","MAR"];
                break;
            }
            case "Q3": {
                return ["APR","MAY","JUN"];
                break;
            }
            case "Q4": {
                return ["JUL","AUG","SEP"];
                break;
            }
        }
    }
    function getWindowWidth() {
        if (self.innerWidth) {
          return self.innerWidth;
        }
      
        if (document.documentElement && document.documentElement.clientWidth) {
          return document.documentElement.clientWidth;
        }
      
        if (document.body) {
          return document.body.clientWidth;
        }
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
        $http.get("https://rtdashboardd.rno.apple.com:9012/homepage/userProfile").success(function(data) {
        //$http.get("homepage/userProfile").success(function(data) {
            def.resolve(data);
            spinnerService.hide();
            $rootScope.user = data.emailAddr;
            $rootScope.userRoles = data.roles;
        }).error(function() {
            def.reject("Failed to get data");
        });
        return def.promise;   
    }

    function getTeamMembers(){
        var def = $q.defer();
        spinnerService.show();
        $http.get("https://rtdashboardd.rno.apple.com:9012/admin/teamdetails").success(function(data) {
        //$http.get("admin/teamdetails").success(function(data) {
            def.resolve(data);
            var user = $rootScope.user;
            $rootScope.isTeamMember = false;
            for(var itm =0; itm<data.length;itm++){
                 if(user && data[itm].memberEmailId == user){
                    $rootScope.isTeamMember = true;
                 }
            }
            spinnerService.hide();
        }).error(function() {
            def.reject("Failed to get data");
        });
        return def.promise;   
    }

    function getSpocDetails(spoc){
        var def = $q.defer();
       $http.get("https://rtdashboardd.rno.apple.com:9012/utils/users/"+ spoc).success(function(data) {
       // $http.get("utils/users/"+ spoc).success(function(data) {
            def.resolve(data);
            spinnerService.hide();
        }).error(function() {
            def.reject("Failed to get data");
        });
        return def.promise;     
    }

    function getrtSpocsUsers(){
        var def = $q.defer();
        spinnerService.show();
        $http.get("https://rtdashboardd.rno.apple.com:9012/RTDashboard/utils/users").success(function(data) {
        //$http.get("utils/users").success(function(data) {
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
        //$http.get("https://rtdashboardd.rno.apple.com:9012/tickets/bhudetails/"+bhuId).success(function(data) {
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