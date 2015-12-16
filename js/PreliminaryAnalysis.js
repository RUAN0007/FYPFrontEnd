
$("#progress").hide();
$("#processing").hide();


var app1 = angular.module('myApp', []);
app1.controller('myCtrl', function($scope) {    
    

    $(":submit").click(function(){
    	var sentence = $("#sentence").val();
    	var selectedMode = $('#mode input:radio:checked').val();
    	var animateBar=setInterval(animateProgressBar,1000)
    	var result;
    	$("#progress").show();
    	$("#processing").show();
 $scope.sentiment = "asdf";
	
    	if(selectedMode == "coarse"){
    		if(containChinese(sentence)){
			
    			result = coarseChinese(sentence);
    		}else{
    			result = coarseEnglish(sentence);
			
    		}
		
    		 $scope.sentiment = "result";
		
		
    	}else{
    		if(containChinese(sentence)){
			
    			result = fineChinese(sentence);
    		}else{
    			result = fineEnglish(sentence);
    		}
    	}
    })
    
    
    
    
});



function showProgessBar(){
	$("#content").append("fsdfd");
}

var stopAnimate = false;
var preWidth = 0;
function animateProgressBar(){
	
	$("#bar").css("width",preWidth + "%");
	preWidth = (preWidth + 10) % 100 + 1;
	
}



function coarseChinese(s){  
	return "positive";
	
}

function fineChinese(s){ 
	console.log("fineChinese");
	 
}

function coarseEnglish(s){  
	console.log("coarseEnglish");
	
}

function fineEnglish(s){  
	console.log("fineEnglish");
	
}

