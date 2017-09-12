RtPlcMilestoneService.$inject = ['$http', '$q', '$sce','spinnerService'];

function RtPlcMilestoneService($http, $q, $sce, spinnerService){
	var rtplcmilestoneservice = {
		rtPlcMilestoneAdd : rtPlcMilestoneAdd
	};
    return rtplcmilestoneservice;

    function rtPlcMilestoneAdd(reqData){
        var def = $q.defer();
        spinnerService.show();
        $http({
            url:"milestone/add",
            data: reqData,
            method:"PUT"
        }).success(function(data) {
            def.resolve(data);
            spinnerService.hide();
        }).error(function() {
            def.reject("Failed to save data");
        });
        return def.promise;
    }
}

module.exports = RtPlcMilestoneService;