getReportsList.$inject = ['reportservice','$q', '$http', '$stateParams', 'spinnerService'];

function getReportsList(reportservice, $q, $http, $stateParams, spinnerService) {
    // return reportservice.getReportsList();
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

module.exports = getReportsList;
