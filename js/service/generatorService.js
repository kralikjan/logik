    app.service("GeneratorService", function() {
     this.generateCode = function(colors) {
     	var code = [];
    		for (var i = 0; i < 5; i++) {
    			code[i] = colors[Math.floor(Math.random() * 8)];
    		}
    	return code;	
     };
    	
    });