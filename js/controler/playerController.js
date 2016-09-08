app.controller("PlayerController", function($scope, EvaluateService, InitService, GeneratorService) {
	
	// Initialization
	$scope.init = function() {
		$scope.colors = InitService.initColorArray('');
		$scope.possibleColors = InitService.initPossibleColors();
		$scope.controlColors = InitService.initControlColors();
		$scope.computerCombination = GeneratorService.generateCode($scope.possibleColors);
		$scope.evaluated = InitService.initGrayButtons();
		$scope.hiddenColors = InitService.initGrayButtons();
		$scope.activeLine = 0;	
		$scope.disableButton = false;
	};
	
	$scope.selectedColor;
	$scope.showError = false;
	$scope.columns = InitService.initColumns();
	$scope.rows = InitService.initRows();
	$scope.init();
	
	// Functions
	$scope.selectColor = function(color) {
		$scope.selectedColor = color;
	};

	$scope.setColor = function(i, j) {
		$scope.colors[i][j] = $scope.selectedColor;
	};

	$scope.evaluatePlayer = function() {
		$scope.showError = EvaluateService.isFilledLine($scope.colors,
				$scope.activeLine);

		if (!$scope.showError) {
			$scope.evaluated[$scope.activeLine] = EvaluateService.evaluatePlayer($scope.evaluated, $scope.computerCombination, $scope.colors[$scope.activeLine]);
			if (EvaluateService.canShowCode($scope.activeLine,
					$scope.evaluated[$scope.activeLine])) {
				$scope.hiddenColors = $scope.computerCombination;
				$scope.activeLine = -1;
				$scope.disableButton = true;
			} else {
				$scope.activeLine++;
			}
		}
	};
	
	$scope.clear = function(i, j) {
		$scope.colors[i][j] = '';
	};
	


});