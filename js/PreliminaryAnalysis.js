
$("#waiting").hide();
$("#senti").hide();
$("#emotion").hide();
    
$(":submit").click(function(){
	$("#waiting").show();
	$("#senti").hide();
	$("#emotion").hide();
		
	var sentence = $("#sentence").val();
	var selectedMode = $('#mode input:radio:checked').val();
	var animateBar=setInterval(animateProgressBar,1000)
	var result;
	

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

function sentiCallback(data){
	$("#waiting").hide();
	$("#emotion").hide();
	
	var sentiment = data.sentiment;//to be changed later
	var imgSrc = "images/sentiment/" + sentiment + ".jpg";
	
	$("#senti img").attr("src",imgSrc);
	$("#senti h1").text(cap(sentiment));
	$("#senti").fadeIn(1000);
	
}

function emotionCallback(data){
	$("#waiting").hide();
	$("#senti").hide();
	
	sentiment = data.sentiment;
	emotions = data.emotions;
	
	var imgSrc = "images/sentiment/" + sentiment + ".jpg";
	
	$("#emotion img").attr("src",imgSrc);
	$("#emotion h1").text(cap(sentiment));	
	
	$("#emotion div div").remove();
	
	emotions.forEach(function(value, index, ar){
		
		var item = '<div class="col-xs-3">';


		item += "<img src='images/emotion/" + value   +  ".jpeg'  width='100' height='100'/>";
		item += "<h3 align='center' style='font-style:italic'>";
		item += cap(value) + "</h3>";
		item += "</div>"
	
		$("#emotion div.row").append(item);
		
	})
	
	
	
	$("#emotion").fadeIn(1000);
	
}

function coarseChinese(s){  
	//Change later
	$.getJSON("test/positive.json",s,sentiCallback);
}

function fineChinese(s){ 
	
	
	$.getJSON("test/emotion.json",s,emotionCallback);
	
	// $.ajax({
// // 	url: "http://localhost/~ruanpingcheng/product3.json",
// 	url: "http://localhost/~ruanpingcheng/FYPFrontEnd/test/emotion.json",
//
// 	type: "GET",
// 	dataType:"json",
// 	error:function(XMLHttpRequest, textStatus, errorThrown) {
// 		alert(errorThrown);
// 		        }    ,
// 	success:function(data){
// 		console.log(data.sentiment);
// 		console.log(data.emotions);
//
// 	}
// 	});

	
	//console.log("fineChinese");
	 
}

function coarseEnglish(s){  
	$.getJSON("test/negative.json",s,sentiCallback);
	
}

function fineEnglish(s){  
	$.getJSON("test/emotion.json",s,emotionCallback);
	
}

