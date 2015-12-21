
$("#waiting").hide();


$(":submit").click(function(){
	$("#waiting").show();

	if(containChinese(posContents) || containChinese(negContents)){

		chinese(posContents,negContents);
	}else{
		english(posContents,negContents);

	}
		
	}
)

function chinese(pos,neg){  
	//Change later
	//$.getJSON("test/polarity.json",null,callback);

	//  $.ajax({
// // 	url: "http://localhost/~ruanpingcheng/product3.json",
// 	url: "http://localhost/~ruanpingcheng/FYPFrontEnd/test/polarity.json",
//
// 	type: "GET",
// 	dataType:"json",
// 	error:function(XMLHttpRequest, textStatus, errorThrown) {
// 		alert(errorThrown);
// 		        }    ,
// 	success:function(data){
// 		console.log(data.positive);
// 		console.log(data.negative);
//
// 	}
// 	});
}

function english(pos,neg){  
	//$.getJSON("test/polarity.json",null,callback);
}


    
var preWidth = 0;
function animateProgressBar(){
	
	$("#bar").css("width",preWidth + "%");
	preWidth = (preWidth + 10) % 100 + 1;
	
}


function callback(data){
	
	
}

