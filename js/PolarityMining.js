
$("#waiting").hide();
$("#posSection").hide();
$("#negSection").hide();

$(":submit").click(function(){
	var posContents = $("#pos").val();
	var negContents = $("#neg").val();
	
	if(posContents.replace(/(^s*)|(s*$)/g, "").length + negContents.replace(/(^s*)|(s*$)/g, "").length ==0){
		alert("Positive AND negative contents can NOT be empty");
		return;
	}
	
	if(posContents.replace(/(^s*)|(s*$)/g, "").length ==0){
		alert("Positive contents can NOT be empty");
		return;
	}
	if(negContents.replace(/(^s*)|(s*$)/g, "").length ==0){
		alert("Negative contents can NOT be empty");
		return;
	}
	
	var animateBar=setInterval(animateProgressBar,1000)
	$("#waiting").show();
	$("#posSection").hide();
	$("#negSection").hide();
	$("#posSection div table").remove();
	$("#negSection div table").remove();
	

	
	if(containChinese(posContents) || containChinese(negContents)){

		chinese(posContents,negContents);
	}else{
		english(posContents,negContents);

	}
		
	}
)

function chinese(pos,neg){  
	//Change later
	$.getJSON("test/polarity.json",null,callback);

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
	$.getJSON("test/polarity.json",null,callback);
}


    
var preWidth = 0;
function animateProgressBar(){
	
	$("#bar").css("width",preWidth + "%");
	preWidth = (preWidth + 10) % 100 + 1;
	
}


function callback(data){
	$("#waiting").hide();
	
	$("#posSection div").append(createTable(data.positive));
	$("#negSection div").append(createTable(data.negative));
	$("#posSection").show(1000);
	$("#negSection").show(1000);
	
}



function createTable(objs){
	var tbhtml = '<table class="table table-bordered ">';
	tbhtml += '<thead><tr>';
	tbhtml += '<th>#</th><th>Word</th><th>POS</th><th>Polarity</th>';
	tbhtml += '</tr></thead>';
	tbhtml += '<tbody>';
	
	var c = 1
	for(var num in objs){
		tbhtml += '<tr>';
		
		tbhtml += '<th scope="row">' + c + '</th>';
		tbhtml += '<td>' + objs[num].word + '</td>';
		tbhtml += '<td>' + objs[num].pos + '</td>';
		tbhtml += '<td>' + objs[num].polarity + '</td>';
		
		tbhtml += '</tr>';
		c = c + 1;
	}
	tbhtml += '</tbody>';
	tbhtml += '</table>';
	return tbhtml;
	
}


