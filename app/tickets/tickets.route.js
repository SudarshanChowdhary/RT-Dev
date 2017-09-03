TicketsRoute.$inject = [
    '$stateProvider'
];

function TicketsRoute(
    $stateProvider
) {
    $stateProvider
        .state('root.ticketfolders', {
            url: '/ticketfolders',
            views: {
                '@root': {
                    templateUrl: 'app/tickets/templates/tickets-folders.html',
                    controller: 'TicketsController',
                    controllerAs: 'vmtic'
                }
            },
            resolve: {
                ticketFolders: require('./tickets-folders.resolve')
                // ticketFolders: ["$q", "$timeout","$http", function ($q, $timeout, $http, spinnerService) {
                //    return $http.get("tickets/ticketfolders").then(function(resp){ return {status:true , ticketFolders: resp} }, 
                //     function(error){ return {status:false, ticketFolders: error} })
                // }]
            },
            ncyBreadcrumb: {
                    label: 'Tickets'
                  }
        }).state('root.ticketfolders.details', {
            url: '/details',
            params: {
                ticketTypeDetails: null,
                selTicketType: null
            },
            views: {
                '@root': {
                    templateUrl: 'app/tickets/templates/tickets-details.html',
                        controller: 'TicketsController',
                        controllerAs: 'vmtic'
                }
            },
            ncyBreadcrumb: {
                label: '{{vmtic.selectedTicketType}}'
            }
        });
}

module.exports = TicketsRoute;