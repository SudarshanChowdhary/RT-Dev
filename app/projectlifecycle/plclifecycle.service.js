ProjectLifeCycleService.$inject = ['$http'];

function ProjectLifeCycleService($http){
	var rtplcmilestoneservice = {
		rtPlcMilestoneAdd : rtPlcMilestoneAdd
	};
    return rtplcmilestoneservice;

    function rtPlcMilestoneAdd(reqData){
			return $http({
            url:"milestone/add",
            data: reqData,
            method:"PUT"
        });
    }
}

module.exports = ProjectLifeCycleService;
