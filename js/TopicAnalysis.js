
$("#waiting").hide();
var aliasCount = new Array();
aliasCount["t1"] = 1;

addOnClickRemoveAnimation();
addOnClickAddAnimation("t1");


$("#addTopic").click(function(){
	
	var topicCount = getLen();
	var topicId = "t" + (topicCount + 1);
	aliasCount[topicId] = 1;
	var tphtml = prepareTopicHTML(topicId);
	
	$(tphtml).insertAfter($("div.topic:last"));
	$("#" + topicId).hide();
	$("#" + topicId).slideDown(1000);
	addOnClickAddAnimation(topicId);
	addOnClickRemoveAnimation();
	updateTopicName();
	
});  

  //
$("#paragraph").click(function(){
	$("#waiting").show();
	alert(constructArgument());

	// if(containChinese(posContents) || containChinese(negContents)){
//
// 		chinese(posContents,negContents);
// 	}else{
// 		english(posContents,negContents);
// 	}


})

//return a list of json objects
//For each object, the key is the topic name
//the value is an array of aliases
function constructArgument(){
	
	var parameters = [];
	$("div.topic").each(function(){
		var topicAliasPair = new Object();
		var topic = $("input:first",this).val();
		topicAliasPair[topic] = [];
		$("input",this).each(function(){
			topicAliasPair[topic].push($(this).val());
		});
		parameters.push(topicAliasPair);
	});
	return JSON.stringify(parameters);
}

//
function updateTopicName(){
	$("div.topic").each(function(id){
		$("div.input-group-addon:first",this).text("Topic " + (id+1));
	});
}

function prepareTopicHTML(topicId){
	var result =  '<div class="topic" id="' + topicId + '">';
	result += '<form class="form-inline">';
	result += '<div class="form-group">';
	result += '<div class="input-group">';
	result += '<div class="input-group-addon">' + topicId + '</div>';
	result += ' <input type="text" class="form-control"></div></div>';
	result += '<a  data-toggle="tooltip" title="Remove this topic" >';
	result += '<span class="glyphicon glyphicon-remove" aria-hidden="true" rm="' + topicId + '">';
	result += ' </form></span></a>';
	
	result += prepareAliasHTML(topicId,"1");
	result += '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
	result += '<a  data-toggle="tooltip" title="Add a new alias">';
	result += '<span  class="glyphicon glyphicon-plus" aria-hidden="true" add="' + topicId + '">';
	result += '</span></a></div>';
	return result;
}


//Return the number of elements in aliasCount
function getLen(){
	var count = 0;
	for(var key in aliasCount){
		count = count + 1;
	}
	return count;
}
 
//Add on the animation effect to remove aliases
function addOnClickRemoveAnimation(){
	  $(".glyphicon-remove").each(function(){
	  		$(this).click(function(){
	  			 var rmhtml = ($(this).attr("rm"));
	  			$("#" + rmhtml).slideUp(1000,function(){
	  			       $("#" + rmhtml).remove();
	  			})
	  		})
	
	  	}
	   );
  }

//Add on the animation effect to add aliases
  function addOnClickAddAnimation(topicId){
	  $("#"+ topicId +" .glyphicon-plus").each(function(){
	  		$(this).click(function(){
	 			var topicId = ($(this).attr("add"));
	 			aliasCount[topicId] = aliasCount[topicId] + 1;
	 			var aliasId = aliasCount[topicId]
			
			
	 			var alhtml = prepareAliasHTML(topicId,aliasId);
	 			$(alhtml).insertAfter($("#" + topicId + " form:last"));
	 			addOnClickRemoveAnimation()
	 			$("#" + topicId + "_" + aliasId + "_form").hide();
			
	   			$("#" + topicId + "_" + aliasId + "_form").slideDown(1000);		
	  		
			})	
	 });
  }
function prepareAliasHTML(topicId,aliasId){
	
	var aliasCount = "Alias ";
	var taID = topicId + "_" + aliasId + "_form";
	
	var result = '<form  class="form-inline" ';
	result +=  'id="' + taID + '">';
	result += '<div class="form-group">';
	result += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
	result += '<div class="input-group">';
	result += '<div class="input-group-addon">' + aliasCount + '</div>';
	result += '<input type="text" class="form-control" id="' + aliasId + '">';
	result += '</div></div>';
	result += '<a data-toggle="tooltip" title="Remove this alias">';
 	result += '<span class="glyphicon glyphicon-remove" aria-hidden="true" rm="' + taID;
	result += '"></span></a></form>';
	
	return result;


}

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

