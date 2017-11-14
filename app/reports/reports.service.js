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
        if(!$(".loading-backdrop").hasClass('loading')){                    $(".loading-backdrop").addClass('loading');                 }
         //   $http.get("https://rtdashboardd.rno.apple.com:9012/RTDashboard/reports/list")
            $http.get("reports/list")
                .success(function(data) {
                    if(data.errorCode){
                        def.resolve([]);
                    }else{
                        def.resolve(data);
                    }
                   $(".loading-backdrop").removeClass('loading');
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
       if(!$(".loading-backdrop").hasClass('loading')){                    $(".loading-backdrop").addClass('loading');                 }
        var getUrl = "";
        if(m){
            m = getMonthFromString(m);
        }
        if(p){
             p =p.split(" ").length >1 ? p.substr(0, p.indexOf(" ")): p;
            getUrl = "reports/BHUReport/phase/"+ p;
         //   getUrl = "https://rtdashboardd.rno.apple.com:9012/RTDashboard/reports/BHUReport/phase/"+ p;
        }else if(!p && y && !(q || m)){
            getUrl = "reports/BHUReport/"+ y;
          //  getUrl = "https://rtdashboardd.rno.apple.com:9012/RTDashboard/reports/BHUReport/"+ y;
        }else if(!p && y && (q || m)){
            getUrl = "reports/BHUReport/"+ y +"/"+ q;
          //  getUrl = "https://rtdashboardd.rno.apple.com:9012/RTDashboard/reports/BHUReport/"+ y +"/"+ q;
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
               $(".loading-backdrop").removeClass('loading');
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
        if(!$(".loading-backdrop").hasClass('loading')){                    $(".loading-backdrop").addClass('loading');                 }
          //  $http.get("https://rtdashboardd.rno.apple.com:9012/RTDashboard/tickets/bhudetails/"+bhuId)
            $http.get("tickets/bhudetails/"+bhuId)
                .success(function(data) {
                    def.resolve(data);
                   $(".loading-backdrop").removeClass('loading');
                })
                .error(function(err) {
                    def.reject("Failed to get data");
                });
                 return def.promise;
    }

    function getReportCurrentStatusDetails(bhuId, rtSpoc){
        var def = $q.defer();
        if(!$(".loading-backdrop").hasClass('loading')){                    $(".loading-backdrop").addClass('loading');                 }
      //   $http.get("https://rtdashboardd.rno.apple.com:9012/RTDashboard/reports/BHUReport/status/"+bhuId, { params:{ spoc: rtSpoc }})
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
                $(".loading-backdrop").removeClass('loading');
             })
             .error(function(err) {
                 def.reject("Failed to get data");
             });
            return def.promise;
    }

    function getReportWarrantyDetails(bhuId){
        var def = $q.defer();
        if(!$(".loading-backdrop").hasClass('loading')){                    $(".loading-backdrop").addClass('loading');                 }

      //   $http.get("https://rtdashboardd.rno.apple.com:9012/RTDashboard/reports/BHUReport/warranty/"+bhuId)
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
                $(".loading-backdrop").removeClass('loading');
             })
             .error(function(err) {
                 def.reject("Failed to get data");
             });
             return def.promise;
    }

    function getReportEffortsDetails(bhuId, rtSize , rtSpoc){
        var def = $q.defer();
        if(!$(".loading-backdrop").hasClass('loading')){                    $(".loading-backdrop").addClass('loading');                 }
       //  $http.get("https://rtdashboardd.rno.apple.com:9012/RTDashboard/reports/BHUReport/efforts/"+bhuId, { params: {spoc: rtSpoc, size: rtSize}})
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
                $(".loading-backdrop").removeClass('loading');
             })
             .error(function(err) {
                 def.reject("Failed to get data");
             });
             return def.promise;
    }

    function getReportPhases(phase){
        
                var reportphase = {
                    "Design":"<p>Hi Team,<br/><span>As part of RT PLC, we will be performing the following activities at different phases for all the Projects.</span><br/><span> As a 1st step, we would be sharing the relevant RT test scripts from repository to the project team <br/>which can be utilised during the IT phase. This will reduce the effort of writing new scripts for the projects team.</span><br/><br/><span>Please find the attached test scripts that are relevant to this Project<br/><br/> We will be scheduling a call to explain the RT PLC and RT test script walkthrough.</span><br/><br/></p>",
        
                    "IT":"<p>Hi Team,<br/><span>As per RT PLC, We will be scheduling a meeting to get System demo of the project changes and walkthrough of the test scripts that was used for Project IT.</span> <br/><span>Also highlight the changes that were made to the existing test script shared from RT repository during the Design phase.</span><br/><br/><span>Please share the IT Test Scripts, Test Results, Defects identified during IT.</span><br/><br/></p>",
        
                    "RT":"<p>Hi Team,<br/><span>RT is completed and signed off for the project changes, sign off comments are updated in the RT ticket</span> <br/><span>Thanks for all your support.</span><br/><span>Happy Go-Live!</span><br/><span>Please keep us posted on all the warranty issues to plan RT for analysing and delivering the ticket on time.</span><br/><span>Kindly provide your feedback on RT after Go-Live</span><br/><br/></p>",
        
                    "UAT": "<p>Hi Team,<br/><span>As per RT PLC, during the last week of UAT we will be starting with the RT readiness activities to start Testing on the Day 1 of RT timelines.</span><br/><br/><span>Please share the below details for our understanding purpose:</span><br/><span>UAT Test Results, UAT Defects, Any changes after the system demo</span><br/><br/><span>Please fill the below attached sample scoping document with the object details for the project and create a CS-SR ticket to have a final discussion on the Project changes and RT scope finalising.</span><br/><br/></p>",
        
                    "Warranty": "<p>Hi Team,<br/><span>In Warranty Phase, RT team does RCA on all warranty issues to check for possible RT miss</span><br/><span>Please pass feedback to project team to include the validation points/scenarios reported on to failed scripts</span><br/><span>Project team append new functionalities /validation checks to  scripts shared by RT team</span><br/><span>Validate scoping template , MetaData part of CS incidents.Mutually agree on CR analysis fields</span><br><br/></p>",
        
                    "P2S":"<p>Hi Team,<br/> <span>In P2S Handover, RT Team receives IT scripts from Project Team in prescribed format</span><br/><span>Changes are incorporated in automation script</span><br/><span>PD like cutover complete in QA#. This will help all systems to be in sync</span><br/><br/></p>"
                }
                 return plcphase[phase];
            }
        
    


    function sendBhuNotification(reqData){
        var def = $q.defer();
        //if(!$(".loading-backdrop").hasClass('loading')){                    $(".loading-backdrop").addClass('loading');                 }
        // $http.post("https://rtdashboardd.rno.apple.com:9012/RTDashboard/reports/BHUReport/sendBHUEmail", { params: {
        //     receipients: reqData.recepients,
        //     content: reqData.content,
        //     from: reqData.from,
        //     bhuDetails: reqData.bhuDetails
        // }})
        // //$http.post("reports/BHUReport/sendBHUEmail", {param :{ emailDTO: reqData }})
        // .success(function(data) {
        //     def.resolve(data);
        // })
        // .error(function() {
        //     def.reject("Failed to get data");
        // });
        // return def.promise;


        $http({
       //     url:"https://rtdashboardd.rno.apple.com:9012/RTDashboard/reports/BHUReport/sendBHUEmail",
            url: "reports/BHUReport/sendBHUEmail",
            params: {
                        receipients: reqData.recepients,
                        content: reqData.content,
                        from: reqData.from,
                        bhuDetails: reqData.bhuDetails
                        //bhuDetails: JSON.parse(reqData.bhuDetails)
                    },
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
      //  return "https://rtdashboardd.rno.apple.com:9012/RTDashboard/reports/BHURepDownload/"+ p +"/"+ y +"/"+ q +"/"+ m;
         return "reports/BHURepDownload/"+ p +"/"+ y +"/"+ q +"/"+ m;
    }

    function exportStatusToExcelSrv(bhuId, spoc){
      //  return "https://rtdashboardd.rno.apple.com:9012/RTDashboard/milestone/download/"+ bhuId +"/" + spoc;
         return "milestone/download/"+ bhuId +"/" + spoc;
    }

    function exportWarrantyToExcelSrv(bhuId){
      //  return "https://rtdashboardd.rno.apple.com:9012/RTDashboard/reports/BHUWarrantyDownload/"+ bhuId;
        return "reports/BHUWarrantyDownload/"+ bhuId;
    }

    function exportEffortsToExcelSrv(bhuId , spoc, size){
      //  return "https://rtdashboardd.rno.apple.com:9012/RTDashboard/reports/BHUEffortsDownload/"+ bhuId +"/" + spoc +"/"+ size;
        return "reports/BHUEffortsDownload/"+ bhuId +"/" + spoc +"/"+ size;
    }

    function exportBhuDtlsToExcelSrv(bhuId){
      // return "https://rtdashboardd.rno.apple.com:9012/RTDashboard/reports/BHUTicketsDownload/"+ bhuId;
       return "reports/BHUTicketsDownload/"+ bhuId;
    }

    function getBhuReportColumns(){
       var columns = [
            // {
            //     headerText: ' ',
            //     dataField: 'notify',
            //     thClasses: 'width3',
            //     tdClasses: 'width3'
            // },
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
        
        columns[16]  ={
            headerText: 'Notify',
            dataField: 'notify',
            thClasses: 'width5',
            tdClasses: 'width5'
        }
        // columns[17]  ={
        //     headerText: ' ',
        //     dataField: 'desc'
        // }
        return columns;
    }
}

module.exports = ReportsService;