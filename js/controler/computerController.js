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
	
	$scope.selectedEvaluation;
	$scope.showError = false;
	$scope.columns = InitService.initColumns();
	$scope.rows = InitService.initRows();
	$scope.init();
	$scope.test = 'abc';
	
	// Functions
	$scope.selectEvaluation = function(evaluation) {
		$scope.selectedEvaluation = evaluation;
	};

	$scope.setEvaluation = function(i, j) {
		$scope.evaluated[i][j] = $scope.selectedEvaluation;
	};

	$scope.evaluateComputer= function(activeLine) {
		$scope.colors[activeLine + 1] = $scope.allCombinations[Math.floor(Math.random() * 32768)];
		$scope.activeLine++;
	};
	
	$scope.clear = function(i, j) {
		$scope.colors[i][j] = 'btn-gray';
	};
	
	var url = "allCombinations.json";
	$http.get(url).success( function(response) {
   		$scope.allCombinations = response;
	});
	

});