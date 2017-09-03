ReportsService.$inject = ['$http', '$q', 'spinnerService'];

function ReportsService($http, $q,spinnerService){
	var reportsService = {
		getReportsList: getReportsList,
        getReportsUrl: getReportsUrl,

        getBhuReportData: getBhuReportData,
        getBhuReportFilterDetailsByYear: getBhuReportFilterDetailsByYear,
        getBhuReportFilterDetailsByQuarter: getBhuReportFilterDetailsByQuarter,
        exportToExcelByYear: exportToExcelByYear,
        exportToExcelByQuarter: exportToExcelByQuarter,
        exportToExcelCurrentQuarter: exportToExcelCurrentQuarter
	};

	return reportsService;


    
	function getReportsList() {
        debugger;
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
        debugger;
        var def = $q.defer();
        spinnerService.show();
        $http.get("https://rtdashboardp.rno.apple.com:9012/bhureports/details?start-index=1&callback=angular.callbacks._0").success(function(data) {
            def.resolve(data);
            spinnerService.hide();
        }).error(function() {
            def.reject("Failed to get data");
        });
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