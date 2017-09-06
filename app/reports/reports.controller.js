ReportsController.$inject = ['$state', '$scope', '$log', 'reportsList', 'reportservice'];

function ReportsController($state, $scope, $log, reportsList, reportservice) {
    var vmrep = this;
    vmrep.reportList = reportsList;
    vmrep.reportBtns = [{"Name":"BHU Report","link":"root.R.reporthome.bhureports"},{"Name":"Report","link":"root.R.reporthome.reportrequest"}];
    
    if(reportsList && reportsList.errorCode){
            $scope.$emit('alert', {
                message: 'RT Dashboard currently down for Maintenance. We will be back soon. Thank you for your patience.',
                success: false
            });
        }
    // Variable Definitions
    // Function Definitions
    vmrep.init = init;
    vmrep.downloadReportsLink = downloadReportsLink;
    init();
    /**
     * init
     * Intializing On Load Services for Set Up Client Page
     */
    function init() {
       
    }

    function downloadReportsLink(rId){
        window.location.href = reportservice.getReportsUrl(rId);
    }
}

module.exports = ReportsController;