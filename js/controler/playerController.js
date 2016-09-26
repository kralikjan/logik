app.controller("PlayerController", function($scope, EvaluateService, InitService, GeneratorService) {
	
	// Initialization
	$scope.init = function() {
		$scope.colors = InitService.initColorArray('');
		$scope.possibleColors = InitService.initPossibleColors();
		$scope.controlColors = InitService.initControlColors();
		$scope.computerCombination = GeneratorService.generateCode($scope.possibleColors);
		$scope.evaluated = InitService.initColorArray('btn-gray');
		$scope.hiddenColors = ['btn-gray', 'btn-gray', 'btn-gray', 'btn-gray', 'btn-gray'];
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
		$scope.showError = EvaluateService.isNotFilledLine($scope.colors,
				$scope.activeLine);

		if (!$scope.showError) {
			var evaluation = EvaluateService.evaluate($scope.computerCombination, $scope.colors[$scope.activeLine]);
			$scope.evaluated[$scope.activeLine] = EvaluateService.getEvaluatedLine(evaluation);
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