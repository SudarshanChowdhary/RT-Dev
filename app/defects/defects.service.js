DefectsService.$inject = ['$http', '$q', 'spinnerService'];

function DefectsService($http, $q, spinnerService) {
    var defectsService = {
        getDefectsData: getDefectsData,
        getDefectsFilterDetailsByYear: getDefectsFilterDetailsByYear,
        getDefectsFilterDetailsByQuarter: getDefectsFilterDetailsByQuarter,
        exportToExcelByYear: exportToExcelByYear,
        exportToExcelByQuarter: exportToExcelByQuarter,
        exportToExcelCurrentQuarter: exportToExcelCurrentQuarter
    };
    return defectsService;

    function getDefectsData() {
        var def = $q.defer();
        spinnerService.show();
        $http.get("https://rtdashboardp.rno.apple.com:9012/defects/details?start-index=1&callback=angular.callbacks._0").success(function(data) {
            def.resolve(data);
            spinnerService.hide();
        }).error(function() {
            def.reject("Failed to get data");
        });
        return def.promise;
    }

    function getDefectsFilterDetailsByYear(year, startIndex){
        var def = $q.defer();
         spinnerService.show();
            $http.get("https://rtdashboardp.rno.apple.com:9012/defects/details/"+year+"?start-index="+startIndex+"&callback=angular.callbacks._0")
                .success(function(data) {
                    def.resolve(data);
                    spinnerService.hide();
                })
                .error(function() {
                    def.reject("Failed to get data");
                });
            return def.promise;
    }

    function getDefectsFilterDetailsByQuarter(year,quar, startIndex){
        var def = $q.defer();
         spinnerService.show();
            $http.get("https://rtdashboardp.rno.apple.com:9012/defects/details/"+year+"/"+quar+"?start-index="+startIndex+"&callback=angular.callbacks._0")
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
            return "defects/download/"+y;
    }
    function exportToExcelByQuarter(y, q){
        return "defects/download/"+y+"/"+q;        
    }
    function exportToExcelCurrentQuarter(){
            return "defects/download/";
    }

}
module.exports = DefectsService;