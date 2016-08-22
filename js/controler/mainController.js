app.controller("MainController", function($scope, EvaluateService, InitService, GeneratorService) {
	// Initialization
	$scope.selectedColor;
	$scope.showError = false;
	$scope.activeLine = 0;
	$scope.colors = InitService.initColorArray();
	$scope.possibleColors = InitService.initColors();
	$scope.computerCombination = GeneratorService.generateCode($scope.possibleColors);
	$scope.hiddenColors = [ 'btn-gray', 'btn-gray', 'btn-gray', 'btn-gray', 'btn-gray' ];
	$scope.evaluated = InitService.initEvaluated();
	$scope.disableButton = false;

	// Functions
	$scope.selectColor = function(color) {
		$scope.selectedColor = color;
	};

	$scope.setColor = function(i, j) {
		$scope.colors[i][j] = $scope.selectedColor;
	};

	$scope.evaluate = function() {
		$scope.showError = EvaluateService.isFilledLine($scope.colors,
				$scope.activeLine);

		if (!$scope.showError) {
			$scope.evaluated[$scope.activeLine] = EvaluateService.evaluate($scope.evaluated, $scope.computerCombination, $scope.colors[$scope.activeLine]);
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