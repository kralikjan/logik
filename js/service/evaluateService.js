    app.service("EvaluateService", function() {
     this.isNotFilledLine = function(colors, activeLine) {
          for (var i = 0; i < 5; i++) {  
            if(colors[activeLine][i].length == 0) { 
              return true;
            }
          }
          return false;
     };
     
     this.evaluate = function(computerCombination, playerCombination) {
     	var comparedValues1 = [];
     	var comparedValues2 = [];
     	
     	var positionOkCheckedCount = 0;
     	var positionNotOkCheckedCount = 0;
     	
     	for (var i = 0; i < 5; i++) {
            if (playerCombination[i] == computerCombination[i]) {
                comparedValues1[i] = true;
                comparedValues2[i] = true;
                positionOkCheckedCount++;
            }
        }
        
        for (var i = 0; i < 5; i++) {
            for (var j = 0; j < 5; j++) {
                if (playerCombination[i] == computerCombination[j] && !comparedValues1[i] && !comparedValues2[j]) {
                    comparedValues1[i] = true;
                    comparedValues2[j] = true;
                    positionNotOkCheckedCount++;
                }
            }
        }
     	
     	return {"positionOkCheckedCount": positionOkCheckedCount, "positionNotOkCheckedCount": positionNotOkCheckedCount};
     };
     
     this.getEvaluatedLine = function(evaluation) {
    	var evaluatedLine = ['btn-gray','btn-gray','btn-gray','btn-gray','btn-gray'];
    	var positionOkCheckedCount = evaluation.positionOkCheckedCount;
    	var positionNotOkCheckedCount =  evaluation.positionNotOkCheckedCount;
      	for(var i = 0; i < positionOkCheckedCount; i++) {
     		evaluatedLine[i] = 'btn-black';	
     	}
     	
     	for(i = positionOkCheckedCount; i < (positionOkCheckedCount + positionNotOkCheckedCount); i++) {
     		evaluatedLine[i] = 'btn-white';	
     	}
     	
     	return evaluatedLine;
     };
     
     this.canShowCode = function(activeLine, evaluated) {
     	if(activeLine > 8) {
     		return true;
     	}
     	for (var i = 0; i < 5; i++) {
     		if(evaluated[i] != 'btn-black') {
     			return false;
     		}
     	}
     	return true;     	
     };
     
     this.countPosition = function(evalutation, positionColor) {
    	var count = 0;
			for (var i = 0; i < 5; i++) {
				if(evalutation[i] == positionColor) {
					count++;
				}
			}
		return count;
     };
     
     this.computeNewCombinations = function(allCombinations, checkedCombination, positionOkCheckedCount, positionNotOkCheckedCount) {
			var newAllCombinations = [];
			var j = 0;
			for (var i = 0; i < allCombinations.length; i++) {
				var evaluated = this.evaluate(checkedCombination, allCombinations[i]);
				if((evaluated.positionOkCheckedCount == positionOkCheckedCount && evaluated.positionNotOkCheckedCount == positionNotOkCheckedCount) && checkedCombination != allCombinations[i]) {
					newAllCombinations[j] = allCombinations[i];
					j++;
				}
			}
			return newAllCombinations;
     };
        
    });