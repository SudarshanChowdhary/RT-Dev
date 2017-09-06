ReportsService.$inject = ['$http', '$q', 'spinnerService'];

function ReportsService($http, $q,spinnerService){
	var reportsService = {
		getReportsList: getReportsList,
        getReportsUrl: getReportsUrl,

        getReportBhuDetails: getReportBhuDetails,
        getBhuReportData: getBhuReportData,
        getBhuReportFilterDetailsByYear: getBhuReportFilterDetailsByYear,
        getBhuReportFilterDetailsByQuarter: getBhuReportFilterDetailsByQuarter,
        exportToExcelByYear: exportToExcelByYear,
        exportToExcelByQuarter: exportToExcelByQuarter,
        exportToExcelCurrentQuarter: exportToExcelCurrentQuarter
	};

	return reportsService;
    
	function getReportsList() {
        var def = $q.defer();
         spinnerService.show();
            $http.get("https://rtdashboardp.rno.apple.com:9012/reports/list?callback=angular.callbacks._0")
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
        return ("https://rtdashboardp.rno.apple.com:9012/reports/download/" + rId+"?callback=angular.callbacks._0");
    }
    
    // BHU Report services **************************************************/
    function getBhuReportData() {
        var def = $q.defer();
        spinnerService.show();
        //{"totalCount":"40","ticketDetails":[
        var _responseData = {"totalCount":"3","bhurptDetails":[{
            //"itemId":"5411","itemName":"RITM000172292",
            "bhuId" : "17819",
            "currentStatus":"Go live date (Refer next page for details)",
            "size":"small",
            "noOfObjects":"4",
            "projectManager":"Venu",
            "rtsSpoc":"Amudha",
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
           },
           {
            //"itemId":"5411","itemName":"RITM000172292",
            "bhuId" : "20170",
            "currentStatus":"Go live date (Refer next page for details)",
            "size":"small",
            "noOfObjects":"4",
            "projectManager":"Venu",
            "rtsSpoc":"Amudha",
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
           },
           {
            //"itemId":"5411","itemName":"RITM000172292",
            "bhuId" : "18679",
            "currentStatus":"Go live date (Refer next page for details)",
            "size":"small",
            "noOfObjects":"4",
            "projectManager":"Venu",
            "rtsSpoc":"Amudha",
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
        // $http.get("https://rtdashboardp.rno.apple.com:9012/bhureports/details?start-index=1&callback=angular.callbacks._0").success(function(data) {
        //     def.resolve(data);
        //     spinnerService.hide();
        // }).error(function() {
        //     def.reject("Failed to get data");
        // });
        var responseMockData= _responseData;
        def.resolve(responseMockData);
        return def.promise;
    }

    function getBhuReportFilterDetailsByYear(year, startIndex){
        var def = $q.defer();
         spinnerService.show();
            $http.get("https://rtdashboardp.rno.apple.com:9012/bhureports/details/"+year+"?start-index="+startIndex+"&callback=angular.callbacks._0")
                .success(function(data) {
                    def.resolve(data);
                    spinnerService.hide();
                })
                .error(function() {
                    def.reject("Failed to get data");
                });
            return def.promise;
    }

    function getBhuReportFilterDetailsByQuarter(year,quar, startIndex){
        var def = $q.defer();
         spinnerService.show();
            $http.get("https://rtdashboardp.rno.apple.com:9012/bhureports/details/"+year+"/"+quar+"?start-index="+startIndex+"&callback=angular.callbacks._0")
                .success(function(data) {
                    def.resolve(data);
                    spinnerService.hide();
                })
                .error(function() {
                    def.reject("Failed to get data");
                });
            return def.promise;
    }

    function getReportBhuDetails(bhuId){
        var def = $q.defer();
         spinnerService.show();
         var _responseData = {
            "totalCount": "6",
            "ticketDetails": [{
                "itemId": "4380",
                "itemName": "RITM000092681",
                "status": null,
                "creationDate": "2017-04-19",
                "rtSpoc": "satya_s",
                "bhuId": "17819",
                "ticketType": "Project Warranty",
                "description": "Details"
            }, {
                "itemId": "4274",
                "itemName": "RITM000094421",
                "status": null,
                "creationDate": "2017-04-04",
                "rtSpoc": "alagappan_saravanan",
                "bhuId": "17819",
                "ticketType": "Project Warranty",
                "description": "Details"
            }]
        };
        def.resolve(_responseData);
        spinnerService.hide();
            // $http.get("https://rtdashboardp.rno.apple.com:9012/tickets/bhudetails/"+bhuId+"&callback=angular.callbacks._0")
            //     .success(function(data) {
            //         def.resolve(data);
            //         spinnerService.hide();
            //     })
            //     .error(function(err) {
            //         debugger;
            //         def.reject("Failed to get data");
            //     });
            return def.promise;
    }

    function exportToExcelByYear(y){
            return "bhureports/download/"+y;
    }
    function exportToExcelByQuarter(y, q){
        return "bhureports/download/"+y+"/"+q;        
    }
    function exportToExcelCurrentQuarter(){
            return "bhureports/download/";
    }

}

module.exports = ReportsService;