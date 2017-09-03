getTicketsFolders.$inject = ['ticketservice','$q', '$http', '$stateParams', 'spinnerService'];

function getTicketsFolders(ticketservice, $q, $http, $stateParams, spinnerService) {
    // return ticketservice.getTicketsFolders();
    var def = $q.defer();
         spinnerService.show();
            $http.get("https://rtdashboardp.rno.apple.com:9012/tickets/ticketfolders?callback=angular.callbacks._0")
                .success(function(data) {
                    def.resolve(data);
                    spinnerService.hide();
                })
                .error(function() {
                    def.reject("Failed to get data");
                });
            return def.promise;
}
module.exports = getTicketsFolders;
