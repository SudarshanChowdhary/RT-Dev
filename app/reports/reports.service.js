ReportsService.$inject = ['$http', '$q', '$sce','spinnerService','sharedService'];

function ReportsService($http, $q, $sce, spinnerService, sharedService){
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
        exportBhuDtlsToExcelSrv : exportBhuDtlsToExcelSrv
	};

	return reportsService;
    
	function getReportsList() {
        var def = $q.defer();
         spinnerService.show();
            $http.get("reports/list")
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
        return ("https://rtdashboardp.rno.apple.com:9012/reports/download/" + rId +"?callback=angular.callbacks._0");
    }
    
    // BHU Report services **************************************************/
    function getBhuReportData() {
        var def = $q.defer();
        spinnerService.show();
        // $http.get("report/BHUReport").success(function(data) {
        //     def.resolve(data);
        //     spinnerService.hide();
        // }).error(function() {
        //     def.reject("Failed to get data");
        // });
        // return def.promise;
        
        //please remove this mock data before deployment
        //please remove the below code and uncomment above code
        var _responseData = {"totalCount":"3","bhurptDetails":[{
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
            "rtsSpoc":"pavel_g",
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
      
        var responseMockData= _responseData;
        def.resolve(responseMockData);
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
            getUrl = "reports/BHUReport/phase/"+ p;
        }else if(!p && y){
            getUrl = "reports/BHUReport/"+ y;
        }else if(!p && y && (q || m)){
            getUrl = "reports/BHUReport/"+ y +"/"+ q;
        }
        $http.get(getUrl, {
            params: {
                "filter-year": y,
                "filter-quarter": q,
                "filter-month": m,
                "start-index": si
            }
        }).success(function(data) {
                def.resolve(data);
                spinnerService.hide();
        }).error(function() {
                def.reject("Failed to get data");
        });
        return def.promise;
    }

    function getMonthFromString(mon){
           var d = Date.parse(mon + "1, 2016");
           if(!isNaN(d)){
               var m = new Date(d).getMonth() + 1;
              return (m > 9) ? m: "0"+m;
           }
           return -1;
    }
    // function getBhuReportFilterDetailsByYear(p, y, q, m, si){
    //     var def = $q.defer();
    //      spinnerService.show();
    //         $http.get("https://rtdashboardp.rno.apple.com:9012/bhureports/details/"+y+"?start-index="+si+"&callback=angular.callbacks._0")
    //             .success(function(data) {
    //                 def.resolve(data);
    //                 spinnerService.hide();
    //             })
    //             .error(function() {
    //                 def.reject("Failed to get data");
    //             });
    //         return def.promise;
    // }

    // function getBhuReportFilterDetailsByQuarter(p, y, q, m, si){
    //     var def = $q.defer();
    //      spinnerService.show();
    //         $http.get("https://rtdashboardp.rno.apple.com:9012/bhureports/details/"+y+"/"+q+"?start-index="+si+"&callback=angular.callbacks._0")
    //             .success(function(data) {
    //                 def.resolve(data);
    //                 spinnerService.hide();
    //             })
    //             .error(function() {
    //                 def.reject("Failed to get data");
    //             });
    //         return def.promise;
    // }

    function getReportBhuDetails(bhuId, requestFor){
        var def = $q.defer();
         spinnerService.show();
       
            // $http.get("tickets/bhudetails/"+bhuId)
            //     .success(function(data) {
            //         def.resolve(data);
            //         spinnerService.hide();
            //     })
            //     .error(function(err) {
            //         def.reject("Failed to get data");
            //     });
            //      return def.promise;

            //please remove this mock data before deployment
            //please remove the below code and uncomment above code
            var  _responseData = {
                "totalCount": "1",
                "ticketDetails": [
                    {"itemId": "4380", "itemName": "RITM000094421", "status": "","creationDate": "2017-01-12", "rtSpoc": "satya_s", "bhuId": "17819", "ticketType": "Project Warranty",
                    "description": "RT For ZZKM1 changes for Warranty Issue"},
                    {"itemId": "4381", "itemName": "RITM000082364", "status": "","creationDate": "2017-06-17", "rtSpoc": "satya_s", "bhuId": "17819", "ticketType": "Project Warranty",
                    "description": 'The ZZKM1 transaction runs the Block order report.  Via BHU 17819 the field "Pending Info" was changed to "Status" and a drop down was added. '}
                ]};
            def.resolve(_responseData);
            spinnerService.hide();
            return def.promise;
    }

    function getReportCurrentStatusDetails(bhuId){
        var def = $q.defer();
         spinnerService.show();
         // $http.get("Reports/BHUReport/status/"+bhuId)
         //     .success(function(data) {
         //         def.resolve(data);
         //         spinnerService.hide();
         //     })
         //     .error(function(err) {
         //         def.reject("Failed to get data");
         //     });
         //      return def.promise;

         //please remove this mock data before deployment
         //please remove the below code and uncomment above code

         var _responseData = {
             "totalCount": "1",
             "bhuStatusDetails": [{
                 "meetingDate": "2017-04-19",
                 "bhuId": "17819",
                 "rtSpoc": "satya_s",
                 "rtPlcMilestone": "RT Script sharing",
                 "minutesOfMeeting": "Script sharing",
                 "efforts": 34
             },
             {
                "meetingDate": "2017-06-23",
                "bhuId": "17819",
                "rtSpoc": "srikrishna_r",
                "rtPlcMilestone": "Design Review",
                "minutesOfMeeting": "Script walkthrugh",
                "efforts": 79
            },
            {
                "meetingDate": "2017-04-19",
                "bhuId": "17819",
                "rtSpoc": "alagappan_saravanan",
                "rtPlcMilestone": "IT Review",
                "minutesOfMeeting": "Design Demo",
                "efforts": 17
            }]
         };
         def.resolve(_responseData);
         spinnerService.hide();

         return def.promise;
    }

    function getReportWarrantyDetails(bhuId){
        var def = $q.defer();
         spinnerService.show();

         // $http.get("Reports/BHUReport/warranty/"+bhuId)
         //     .success(function(data) {
         //         def.resolve(data);
         //         spinnerService.hide();
         //     })
         //     .error(function(err) {
         //         def.reject("Failed to get data");
         //     });
         //     return def.promise;

         //please remove this mock data before deployment
         //please remove the below code and uncomment above code

         var _responseData = {
             "totalCount": "1",
             "bhuWarrantyDetails": [{
                 "ticketNo": "RITM003240546",
                 "rootCause": "New requirement",
                 "justification": "Not given as a part of the BRD",
                 "bhuId": bhuId
             },
             {
                "ticketNo": "RITM000094421",
                "rootCause": "New requirement",
                "justification": "Required some more input from clients",
                "bhuId": bhuId
            }]
         };
         def.resolve(_responseData);
         spinnerService.hide();
         return def.promise;
    }

    function getReportEffortsDetails(bhuId, size){
        var def = $q.defer();
         spinnerService.show();
        //  $http.get("Reports/BHUReport/Efforts/"+bhuId)
        //      .success(function(data) {
        //         var cusmizedData = {
        //             "totalCount": "1",
        //             "effortsDetails": []
        //         }
        //         if(data.length > 0){
        //             cusmizedData.totalCount = data.length;
        //             angular.forEach(data, function(element, key) {
        //             var estimatedEfforts = 0;//it may come from database from java service with response, pending for clarification
    
        //                 if(!element.totalActualEff || element.totalActualEff == null){
        //                     element.totalActualEff = 0;
        //                 }
        //                 var deviation = estimatedEfforts - element.totalActualEff;
    
        //                 var myjson = {
        //                     "bhuId":bhuId,
        //                     "size":size,
        //                     "kickOff": element.kickOffEff,
        //                     "designReview":element.designEff,
        //                     "rtScriptSharing":element.rtScriptsShareEff,
        //                     "rtScriptWalthr":element.rtScriptsWalkEff,
        //                     "itSystemDemo":element.itDemoEff,
        //                     "itReview":element.itReviewEff,
        //                     "uatReview":element.uatReviewEff,
        //                     "rtScoping":element.rtScopingEff,
        //                     "itExecutionDefects":element.rtExecEff,
        //                     "warrantySupport":element.warrantyEff,
        //                     "p2s":element.p2sEff,
        //                     "plcFollowups":element.plcFollowupEff,
        //                     "estimatedEfforts":estimatedEfforts,
        //                     "actualEfforts":element.totalActualEff,
        //                     "deviation": deviation
        //                 }
        //                 cusmizedData.effortsDetails.push(myjson);
        //             }); 
        //         }
                
        //          def.resolve(cusmizedData);
        //          spinnerService.hide();
        //      })
        //      .error(function(err) {
        //          def.reject("Failed to get data");
        //      });
        //      return def.promise;



         //please remove this mock data before deployment
         //please remove the below code and uncomment above code
        //please remove this mock data before deployment, mock data as per java service given by swamy     
         var _responseData = [{
                "bhuID":17819,
                "size":"medium",
                "kickOffEff":2,
                "designEff":1,
                "rtScriptsShareEff":1,
                "rtScriptsWalkEff":1,
                "itDemoEff":2,
                "itReviewEff":1,
                "uatReviewEff":1,
                "rtScopingEff":46,
                "rtExecEff":50,
                "warrantyEff":42,
                "p2sEff":2,
                "plcFollowupEff":3,
                "estimatedEfforts":144,
                "totalActualEff":158,
                //"deviation":null
             },{
                "bhuID":17819,
                "size":"medium",
                "kickOffEff":2,
                "designEff":1,
                "rtScriptsShareEff":1,
                "rtScriptsWalkEff":1,
                "itDemoEff":2,
                "itReviewEff":1,
                "uatReviewEff":1,
                "rtScopingEff":46,
                "rtExecEff":50,
                "warrantyEff":42,
                "p2sEff":2,
                "plcFollowupEff":3,
                "estimatedEfforts":109,
                "totalActualEff":98,
                //"deviation":null
             }
            ];
         

         var cusmizedData = {
            "totalCount": "1",
            "effortsDetails": []
         }

         if(_responseData.length > 0)
            {
                cusmizedData.totalCount = _responseData.length;
                angular.forEach(_responseData, function(element, key) {
                var estimatedEfforts = element.estimatedEfforts;// 0;//it may come from database from java service with response, pending for clarification

                    if(!element.totalActualEff || element.totalActualEff == null){
                        element.totalActualEff = 0;
                    }
                    var deviation = estimatedEfforts - element.totalActualEff;

                    var myjson = {
                        "bhuId":bhuId,
                        "size":size,
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
         return def.promise;
    }

    //this is the common function to export excel
    function exportExcel(p,y,q,m){
        return "bhureports/download/"+ p +"/"+ y +"/"+ q +"/"+ m;
    }

    // function exportToExcelByPhase(p){
    //     return "bhureports/download/"+p;
    // }
    // function exportToExcelByPhaseAndYear (p,y){
    //     "bhureports/download/"+p+"/"+y;
    // }
    // function exportToExcelByYear(y){
    //         return "bhureports/download/"+y;
    // }
    // function exportToExcelByQuarter(y, q){
    //     return "bhureports/download/"+y+"/"+q;        
    // }

    function exportStatusToExcelSrv(bhuId){
        return "bhureports/downloadStatus/"+ bhuId;
    }

    function exportWarrantyToExcelSrv(bhuId){
        return "bhureports/downloadWarranty/"+ bhuId;
    }

    function exportEffortsToExcelSrv(bhuId){
        return "bhureports/downloadEfforts/"+ bhuId;
    }

    function exportBhuDtlsToExcelSrv(bhuId){
        return "bhureports/downloadBhuDtls/"+ bhuId;
    }
}

module.exports = ReportsService;