ReportsService.$inject = ['$http', '$q', '$sce','spinnerService','sharedService','$timeout', 'toaster','$rootScope'];

function ReportsService($http, $q, $sce, spinnerService, sharedService, $timeout, toaster, $rootScope ){
	var reportsService = {
		// getReportsList: getReportsList,
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
        getWindowsWidthPx :getWindowsWidthPx,
        sendBhuNotification : sendBhuNotification,
        getBhuReportColumns : getBhuReportColumns
	};

	return reportsService;
    
	function getReportsList() {
        var def = $q.defer();
         spinnerService.show();
            //$http.get("https://rtdashboardd.rno.apple.com:9012/RTDashboard/reports/list")
            $http.get("reports/list")
                .success(function(data) {
                    if(data.errorCode){
                        def.resolve([]);
                    }else{
                        def.resolve(data);
                    }
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
    function getBhuReportData(bhuid) {
       return sharedService.getSearchTestScriptsByBhuidReportData(bhuid);
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
            getUrl = "reports/BHUReport/phase/"+ p;
            //getUrl = "https://rtdashboardd.rno.apple.com:9012/RTDashboard/reports/BHUReport/phase/"+ p;
        }else if(!p && y && !(q || m)){
            getUrl = "reports/BHUReport/"+ y;
            //getUrl = "https://rtdashboardd.rno.apple.com:9012/RTDashboard/reports/BHUReport/"+ y;
        }else if(!p && y && (q || m)){
            getUrl = "reports/BHUReport/"+ y +"/"+ q;
            //getUrl = "https://rtdashboardd.rno.apple.com:9012/RTDashboard/reports/BHUReport/"+ y +"/"+ q;
        }
        $http.get(getUrl, {
            params: {
                filterYear: y,
                filterQuarter: q,
                filterMonth: m,
                startIndex: si
            }
        }).success(function(data) {
                var cusmizedData =  sharedService.cunstmizeBhuData(data);
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
                    var estimatedEfforts =element.estimatedEff;//it may come from database from java service with response, pending for clarification
    
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

    function sendBhuNotification(reqData){
        var def = $q.defer();
        spinnerService.show();
       
        $http({
            //url:"https://rtdashboardd.rno.apple.com:9012/RTDashboard/milestone/doEmail",
            url: "BHUReport/sendBHUEmail",
            data: { emailDTO: reqData },
            method:"POST"
        }).success(function(data) {
            def.resolve(data);
        })
        .error(function() {
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
        //return "https://rtdashboardd.rno.apple.com:9012/RTDashboard/reports/BHUEffortsDownload/"+ bhuId +"/" + spoc +"/"+ size;
        return "reports/BHUEffortsDownload/"+ bhuId +"/" + spoc +"/"+ size;
    }

    function exportBhuDtlsToExcelSrv(bhuId){
       //return "https://rtdashboardd.rno.apple.com:9012/RTDashboard/reports/BHUTicketsDownload/"+ bhuId;
       return "reports/BHUTicketsDownload/"+ bhuId;
    }

    function getBhuReportColumns(){
       var columns = [
            {
                headerText: ' ',
                dataField: 'notify',
                thClasses: 'width3',
                tdClasses: 'width3'
            },
            {
                headerText: 'BHU/IHU#',
                dataField: 'bhuId',
                thClasses: 'width5',
                tdClasses: 'width5',
                sort: true
            }, {
                headerText: 'Current Status',
                dataField: 'currentStatus',
                thClasses: 'width5',
                tdClasses: 'width5',
                sort: true
            }, {
                headerText: 'Size',
                dataField: 'size',
                //sort: true,
                thClasses: 'width5',
                tdClasses: 'width5'
            }, {
                headerText: 'Impacted Objects',
                dataField: 'noOfObjects',
                thClasses: 'width5',
                tdClasses: 'width5'
            }, {
                headerText: 'Project Manager',
                dataField: 'projectManager',
                thClasses: 'width10',
                tdClasses: 'width10',
                sort: true
            }, {
                headerText: 'RT Spoc',
                dataField: 'rtsSpoc',
                thClasses: 'width5',
                tdClasses: 'width5',
                sort: true
            }, {
                headerText: 'Extended Team Members',
                dataField: 'extteammembers',
                thClasses: 'width10',
                tdClasses: 'width10'
            }, {
                headerText: 'Scripts Shared',
                dataField: 'scriptshared',
                thClasses: 'width5',
                tdClasses: 'width5'
            }, {
                headerText: 'Scripts Utilized',
                dataField: 'scriptutilized',
                thClasses: 'width5',
                tdClasses: 'width5'
            }, {
                headerText: 'Scripts Executed',
                dataField: 'scriptexecuted',
                thClasses: 'width5',
                tdClasses: 'width5'
            }, {
                headerText: 'RT Defects',
                dataField: 'rtdefects',
                thClasses: 'width5',
                tdClasses: 'width5'
            }, {
                headerText: 'RT Miss',
                dataField: 'rtmiss',
                thClasses: 'width5',
                tdClasses: 'width5'
            }, {
                headerText: 'Warranty Issues',
                dataField: 'warrantyissue',
                thClasses: 'width5',
                tdClasses: 'width5',
                sort: true
            }, {
                headerText: 'Scripts Executed as part of Warranty',
                dataField: 'scriptExcpartOfwarranty',
                thClasses: 'width10',
                tdClasses: 'width10'
            }, {
                headerText: 'Scripts Modified',
                dataField: 'scriptsmodified',
                thClasses: 'width5',
                tdClasses: 'width5'
            }
        ];

        if ($rootScope.isTeamMember == true || ($rootScope.userRoles && $rootScope.userRoles.indexOf("admin") > -1)) {
            var colm15 = columns[14];
            columns[14] = {
                headerText: 'New Scripts Received',
                dataField: 'newscriptreceived',
                thClasses: 'width5',
                tdClasses: 'width5'
            };
            columns[15] = colm15;
            columns.push({
                headerText: 'Efforts Utilized',
                dataField: 'efortsutilized',
                thClasses: 'width5',
                tdClasses: 'width5',
                sort: true
            });
        } else if ($rootScope.isTeamMember == false) {
            var colm15 = columns[14];
            columns[14] = {
                headerText: 'New Script Received',
                dataField: 'newscriptreceived',
                thClasses: 'width10',
                tdClasses: 'width10'
            };
            columns[15] = colm15;
        }
        return columns;
    }
}

module.exports = ReportsService;