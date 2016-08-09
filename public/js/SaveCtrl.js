angular.module('testFormApp').controller('SaveCtrl', function($scope,$uibModal,$uibModalInstance,$http, testItem) {	
	console.log('SaveCtrl testItem=', testItem);
	$scope.test = testItem || {};
	$scope.test.date = new Date();


	$scope.save = function() {
		console.log('save()\t test=%o', $scope.test);
		var test = $scope.test;
		var saveModalInstance = $uibModal.open({					// We create a new modal to confirm if the user really wants to submit
			templateUrl: 'views/confirm.html',
			controller: function($scope,$uibModalInstance) {
				$scope.test = test;
				$scope.yes = function() {
					$uibModalInstance.close();				// We resolve the promise
				};
				$scope.no = function() {
					$uibModalInstance.dismiss();			// We reject the promise
				};
			}
		});
		saveModalInstance.result.then(function() {				// We only submit if the result promise is resolved, meaning the user clicked yes
			$http.post('/tests', $scope.test).then(function(response) {
				console.log('post /tests: ', response.data);
				$uibModalInstance.close();
			});
		});
	};

	$scope.cancel = function() {
		$uibModalInstance.dismiss();
	};

	
});
