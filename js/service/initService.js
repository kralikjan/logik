    app.service("InitService", function() {	
     this.initColorArray = function() {
     	var colors = [];
     	for (var i = 0; i < 10; i++) {
     		colors[i] = [];          
        	for (var j = 0; j < 5; j++) {
            	colors[i][j] = '';
          	}  
        }
     	return colors;  	
     };
     
     this.initColors = function() {
     	return ['btn-red', 'btn-green', 'btn-black', 'btn-yellow', 'btn-orange', 'btn-navy', 'btn-purple', 'btn-olive'];	
     };
     
     this.initGrayButtons = function() {
        var evaluated = [];
     	for (var i = 0; i < 10; i++) {
     		evaluated[i] = [];          
        	for (var j = 0; j < 5; j++) {
            	evaluated[i][j] = 'btn-gray';
          	}  
        }
     	return evaluated;  		
     };
     
     this.initColumns = function() {
    	 var columns = [];
    	 for (var i = 0; i < 5; i++) {
    		 columns[i] = i;
    	 }
    	 return columns;
     };
     
     this.initRows = function() {
    	 var rows = [];
    	 for (var i = 9; i >= 0; i--) {
    		 rows[9-i] = i;
    	 }
    	 return rows;
     };
     
    });