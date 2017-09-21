TicketsService.$inject = [
    '$http',
    '$q',
    'spinnerService'
];

function TicketsService($http, $q,spinnerService) {
	var ticketService = {
        getTicketsFolders: getTicketsFolders,
        getTicketTypeDetails: getTicketTypeDetails,
        getTicketFilterDetailsByYear: getTicketFilterDetailsByYear,
        getTicketFilterDetailsByQuarter: getTicketFilterDetailsByQuarter,
        getTicketBhuDetails: getTicketBhuDetails,
        exportToExcelByYear: exportToExcelByYear,
        exportToExcelByQuarter: exportToExcelByQuarter,
        exportToExcelCurrentQuarter: exportToExcelCurrentQuarter
    };

    return ticketService;

    function getTicketsFolders() {
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

    function getTicketTypeDetails(tType, startIndex) {
        var def = $q.defer();
         spinnerService.show();
            $http.get("tickets/details/"+tType+"?start-index="+startIndex)
                .success(function(data) {
                    def.resolve(data);
                    spinnerService.hide();
                })
                .error(function() {
                    def.reject("Failed to get data");
                });
            return def.promise;
    }

    function getTicketFilterDetailsByYear(tType,year, startIndex){
        var def = $q.defer();
         spinnerService.show();
            $http.get("tickets/details/"+tType+"/"+year+"?start-index="+startIndex)
                .success(function(data) {
                    def.resolve(data);
                    spinnerService.hide();
                })
                .error(function() {
                    def.reject("Failed to get data");
                });
            return def.promise;
    }

    function getTicketFilterDetailsByQuarter(tType,year,quar,startIndex){
        var def = $q.defer();
         spinnerService.show();
            $http.get("tickets/details/"+tType+"/"+year+"/"+quar+"?start-index="+startIndex)
                .success(function(data) {
                    def.resolve(data);
                    spinnerService.hide();
                })
                .error(function() {
                    def.reject("Failed to get data");
                });
            return def.promise;
    }

    function getTicketBhuDetails(bhuId){
        var def = $q.defer();
         spinnerService.show();
            $http.get("tickets/bhudetails/"+bhuId)
                .success(function(data) {
                    def.resolve(data);
                    spinnerService.hide();
                })
                .error(function() {
                    def.reject("Failed to get data");
                });
            return def.promise;
    }

	
    function exportToExcelByYear(ticType, y){
        return "tickets/download/"+ticType+"/"+y;
    }
    function exportToExcelByQuarter(ticType, y, q){
        return "tickets/download/"+ticType+"/"+y+"/"+q;       
    }
    function exportToExcelCurrentQuarter(ticType){
        return "tickets/download/"+ticType;
    }
}

module.exports = TicketsService;
