ProjectLifeCycleService.$inject = ['$http', '$q', 'spinnerService'];

function ProjectLifeCycleService($http, $q, spinnerService){
        var rtplcmilestoneservice = {
            rtPlcMilestoneAdd : rtPlcMilestoneAdd,
            getRTSpocs: getRTSpocs,
            getBhuid:getBhuid
        };
        return rtplcmilestoneservice;

    function rtPlcMilestoneAdd(reqData){
        var def = $q.defer();
        spinnerService.show();
		$http({
            url:"milestone/add",
            data: reqData,
            method:"POST"
        }).success(function(data) {
            def.resolve(data);
        })
        .error(function() {
            def.reject("Failed to get data");
        });
        return def.promise;
    }

    function getRTSpocs(){
        var def = $q.defer();
        spinnerService.show();
        var spoc = [{name:"Manohar", email:"manohar@apple.com"},
        {name:"Amudha", email:"Amudha@apple.com"},
        {name:"Nithiya", email:"Nithiya@apple.com"},
        {name:"Siva", email:"Siva@apple.com"},
        {name:"Madhavan", email:"Madhavan@apple.com"},
        {name:"Ravi", email:"Ravi@apple.com"},
        {name:"Swami", email:"Swami@apple.com"},
        {name:"Padhmi", email:"Padhmi@apple.com"},
        {name:"Kavya", email:"Kavya@apple.com"},
        {name:"Sudarshan", email:"Sudarshan.koyalkar@wipro.com"}];
        def.resolve(spoc);

        //*******************we need to ask swami for this service
		// $http({
        //     url:"milestone/getspocs",
        //     method:"GET"
        // }).success(function(data) {
        //     def.resolve(data);
        // })
        // .error(function() {
        //     def.reject("Failed to get data");
        // });

        return def.promise;
	}


    function getBhuid(id){
        debugger;
        var def = $q.defer();
        spinnerService.show();
        def.resolve("17819");
        //*******************we need to ask swami for this service
        // $http({
        //     url:"milestone/status/" + id,
        //     method:"GET"
        // }).success(function(data) {
        //     def.resolve(data);
        // })
        // .error(function() {
        //     def.reject("Failed to get data");
        // });
        
        return def.promise;
    }
}

module.exports = ProjectLifeCycleService;