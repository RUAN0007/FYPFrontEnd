
$("#waiting").hide();
$("#twitterTable").hide();
$("#sampleButton").click(function(){
	alert("Sample Button clicked...")
});

var animateBar=setInterval(animateProgressBar,1000)


$("#topicButton").click(function(){
	var topic = $("#topic").val();
	var period = $("")
	if(topic.replace(/(^s*)|(s*$)/g, "").length ==0){
		alert("topic can NOT be empty");
		return;
	}
	
	$("#waiting").show();
	$("#twitterTable").hide();
	$("#twitterTable table").remove();
	
	var tweets = retrieveTweets(topic,period);
	processTweets(tweets);
		
	}
);


function processTweets(tweets){
	var l = tweets.length;
	var lastTweet = false;
	
	createTableHeader();
	
	var r = 0;
	for(var k in tweets){
		var tw = tweets[k];
		$.getJSON("test/positive.json",null,function(data){
			
			var tbrowHtml = '<tr>';
			tbrowHtml += '<td>' + tw.author + '</td>';
			tbrowHtml += '<td>' + tw.time + '</td>';
			tbrowHtml += '<td>' + tw.content + '</td>';
 			tbrowHtml += '<td>';
			tbrowHtml += '<a  data-toggle="tooltip" title="' + cap(data.sentiment) + '">';
			tbrowHtml += '<img src="images/senti-icon/' + data.sentiment + '">';
			tbrowHtml +=  '</a></td> </tr>'
			$("#twitterTable table tbody").append(tbrowHtml);
			$("#twitterTable table tbody tr:last").hide();
			$("#twitterTable table tbody tr:last").slideDown(1000);
			
			r = r + 1;
			if(r == l){
				$("#waiting").hide();
			}
			
		});
	}
}

function createTableHeader(){
	var tbhtml = '<table class="table table-bordered ">';
	tbhtml += '<thead><tr>';
	tbhtml += '<th style="width:10%">Author</th>';
	tbhtml += '<th style="width:10%">Creation Time</th>';
	tbhtml += '<th style="width:70%">Content</th>'
	tbhtml += '<th style="width:10%">Sentiment</th>';
	tbhtml += '</tr></thead>';
	tbhtml += '<tbody>';
		
	tbhtml += '</tbody>';
	tbhtml += '</table>';
	$("#twitterTable").append(tbhtml);
	$("#twitterTable").show();
}

function createTable(a){
	console.log("Hi");
	
	
}

//Return an array of objects
//To be modified later
function retrieveTweets(topic,period){
	var fakeR = [];
	var obj = new Object();
	obj.author = "RPC";
	obj.time = "199401";
	obj.content = "asdsvdsfsdfdsfdsfdsfsdf";
	
	for(var i = 0;i < 200;i = i + 1){
		fakeR.push(obj);
	}
	return fakeR;
}

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


