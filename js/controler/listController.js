app.controller("ListController", function($scope, $http, EvaluateService, InitService, GeneratorService) {
	
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
		$scope.activeLine = -1;	
		$scope.disableButton = false;
		$scope.showError = false;
		$scope.selectedEvaluation = 'btn-gray';
		$scope.selectedColor;
		$scope.columns = InitService.initColumns();
		$scope.rows = InitService.initRows();
		$scope.generateUniqueCombination = true;
		$scope.generateNonUniqueCombination = false;
		$scope.loadCombinations();
	};
	
	$scope.init();
	
	// Functions
	$scope.selectEvaluation = function(evaluation) {
		$scope.selectedEvaluation = evaluation;
	};
	
	$scope.selectColor = function(color) {
		$scope.selectedColor = color;
	};
	
	$scope.setColor = function(i,j) {
		$scope.colors[i][j] = $scope.selectedColor;
	};

	$scope.setEvaluation = function(i, j) {
		$scope.evaluated[i][j] = $scope.selectedEvaluation;
	};

	$scope.evaluate= function() {
		var line = 0;
		$scope.temporaryCombinations = $scope.allCombinations;
		while(!EvaluateService.isNotFilledLine($scope.colors, line) && line < 10) {
			var positionOkCheckedCount = EvaluateService.countPosition($scope.evaluated[line], 'btn-black');
			var positionNotOkCheckedCount = EvaluateService.countPosition($scope.evaluated[line], 'btn-white');
			
			if (positionOkCheckedCount == 5) {
				$scope.temporaryCombinations = [];
				break;
			}
			
			$scope.temporaryCombinations = EvaluateService.computeNewCombinations($scope.temporaryCombinations, $scope.colors[line], positionOkCheckedCount, positionNotOkCheckedCount);
			line++;
		}
	};
	
	$scope.clearEvaluation = function(i, j) {
		$scope.evaluated[i][j] = 'btn-gray';
	};
	
	$scope.clearColor= function(i, j) {
		$scope.colors[i][j] = '';
	};
	
	$scope.range = function(min, max, maxLength) {
	    if (max > maxLength) {
	    	return [0];
	    }
	    var input = [];
	    for (var i = min; i <= max; i++) {
	        input.push(i);
	    }
	    return input;
	};

});