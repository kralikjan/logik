    app.service("GeneratorService", function() {
     this.generateCode = function(colors) {
     	var code = [];
    		for (var i = 0; i < 5; i++) {
    			code[i] = colors[Math.floor(Math.random() * 8)];
    		}
    	return code;	
     };
     
     this.shuffle = function(combinations) {
    	var j, x;
    	for (var i = combinations.length; i; i--) {
    		j = Math.floor(Math.random() * i);
    	    x = combinations[i - 1];
    	    combinations[i - 1] = combinations[j];
    	    combinations[j] = x;
    	} 
     };
     
     this.isUnique = function(combination) {
    	for(var i = 0; i < combination.length; i++) {
    		for(var j = 0; j < combination.length; j++) {
    			if (combination[i] == combination[j] && i != j) {
    				return false;
    			}
    		}
    	}
    	return true;
     };
     
     this.generateUniqueCombination = function(combinations) {
    	 this.shuffle(combinations);
    	 for (var i = 0; i < combinations.length; i++) {
    		 if (this.isUnique(combinations[i])) {
    			 return combinations[i];
    		 }
    	 }
    	 return '';
     };
     
     this.getRandomCombination = function(generateUniqueCombination, allCombinations) {
			if (generateUniqueCombination) {
				var uniqueCombination = this.generateUniqueCombination(allCombinations);
				if (uniqueCombination != '') {
					return uniqueCombination;	
				} 
			} 
			return allCombinations[Math.floor(Math.random() * allCombinations.length)];
     };
    	
    });