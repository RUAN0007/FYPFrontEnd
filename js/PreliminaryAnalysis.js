
$("#progress").hide();
$("#processing").hide();
    
$(":submit").click(function(){
	
	
	
	var sentence = $("#sentence").val();
	var selectedMode = $('#mode input:radio:checked').val();
	var animateBar=setInterval(animateProgressBar,1000)
	var result;
	$("#progress").show();
	$("#processing").show();
	

	if(selectedMode == "coarse"){
		if(containChinese(sentence)){
		
			coarseChinese(sentence);
		}else{
			coarseEnglish(sentence);
		
		}
	
	
	
	}else{
		if(containChinese(sentence)){
		
			fineChinese(sentence);
		}else{
			fineEnglish(sentence);
		}
	}
})
    



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
	var result = 
	$.getJSON("test/positive.json",null,function(data){
		console.log(data);
		$("#p2").html(cap(data.sentiment));
	});	
	console.log("I am here");
}

function fineChinese(s){ 
	
	$.ajax({
	//url: "http://localhost/~ruanpingcheng/product3.json",
	url: "test/positive.json",
	
	type: "GET",
	dataType:"json",
		error:function(XMLHttpRequest, textStatus, errorThrown) {    
		              alert(XMLHttpRequest.status);   // 200    
		alert(errorThrown);  // SyntaxError: Unexpected end of input    
		          }    ,
	success:function(data){
			console.log(data)
	}
	});
	
	
	//console.log("fineChinese");
	 
}

function coarseEnglish(s){  
	console.log("coarseEnglish");
	
}

function fineEnglish(s){  
	console.log("fineEnglish");
	
}

