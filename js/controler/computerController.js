app.controller("ComputerController", function($scope, $http, EvaluateService, InitService, GeneratorService) {
	
	// Initialization
	$scope.init = function() {
		$scope.colors = InitService.initColorArray('btn-gray');
		$scope.possibleColors = InitService.initPossibleColors();
		$scope.controlColors = InitService.initControlColors();
		$scope.computerCombination = GeneratorService.generateCode($scope.possibleColors);
		$scope.evaluated = InitService.initGrayButtons();
		$scope.hiddenColors = InitService.initGrayButtons();
		$scope.activeLine = -1;	
		$scope.disableButton = false;
	};
	
	$scope.selectedEvaluation = 'btn-gray';
	$scope.selectedEvaluation;
	$scope.showError = false;
	$scope.columns = InitService.initColumns();
	$scope.rows = InitService.initRows();
	$scope.init();
	
	// Functions
	$scope.selectEvaluation = function(evaluation) {
		$scope.selectedEvaluation = evaluation;
	};

	$scope.setEvaluation = function(i, j) {
		$scope.evaluated[i][j] = $scope.selectedEvaluation;
	};

	$scope.evaluateComputer= function() {
		var positionOkCheckedCount = 0;
		var positionNotOkCheckedCount = 0;
		if ($scope.activeLine > -1) {
			for (var i = 0; i < 5; i++) {
				if($scope.evaluated[$scope.activeLine][i] == 'btn-black') {
					positionOkCheckedCount++;
				}
			}
			
			for (var i = 0; i < 5; i++) {
				if($scope.evaluated[$scope.activeLine][i] == 'btn-white') {
					positionNotOkCheckedCount++;
				}
			}
		
			var newAllCombinations = [];
			var j = 0;
			for (var i = 0; i < $scope.allCombinations.length; i++) {
				var evaluated = EvaluateService.evaluatePlayer($scope.colors[$scope.activeLine], $scope.allCombinations[i]);
				if((evaluated.positionOkCheckedCount == positionOkCheckedCount && evaluated.positionNotOkCheckedCount == positionNotOkCheckedCount) && $scope.colors[$scope.activeLine] != $scope.allCombinations[i]) {
					newAllCombinations[j] = $scope.allCombinations[i];
					j++;
				}
			}
			$scope.allCombinations = newAllCombinations;
		}
		$scope.colors[$scope.activeLine + 1] = $scope.allCombinations[Math.floor(Math.random() * $scope.allCombinations.length)];
		$scope.activeLine++;
	};
	
	$scope.clear = function(i, j) {
		$scope.evaluated[i][j] = 'btn-gray';
	};
	
	var url = "allCombinations.json";
	$http.get(url).success( function(response) {
   		$scope.allCombinations = response;
	});
	

});