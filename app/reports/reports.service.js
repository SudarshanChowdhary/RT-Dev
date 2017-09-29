ReportsService.$inject = ['$http', '$q', '$sce','spinnerService','sharedService'];

function ReportsService($http, $q, $sce, spinnerService, sharedService ){
	var reportsService = {
		getReportsList: getReportsList,
        getReportsUrl: getReportsUrl,
        getReportBhuDetails: getReportBhuDetails,
        getBhuReportData: getBhuReportData,
        getBhuReportFilterDetails : getBhuReportFilterDetails,
        getReportCurrentStatusDetails:getReportCurrentStatusDetails,
        getReportWarrantyDetails:getReportWarrantyDetails,
        getReportEffortsDetails:getReportEffortsDetails,
        exportStatusToExcelSrv : exportStatusToExcelSrv,
        exportWarrantyToExcelSrv : exportWarrantyToExcelSrv,
        exportEffortsToExcelSrv : exportEffortsToExcelSrv,
        exportBhuDtlsToExcelSrv : exportBhuDtlsToExcelSrv,
        exportExcel :exportExcel,
        getWindowsWidthPx :getWindowsWidthPx
	};

	return reportsService;
    
	function getReportsList() {
        var def = $q.defer();
         spinnerService.show();
            $http.get("https://rtdashboardd.rno.apple.com:9012/RTDashboard/reports/list")
          //  $http.get("reports/list")
                .success(function(data) {
                    def.resolve(data);
                    spinnerService.hide();
                })
                .error(function() {
                    def.reject("Failed to get data");
                });
            return def.promise;
    }

    function getReportsUrl(rId) {
        return ("reports/download/" + rId );
    }
    
    // BHU Report services **************************************************/
    function getBhuReportData() {
        var def = $q.defer();
        spinnerService.show();
        $http.get("https://rtdashboardd.rno.apple.com:9012/RTDashboard/reports/BHUReport").success(function(data) {
       // $http.get("reports/BHUReport").success(function(data) {
            if(data && data.errorCode){
                //   $scope.$emit('alert', {
                //   message: data.message,
                //   success: false
                // });
            }else{
                var cusmizedData = cunstmizeBhuData(data);
                def.resolve(cusmizedData);
                spinnerService.hide();
            }
        }).error(function() {
            def.reject("Failed to get data");
        });
        return def.promise;
    }

    function getBhuReportFilterDetails(p, y, q, m, si){
        var def = $q.defer();
        spinnerService.show();
        var getUrl = "";
        if(m){
            m = getMonthFromString(m);
        }
        if(p){
             p =p.split(" ").length >1 ? p.substr(0, p.indexOf(" ")): p;
            // getUrl = "reports/BHUReport/phase/"+ p;
            getUrl = "https://rtdashboardd.rno.apple.com:9012/RTDashboard/reports/BHUReport/phase/"+ p;
        }else if(!p && y){
            // getUrl = "reports/BHUReport/"+ y;
            getUrl = "https://rtdashboardd.rno.apple.com:9012/RTDashboard/reports/BHUReport/"+ y;
        }else if(!p && y && (q || m)){
            //getUrl = "reports/BHUReport/"+ y +"/"+ q;
            getUrl = "https://rtdashboardd.rno.apple.com:9012/RTDashboard/reports/BHUReport/"+ y +"/"+ q;
        }
        $http.get(getUrl, {
            params: {
                filterYear: y,
                filterQuarter: q,
                filterMonth: m,
                startIndex: si
            }
        }).success(function(data) {
                var cusmizedData = cunstmizeBhuData(data);
                def.resolve(cusmizedData);
                spinnerService.hide();
        }).error(function() {
                def.reject("Failed to get data");
        });
        return def.promise;
    }

    function getWindowsWidthPx(){
       return sharedService.getWindowWidth();
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

    function getMonthFromString(mon){
           var d = Date.parse(mon + "1, 2016");
           if(!isNaN(d)){
               var m = new Date(d).getMonth() + 1;
              return (m > 9) ? m: "0"+m;
           }
           return -1;
    }

    function getReportBhuDetails(bhuId, requestFor){
        var def = $q.defer();
         spinnerService.show();
            //$http.get("https://rtdashboardd.rno.apple.com:9012/RTDashboard/tickets/bhudetails/"+bhuId)
            $http.get("tickets/bhudetails/"+bhuId)
                .success(function(data) {
                    def.resolve(data);
                    spinnerService.hide();
                })
                .error(function(err) {
                    def.reject("Failed to get data");
                });
                 return def.promise;
    }

    function getReportCurrentStatusDetails(bhuId, rtSpoc){
        var def = $q.defer();
         spinnerService.show();
         //$http.get("https://rtdashboardd.rno.apple.com:9012/RTDashboard/reports/BHUReport/status/"+bhuId, { params:{ spoc: rtSpoc }})
         $http.get("reports/BHUReport/status/"+bhuId, { params:{ spoc: rtSpoc }})
             .success(function(data) {
                var cusmizedData = {
                    "totalCount": data ? data.length : 0,
                    "bhuStatusDetails": []
                 }
                 if(data.length > 0){
                    cusmizedData.totalCount = data.length;
                    cusmizedData.bhuStatusDetails = data;
                 }
                 def.resolve(cusmizedData);
                 spinnerService.hide();
             })
             .error(function(err) {
                 def.reject("Failed to get data");
             });
            return def.promise;
    }

    function getReportWarrantyDetails(bhuId){
        var def = $q.defer();
         spinnerService.show();

         //$http.get("https://rtdashboardd.rno.apple.com:9012/RTDashboard/reports/BHUReport/warranty/"+bhuId)
         $http.get("reports/BHUReport/warranty/"+bhuId)
             .success(function(data) {
                var cusmizedData = {
                    "totalCount": data ? data.length : 0,
                    "bhuWarrantyDetails": []
                 }
                 if(data.length > 0){
                    cusmizedData.totalCount = data.length;
                    cusmizedData.bhuWarrantyDetails = data;
                 }
                 def.resolve(cusmizedData);
                 spinnerService.hide();
             })
             .error(function(err) {
                 def.reject("Failed to get data");
             });
             return def.promise;
    }

    function getReportEffortsDetails(bhuId, rtSize , rtSpoc){
        var def = $q.defer();
         spinnerService.show();
         //$http.get("https://rtdashboardd.rno.apple.com:9012/RTDashboard/reports/BHUReport/efforts/"+bhuId, { params: {spoc: rtSpoc, size: rtSize}})
         $http.get("reports/BHUReport/efforts/"+bhuId,{ params: {spoc: rtSpoc, size: rtSize}})
             .success(function(data) {
                var cusmizedData = {
                    "totalCount": "0",
                    "effortsDetails": []
                }
                if(data.length > 0){
                    cusmizedData.totalCount = data.length;
                    angular.forEach(data, function(element, key) {
                    var estimatedEfforts = element.estimatedEff;   
    
                        if(!element.totalActualEff || element.totalActualEff == null){
                            element.totalActualEff = 0;
                        }
                        var deviation = estimatedEfforts - element.totalActualEff;
    
                        var myjson = {
                            "bhuId":bhuId,
                            "size":rtSize,
                            "kickOff": element.kickOffEff,
                            "designReview":element.designEff,
                            "rtScriptSharing":element.rtScriptsShareEff,
                            "rtScriptWalthr":element.rtScriptsWalkEff,
                            "itSystemDemo":element.itDemoEff,
                            "itReview":element.itReviewEff,
                            "uatReview":element.uatReviewEff,
                            "rtScoping":element.rtScopingEff,
                            "itExecutionDefects":element.rtExecEff,
                            "warrantySupport":element.warrantyEff,
                            "p2s":element.p2sEff,
                            "plcFollowups":element.plcFollowupEff,
                            "estimatedEfforts":estimatedEfforts,
                            "actualEfforts":element.totalActualEff,
                            "deviation": deviation
                        }
                        cusmizedData.effortsDetails.push(myjson);
                    }); 
                }
                
                 def.resolve(cusmizedData);
                 spinnerService.hide();
             })
             .error(function(err) {
                 def.reject("Failed to get data");
             });
             return def.promise;
    }

    //this is the common function to export excel
    function exportExcel(p,y,q,m){
        //return "https://rtdashboardd.rno.apple.com:9012/RTDashboard/reports/BHURepDownload/"+ p +"/"+ y +"/"+ q +"/"+ m;
        return "reports/BHURepDownload/"+ p +"/"+ y +"/"+ q +"/"+ m;
    }

    function exportStatusToExcelSrv(bhuId, spoc){
        //return "https://rtdashboardd.rno.apple.com:9012/RTDashboard/milestone/download/"+ bhuId +"/" + spoc;
        return "milestone/download/"+ bhuId +"/" + spoc;
    }

    function exportWarrantyToExcelSrv(bhuId){
        //return "https://rtdashboardd.rno.apple.com:9012/RTDashboard/reports/BHUWarrantyDownload/"+ bhuId;
        return "reports/BHUWarrantyDownload/"+ bhuId;
    }

    function exportEffortsToExcelSrv(bhuId , spoc, size){
        //return "https://rtdashboardd.rno.apple.com:9012/RTDashboard/reports/BHUEffortsDownload/"+ bhuId + "/" + spoc + "/" size;
        return "reports/BHUEffortsDownload/"+ bhuId +"/" + spoc + "/"+ size;
    }

    function exportBhuDtlsToExcelSrv(bhuId){
       //return "https://rtdashboardd.rno.apple.com:9012/RTDashboard/reports/BHUTicketsDownload/"+ bhuId;
       return "reports/BHUTicketsDownload/"+ bhuId;
    }
}

module.exports = ReportsService;