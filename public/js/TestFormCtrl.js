angular.module('testFormApp').controller('TestFormCtrl', function($scope, $http,$uibModal) {
	
	function getTests() {
		$http.get('/tests').then(function(response) {
			$scope.tests = response.data;
		});
	}
	getTests();
	
	$scope.loadTest = function(test) {	
		var modalInstance = $uibModal.open({
			templateUrl: 'views/form.html',
			controller: 'SaveCtrl',
			resolve: {
				testItem: function() {return test;}
			}
		});
		modalInstance.result.then(function() {
			getTests();
		});
	};
});