    app.service("EvaluateService", function() {
     this.isFilledLine = function(colors, activeLine) {
          for (i = 0; i < 5; i++) {  
            if(colors[activeLine][i].length == 0) { 
              return true;
            }
          }
          return false;
     };
     
     this.evaluate = function(evaluated, computerCombination, playerCombination) {
     	var evaluatedLine = ['btn-gray','btn-gray','btn-gray','btn-gray','btn-gray'];
     	var comparedValues1 = [];
     	var comparedValues2 = [];
     	
     	var positionOkCheckedCount = 0;
     	var positionNotOkCheckedCount = 0;
     	
     	for (i = 0; i < 5; i++) {
            if (playerCombination[i] == computerCombination[i]) {
                comparedValues1[i] = true;
                comparedValues2[i] = true;
                positionOkCheckedCount++;
            }
        }
        
        for (i = 0; i < 5; i++) {
            for (j = 0; j < 5; j++) {
                if (playerCombination[i] == computerCombination[j] && !comparedValues1[i] && !comparedValues2[j]) {
                    comparedValues1[i] = true;
                    comparedValues2[j] = true;
                    positionNotOkCheckedCount++;
                }
            }
        }
     	
     	for(i = 0; i < positionOkCheckedCount; i++) {
     		evaluatedLine[i] = 'btn-black';	
     	}
     	
     	for(i = positionOkCheckedCount; i < (positionOkCheckedCount + positionNotOkCheckedCount); i++) {
     		evaluatedLine[i] = 'btn-white';	
     	}
     	
     	return evaluatedLine;
     };
     
     this.canShowCode = function(activeLine, evaluated) {
     	if(activeLine > 9) {
     		return true;
     	}
     	for (i = 0; i < 5; i++) {
     		if(evaluated[i] != 'btn-black') {
     			return false;
     		}
     	}
     	return true;     	
     };
        
    });