getReportsList.$inject = ['reportservice','$q', '$http', '$stateParams', 'spinnerService'];

function getReportsList(reportservice, $q, $http, $stateParams, spinnerService) {
    // return reportservice.getReportsList();
    var userProfileData = [
        {
          "itemName": "Enhancement Request",
          "itemCount": 478,
          "idList": null
        },
        {
          "itemName": "Project",
          "itemCount": 1295,
          "idList": null
        },
        {
          "itemName": "Project Warranty",
          "itemCount": 1002,
          "idList": null
        },
        {
          "itemName": "Production Support",
          "itemCount": 1508,
          "idList": null
        },
        {
          "itemName": "Enhancement Warranty",
          "itemCount": 18,
          "idList": null
        }
      ];

     var def = $q.defer();
         spinnerService.show();
           // $http.get("https://rtdashboardp.rno.apple.com:9012/reports/list?callback=angular.callbacks._0")
           $http.get("userProfileData")
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
