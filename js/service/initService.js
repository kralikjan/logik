    app.service("InitService", function() {	
     this.initColorArray = function() {
     	var colors = [];
     	for (i = 0; i < 10; i++) {
     		colors[i] = [];          
        	for (j = 0; j < 5; j++) {
            	colors[i][j] = '';
          	}  
        }
     	return colors;  	
     };
     
     this.initColors = function() {
     	return ['btn-red', 'btn-green', 'btn-black', 'btn-yellow', 'btn-orange', 'btn-navy', 'btn-purple', 'btn-olive'];	
     };
     
     this.initEvaluated = function() {
        var evaluated = [];
     	for (i = 0; i < 10; i++) {
     		evaluated[i] = [];          
        	for (j = 0; j < 5; j++) {
            	evaluated[i][j] = 'btn-gray';
          	}  
        }
     	return evaluated;  		
     }
     
    });