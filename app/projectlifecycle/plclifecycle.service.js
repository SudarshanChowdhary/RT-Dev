ProjectLifeCycleService.$inject = ['$http'];

function ProjectLifeCycleService($http){
	var rtplcmilestoneservice = {
		rtPlcMilestoneAdd : rtPlcMilestoneAdd,
		getRTSpocs: getRTSpocs
	};
    return rtplcmilestoneservice;

    function rtPlcMilestoneAdd(reqData){
			return $http({
            url:"milestone/add",
            data: reqData,
            method:"PUT"
        });
    }
		function getRTSpocs(){
			return $http({
            url:"getspocs",
            method:"GET"
        });
		}
}

module.exports = ProjectLifeCycleService;
