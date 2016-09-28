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
     
     this.generateNonUniqueCombination = function(combinations) {
    	 this.shuffle(combinations);
    	 for (var i = 0; i < combinations.length; i++) {
    		 if (!this.isUnique(combinations[i])) {
    			 return combinations[i];
    		 }
    	 }
    	 return '';
     };
     
     this.generateCombinationWithColor = function(combinations, color) {
    	 this.shuffle(combinations);
    	 for (var i = 0; i < combinations.length; i++) {
    		 if (combinations[i].indexOf(color) > 0) {
    			 return combinations[i];
    		 }
    	 }
    	 return '';
     };
     
     this.getRandomCombination = function(generateUniqueCombination, generateNonUniqueCombination, allCombinations, usedColors) {
    	 	var allColors = ['btn-red', 'btn-green', 'btn-black', 'btn-yellow', 'btn-orange', 'btn-navy', 'btn-purple', 'btn-olive'];
			if (generateUniqueCombination) {
				var combination = this.generateUniqueCombination(allCombinations);
				if (combination != '') {
					return combination;	
				} 
			} else if (generateNonUniqueCombination) {
				var combination = this.generateNonUniqueCombination(allCombinations);
				if (combination != '') {
					return combination;	
				} 
			} else {
				var notUsedColor = '';
				for (var i = 0; i < allColors.length; i++) {
					if (usedColors.indexOf(allColors[i]) < 0) {
						notUsedColor = allColors[i];
						break;
					}
				}
				
				if(notUsedColor.length > 0) {
					var combination = this.generateCombinationWithColor(allCombinations, notUsedColor);
					if (combination != '') {
						return combination;	
					} 	
				}
			}
			return allCombinations[Math.floor(Math.random() * allCombinations.length)];
     };
    	
    });