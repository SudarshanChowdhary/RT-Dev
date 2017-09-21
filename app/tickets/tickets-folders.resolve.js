getTicketsFolders.$inject = ['ticketservice','$q', '$http', '$stateParams', 'spinnerService'];

function getTicketsFolders(ticketservice, $q, $http, $stateParams, spinnerService) {
    // return ticketservice.getTicketsFolders();
    var def = $q.defer();
         spinnerService.show();
            $http.get("tickets/ticketfolders")
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
