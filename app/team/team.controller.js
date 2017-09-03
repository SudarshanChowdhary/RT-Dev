TeamController.$inject = ['$state', '$scope', '$log', '$http', 'teamService', 'adminservice', '$location', '$anchorScroll'];

function TeamController($state, $scope, $log, $http, teamService, adminservice, $location, $anchorScroll) {
    var vmt = this;
    // Variable Definitions
      vmt.teamList = [];
    
    // Function Definitions
    vmt.init = init;
    vmt.getTeamData = getTeamData;
    vmt.generateChartData = generateChartData;
    // vmt.toggleIcon = toggleIcon;
    vmt.closePersonDetails = closePersonDetails;
    init();
    /**
     * init
     * Intializing On Load Services for team Page
     */

    function init() {
       adminservice.getAdminTeamDetails().then(function(adminTeamTypeData) {
        if(adminTeamTypeData && adminTeamTypeData.errorCode){
            $scope.$emit('alert', {
                message: adminTeamTypeData.message,
                success: false
            });
        }else{
        vmt.teamList = adminTeamTypeData;
      }
       });
        
    }
    
        function getTeamData(group, i) {
          var index = i;
          $location.hash('top-of-page');
          $anchorScroll();
          teamService.getTeamChart(group).then(function(chartData) {
            if(chartData && chartData.errorCode){
                $scope.$emit('alert', {
                message: chartData.message,
                success: false
            });
            }else{
            vmt.generateChartData(chartData, index);
            vmt.closePersonDetails();
           }
        });
    }

    function generateChartData(teamData, id) {
     google.charts.load('current', {packages:["orgchart"]});
      google.charts.setOnLoadCallback(drawChart);
     
      function drawChart() { var tmpArr = [];
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Name');
        data.addColumn('string', 'Manager');
        data.addColumn('string', 'ToolTip');

       
        angular.forEach(teamData, function(key, value) {
            vmt.teamRowsObj = 
                [{
                    "v": "",
                    "f": ""
                }, {
                    "v": ""
                }, {
                    "v": ""
                }];
            vmt.teamRowsObj[0].v = key.rtTeamMemberId+'';
            vmt.teamRowsObj[0].f = key.memberName+'<div style="font-weight:normal">'+key.memberTitle+'</div>'+'<input type="hidden" value='+key.memberEmailId+'>'+'<textarea class="hide specialization">'+key.memberDescription+'</textarea>';
            if(key.managerId==0){
              vmt.teamRowsObj[1].v = key.rtTeamMemberId+'';
            }else{
               vmt.teamRowsObj[1].v = key.managerId+'';
             }
            vmt.teamRowsObj[2].v = key.memberName;
            tmpArr.push(vmt.teamRowsObj);

        });
        data.addRows(tmpArr);
        // Create the chart.
        var chart = new google.visualization.OrgChart(document.getElementById('chart_div_'+id));
        // Draw the chart, setting the allowHtml option to true for the tooltips.
        chart.draw(data, {allowHtml:true});
    }
  }
  $('body').on('click','.google-visualization-orgchart-node', function(){
    var email = $(this).children('input').val();
    var role = $(this).children('div').text();
    var descp= $(this).children('textarea.specialization').val();
    teamService.getSelectedTeamMemberDetails(email).then(function(personDSData){
                    if(personDSData && personDSData.errorCode){
                        $scope.$emit('alert', {
                        message: personDSData.message,
                        success: false
                    });
                         vmt.closePersonDetails();
                    }else{
                      vmt.personDetails = personDSData;
                      vmt.personDetails.email = email;
                      vmt.personDetails.role = role;
                      vmt.personDetails.description = (descp == undefined || descp == "null") ? '--' : descp;
                      if(vmt.personDetails.firstName && vmt.personDetails.lastName){
                        vmt.fullName = vmt.personDetails.firstName +' '+ vmt.personDetails.lastName;
                      var nameStr = vmt.fullName.split(' ');
                      var avatar = '';
                        for(var i =0;i<nameStr.length;i++){
                           avatar += nameStr[i].substring(0,1).toUpperCase();
                          }
                        vmt.userAvatar = avatar;
                        }
                      }
                   });
  });
  function closePersonDetails(){
    vmt.personDetails = false;
  }
}
module.exports = TeamController;