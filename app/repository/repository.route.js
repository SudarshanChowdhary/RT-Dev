RepositoryRoute.$inject = ['$stateProvider', '$breadcrumbProvider'];

function RepositoryRoute($stateProvider, $breadcrumbProvider) {
    $stateProvider.state('root.repository', {
        parent: 'root',
        abstract: true,
        url: '/repository',
        resolve: { //To fetch root level test folders which are defined in RT Dashboard database
            testFolders: require('./test-folders.resolve')
             // testFolders: ["$q", "$timeout","$http", function ($q, $timeout, $http) {
             //       return $http.get("repository/testfolders").then(function(resp){ return {status:true , testFolders: resp} }, function(error){ return {status:false, testFolders: error} })
             //    }]
        },
        ncyBreadcrumb: {
            skip: true
        }
    }).state('root.repository.testfolders', {
        url: '/testfolders',
        views: {
            "@root": {
                templateUrl: 'app/repository/templates/repository.html',
                controller: 'RepositoryController',
                controllerAs: 'vmrep'
            },
            'testrepository@root.repository.testfolders': {
                templateUrl: 'app/repository/templates/test-repository-home.html'
            }
        },
        ncyBreadcrumb: {
            label: 'Repository'
        }
    }).state('root.repository.testfolders.modules', {
        url: '/:folderName/modules',
        params: {
            modulesData: null,
            folderName: null
        },
        views: {
            'testrepository@root.repository.testfolders': {
                templateUrl: 'app/repository/templates/test-repository-modules.html',
                controller: 'RepositoryModulesController',
                controllerAs: 'vmrmc'
            }
        },
        ncyBreadcrumb: {
            skip: true
        }
    }).state('root.repository.testfolders.modules.submodules', {
        url: '/bpcategory/:subFolderName',
        params: {
            subLevelData: null,
            subFolderName: null
        },
        views: {
            'testrepository@root.repository.testfolders': {
                templateUrl: 'app/repository/templates/test-repository-sub-modules.html',
                controller: 'RepositoryModulesController',
                controllerAs: 'vmrmc'
            }
        },
        ncyBreadcrumb: {
            skip: true
        }
    }).state('root.repository.testfolders.modules.submodules.scriptslist', {
        url: '/:tsFolderName/scriptslist',
        params: {
            subLevelData: null,
            tsFolderName: null
        },
        views: {
            'testrepository@root.repository.testfolders': {
                templateUrl: 'app/repository/templates/test-repository-testscripts-list.html',
                controller: 'RepositoryTestScriptListController',
                controllerAs: 'vmtsl'
            }
        },
        ncyBreadcrumb: {
           skip: true
        }
    });
}
module.exports = RepositoryRoute;