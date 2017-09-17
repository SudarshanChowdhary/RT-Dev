ProjectLifeCycleService.$inject = ['$http'];

function ProjectLifeCycleService($http){
	var rtplcmilestoneservice = {
		rtPlcMilestoneAdd : rtPlcMilestoneAdd,
		getRTSpocs: getRTSpocs,
        getBhuid:getBhuid
	};
    return rtplcmilestoneservice;

    function rtPlcMilestoneAdd(reqData){
			return $http({
            url:"milestone/add",
            data: reqData,
            method:"POST"
        });
    }
		function getRTSpocs(){
			return $http({
            url:"getspocs",
            method:"GET"
        });
		}

        function getBhuid(id){
            return $http({
            url:"milestone/status/" + id,
            method:"GET"
        });
        }
}

module.exports = ProjectLifeCycleService;
