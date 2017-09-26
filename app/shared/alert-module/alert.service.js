alertService.$inject = ['$rootScope',"$timeout"];

function alertService($rootScope, $timeout) {
        $rootScope.alerts = [];
    return {
        // create an array of alerts available globally
        alertSrv :{
            showAlert : function(type, msg, timeout) {
                debugger;
                $rootScope.alerts.push({
                       type: type,
                       msg: msg,
                       close: function() {
                           return alertService.alertSrv.closeAlert(this);
                       }
                   });
           
                //    if (timeout) {
                //    console.log("Inside Timeout :" + timeout) ;
                //        $timeout(function(){ 
                //         alertService.alertSrv.closeAlert(this); 
                //        }, timeout); 
                //    }
               },
               closeAlert : function(index) {
                 $rootScope.alerts.splice(index, 1);
               }
        }
    };
}
module.exports = alertService;