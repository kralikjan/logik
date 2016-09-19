app.controller("ComputerController", function($scope, $http, EvaluateService, InitService, GeneratorService) {
	
	// Initialization
	
	$scope.loadCombinations = function() {
		var url = "allCombinations.json";
		$http.get(url).success( function(response) {
			$scope.allCombinations = response;
   		
		});
	};
	
	$scope.init = function() {
		$scope.colors = InitService.initColorArray('');
		$scope.possibleColors = InitService.initPossibleColors();
		$scope.evaluationColors = InitService.initControlColors();
		$scope.computerCombination = GeneratorService.generateCode($scope.possibleColors);
		$scope.evaluated = InitService.initColorArray('btn-gray');
		$scope.controlColors = ['btn-gray', 'btn-gray', 'btn-gray', 'btn-gray', 'btn-gray'];
		$scope.activeLine = -1;	
		$scope.disableButton = false;
		$scope.showError = false;
		$scope.loadCombinations();
		$scope.selectedEvaluation = 'btn-gray';
		$scope.selectedColor;
		$scope.columns = InitService.initColumns();
		$scope.rows = InitService.initRows();
		$scope.generateUniqueCombination = true;
	};
	

	$scope.init();
	
	// Functions
	$scope.selectEvaluation = function(evaluation) {
		$scope.selectedEvaluation = evaluation;
	};
	
	$scope.selectColor = function(color) {
		$scope.selectedColor = color;
	};
	
	$scope.setColor = function(i) {
		$scope.controlColors[i] = $scope.selectedColor;
	};

	$scope.setEvaluation = function(i, j) {
		$scope.evaluated[i][j] = $scope.selectedEvaluation;
	};

	$scope.evaluateComputer= function() {
		var positionOkCheckedCount = 0;
		var positionNotOkCheckedCount = 0;
		if ($scope.activeLine > -1) {
			positionOkCheckedCount = EvaluateService.countPosition($scope.evaluated[$scope.activeLine], 'btn-black');
			positionNotOkCheckedCount = EvaluateService.countPosition($scope.evaluated[$scope.activeLine], 'btn-white');
			$scope.allCombinations = EvaluateService.computeNewCombinations($scope.allCombinations, $scope.colors[$scope.activeLine], positionOkCheckedCount, positionNotOkCheckedCount);
		}
		
		if ($scope.allCombinations.length != 0) {
			$scope.colors[$scope.activeLine + 1] = GeneratorService.getRandomCombination($scope.generateUniqueCombination, $scope.allCombinations);
		} else if(positionOkCheckedCount != 5) {
			$scope.showError = true;	
		}
		
		if (($scope.activeLine != -1 && EvaluateService.canShowCode($scope.activeLine,
				$scope.evaluated[$scope.activeLine])) || $scope.allCombinations.length == 0) {
			$scope.activeLine = -1;
			$scope.disableButton = true;
		} else {
			$scope.activeLine++;
			if ($scope.activeLine == 2) {
				$scope.generateUniqueCombination = false;
			}
		}
	};
	
	$scope.clear = function(i, j) {
		$scope.evaluated[i][j] = 'btn-gray';
	};

});