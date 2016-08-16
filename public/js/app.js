var app = angular.module('testFormApp', ['ui.bootstrap', 'ngRoute'])
	.config(function ($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'index.html',
        		controller: 'TestFormCtrl'
			})
			.when('/results', {
				templateUrl: 'views/results.html',
        		controller: 'TestFormCtrl'
			})
			.otherwise({
				redirectTo: '/'
			});
});
