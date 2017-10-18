SharedService.$inject = ['$http', '$q', '$rootScope', 'spinnerService', '$timeout', 'toaster'];

function SharedService($http, $q, $rootScope, spinnerService, $timeout, toaster) {
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
        getWindowWidth :getWindowWidth,
        getSearchTestScriptsByBhuidReportData : getSearchTestScriptsByBhuidReportData,
        cunstmizeBhuData : cunstmizeBhuData
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
                        return ["OCTOBER","NOVEMBER","DECEMBER"];
                        break;
                    }
                    case "Q2": {
                        return ["JANUARY","FEBRUARY","MARCH"];
                        break;
                    }
                    case "Q3": {
                        return ["APRIL","MAY","JUNE"];
                        break;
                    }
                    case "Q4": {
                        return ["JULY","AUGUST","SEPEMBER"];
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
        $http.get("https://rtdashboardd.rno.apple.com:9012/RTDashboard/homepage/userProfile").success(function(data) {
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
            $http.get("https://rtdashboardd.rno.apple.com:9012/RTDashboard/admin/teamdetails").success(function(data) {
            //$http.get("admin/teamdetails").success(function(data) {
                def.resolve(data);
                var user = $rootScope.user;
                $rootScope.isTeamMember = false;
                for(var itm =0; itm<data.length;itm++){
                    if(user && data[itm].memberEmailId == user){
                        $rootScope.isTeamMember = true;
                    }
                }
                $rootScope.teamMembers = data;
                spinnerService.hide();
            }).error(function() {
                def.reject("Failed to get data");
            });
            return def.promise;
    }

    function getSpocDetails(spoc){
        var def = $q.defer();
        spinnerService.show();
        $http.get("https://rtdashboardd.rno.apple.com:9012/RTDashboard/utils/users/"+ spoc).success(function(data) {
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
        $http.get("https://rtdashboardd.rno.apple.com:9012/RTDashboard/tickets/bhudetails/"+bhuId).success(function(data) {
      //  $http.get("tickets/bhudetails/"+bhuId).success(function(data) {
            def.resolve(data);
            spinnerService.hide();
        }).error(function() {
            def.reject("Failed to get data");
        });
        return def.promise;
    }

    // BHU Report services **************************************************/
    function getSearchTestScriptsByBhuidReportData(bhuid) {
        $timeout( function(){
            spinnerService.show();
        },100);
            var def = $q.defer();

            var a = {"totalCount":"3","bhurptDetails":[{
                //"itemId":"5411","itemName":"RITM000172292",
                "bhuId" : "17819",
                "currentStatus":"Design review start date",
                "size":"small",
                "noOfObjects":"4",
                "projectManager":"Mohankumar jangam",
                "rtsSpoc":"alagappan_saravanan",
                "extteammembers":"9",
                "scriptshared":"2",
                "scriptutilized":"8",
                "scriptexecuted":"5",
                "rtdefects":"3",
                "rtmiss":"1",
                "warrantyissue":"2",
                "scriptExcpartOfwarranty":"5",
                "newscriptreceived":"4",
                "scriptsmodified":"3",
                "efortsutilized":"145"
               },
               {
                //"itemId":"5411","itemName":"RITM000172292",
                "bhuId" : "20170",
                "currentStatus":"Go live date",
                "size":"medium",
                "noOfObjects":"9",
                "projectManager":"Venugopal Boya",
                "rtsSpoc":" satya_s",
                "extteammembers":"4",
                "scriptshared":"2",
                "scriptutilized":"3",
                "scriptexecuted":"1",
                "rtdefects":"2",
                "rtmiss":"3",
                "warrantyissue":"6",
                "scriptExcpartOfwarranty":"5",
                "newscriptreceived":"3",
                "scriptsmodified":"4",
                "efortsutilized":"119"
               },
               {
                //"itemId":"5411","itemName":"RITM000172292",
                "bhuId" : "18679",
                "currentStatus":"UAT Start date",
                "size":"small",
                "noOfObjects":"3",
                "projectManager":"Ramesh Perumala Raja",
                "rtsSpoc":"",
                "extteammembers":"6",
                "scriptshared":"4",
                "scriptutilized":"3",
                "scriptexecuted":"2",
                "rtdefects":"4",
                "rtmiss":"0",
                "warrantyissue":"5",
                "scriptExcpartOfwarranty":"5",
                "newscriptreceived":"3",
                "scriptsmodified":"2",
                "efortsutilized":"90"
               }
               ]};
               def.resolve(a);
            //$http.get("https://rtdashboardd.rno.apple.com:9012/RTDashboard/reports/BHUReport",{ params:{ bhuID : bhuid }}).success(function(data) {
            // $http.get("reports/BHUReport",{ params:{ bhuID : bhuid }}).success(function(data) {
            //     if(data && data.errorCode){
            //         toaster.pop({
            //             type: 'error',
            //             body: 'Please try later or contact with admin..!',
            //             timeout: 3000,
            //             showCloseButton: true               
            //         });
            //     }else{
            //         var cusmizedData = cunstmizeBhuData(data);
            //         def.resolve(cusmizedData);
            //         spinnerService.hide();
            //     }
            // }).error(function() {
            //     def.reject("Failed to get data");
            // });
            return def.promise;
    }

    function cunstmizeBhuData(data){
        var cusmizedData = {
            "totalCount": data.reportDetails ? data.reportDetails.length : 0,
            "bhurptDetails": []
         }
         if(data.reportDetails.length > 0){
            cusmizedData.totalCount = data.reportDetails.length;
            angular.forEach(data.reportDetails, function(element, key) {
                var myjson = {
                    "bhuId" : element.bhuId,
                    "currentStatus":element.currentStatus,
                    "size":element.size,
                    "noOfObjects":element.objImpacted,
                    "projectManager":element.projManager,
                    "rtsSpoc":element.rtSpoc,
                    "extteammembers":element.rtExtendedTeam,
                    "scriptshared":element.scriptsShared,
                    "scriptutilized":element.scriptsUtilized,
                    "scriptexecuted":element.scriptsExecuted,
                    "rtdefects":element.rtDefects,
                    "rtmiss":element.rtMiss,
                    "warrantyissue":element.warrantyIssues,
                    "scriptExcpartOfwarranty":element.newScriptsreceived,
                    "newscriptreceived":element.newScriptsreceived,
                    "scriptsmodified":element.scriptsModified,
                    "efortsutilized":element.efforts
                }
                cusmizedData.bhurptDetails.push(myjson);
            }); 
        }
        return cusmizedData;
    }
}
module.exports = SharedService;