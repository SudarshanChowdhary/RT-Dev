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
        $http.get("defects/details?start-index=1").success(function(data) {
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
            $http.get("defects/details/"+year+"?start-index="+startIndex)
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
            $http.get("defects/details/"+year+"/"+quar+"?start-index="+startIndex)
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