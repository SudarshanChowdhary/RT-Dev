ReportsRoute.$inject = ['$stateProvider'];

function ReportsRoute($stateProvider) {
    $stateProvider.state('root.R', {
        // parent: 'root', this is not correct if you keep parent it will go back to home alwas, not useful for brudscrum
        //abstract: true,
        url: '/reports',
        resolve: {
            reportsList: require('./reports-list.resolve')
        },
        ncyBreadcrumb: {
            skip: true
        }
    }).state('root.R.reporthome', {
        url: '/reporthome',
        views: {
            "@root": {
                templateUrl: 'app/reports/templates/report-container.html',
                controller: 'ReportsController',
                controllerAs: 'vmrep'
            },
            'reportscontainer@root.reports.reporthome': {
                templateUrl: 'app/reports/templates/reports-home.html'
            }
        },
        ncyBreadcrumb: {
            label: 'Reports'
        }
    }).state('root.R.reporthome.reportrequest', {
        url: '/reportrequest',
        params: {
            folderName: null
        },
        views: {
            "@root": {
                templateUrl: 'app/reports/templates/reports.html',
                controller: 'ReportsController',
                controllerAs: 'vmrmc'
            }
        },
        resolve: {
            reportsList: require('./reports-list.resolve')
        },
        ncyBreadcrumb: {
            //skip: true
            label: 'Reports Request'
        }
    }).state('root.R.reporthome.bhureports', {
        //url: '/bhureports',
        url: '/bhureports',
        views: {
            "@root": {
                templateUrl: 'app/reports/templates/reports-bhu-report.html',
                controller: 'BhuReportsController',
                controllerAs: 'bhureport'
            }
        },
        resolve: {
            reportsList: require('./reports-list.resolve')
        },
        ncyBreadcrumb: {
            //skip:true
            label: 'BHU Reports'
        }
    })
}
module.exports = ReportsRoute;