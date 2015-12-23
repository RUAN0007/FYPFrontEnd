
$("#waiting").hide();
var aliasCount = new Array();
aliasCount["t1"] = 1;
setInterval(animateProgressBar,1000)

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
	if(hasEmptyInput()) return;
	
	$("#waiting").show();
	var content = $("content").val();
	var arguments = constructArgument();
	if(containChinese(content)){

		chinese(arguments,content);
	}else{
		english(arguments,content);
	}


});

function hasEmptyInput(){
	var r = false;
	$("input ").each(function(){
		var t = $(this).val();
		if (t.replace(/(^s*)|(s*$)/g, "").length ==0){ 
			r = true;
			console.log($(this));
			
			alert('Some text input is empty!'); 	
		}
	});
	
	if($("textarea").val().replace(/(^s*)|(s*$)/g, "").length ==0){	
		r = true
		alert('Some text input is empty!'); 	
		
	}
	return r;
}

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

function english(arguments,content){  
	//Change later
	$.getJSON("test/topic.json",null,callback);

	//  $.ajax({
// // 	url: "http://localhost/~ruanpingcheng/product3.json",
// 	url: "http://localhost/~ruanpingcheng/FYPFrontEnd/test/topic.json",
//
// 	type: "GET",
// 	dataType:"json",
// 	error:function(XMLHttpRequest, textStatus, errorThrown) {
// 		alert(errorThrown);
// 		        }    ,
// 	success:function(data){
// 		console.log(data);
// 		//console.log(data.negative);
//
// 	}
// 	});
}

function chinese(arguments,content){  
	$.getJSON("test/topic.json",null,callback);
}


    
var preWidth = 0;
function animateProgressBar(){
	
	$("#bar").css("width",preWidth + "%");
	preWidth = (preWidth + 10) % 100 + 1;
	
}


function callback(data){
	$("#waiting").hide();
	var topics = [];
	var posVals = [];
	var negVals = [];
	var neuVals = [];
	var mixVals = [];
	
	for(var key in data){
		var obj = data[key];
		topics.push(obj.topic);
		posVals.push(obj.positive);
		negVals.push(obj.negative);
		neuVals.push(obj.neutral);
		mixVals.push(obj.mixed);
	}
	setTheme();
	$("#chart").highcharts({
		chart: {
		            type: 'column'
		        },
		        title: {
		            text: 'Sentiment Distribution for Each Topic'
		        },
		        subtitle: {
		            text: 'From SentiAgentPlus Backend'
		        },
		        xAxis: {
				categories: topics,
    		            title: {
    		                text: 'Topics'
    		            }
		        },
		        yAxis: {
		            min: 0,
		            title: {
		                text: 'Sentence Number'
		            }
		        },
		        tooltip: {
         		    headerFormat: '<span style="font-size:10px">Topic: {point.key}</span><table>',		
		            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
		                '<td style="padding:0"><b>{point.y:.f}</b></td></tr>',
		            footerFormat: '</table>',
		            shared: true,
		            useHTML: true
		        },
		        plotOptions: {
		            column: {
		                pointPadding: 0.2,
		                borderWidth: 0
		            }
		        },
		        series: [{
		            name: 'Positive',
				data: posVals

		       	 	},
				{
			    name: 'Negative',
			    data: negVals
				},
				{
			    name: 'Neutral',
			    data: neuVals
				},
				{
			    name: 'Mixed',
			    data: mixVals
				}
			]
	});
	
	
	var posPair = [];
	var negPair = [];
	var neuPair = [];
	var mixPair = [];
	
	for(var key in data){
		var obj = data[key];
		posPair.push([obj.topic,obj.positive]);
		negPair.push([obj.topic,obj.negative]);
		neuPair.push([obj.topic,obj.neutral]);
		mixPair.push([obj.topic,obj.mixed]);
	}
	
	//Draw the positive chart
	$("#posChart").highcharts({
	
		chart: {
		            plotBackgroundColor: null,
		            plotBorderWidth: null,
		            plotShadow: false
		        },
		        title: {
		            text: 'Positive Sentiment Distribution'
		        },
		        tooltip: {
			    headerFormat:'<b>Topic: {point.key}</b><br>',
		    	    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
		        },
		        plotOptions: {
		            pie: {
		                allowPointSelect: true,
		                cursor: 'pointer',
		                dataLabels: {
		                    enabled: true,
		                    color: '#000000',
		                    connectorColor: '#000000',
		                    format: '<b>Topic: {point.name}</b>: {point.y:.f}'
		                }
		            }
		        },
		        series: [{
		            type: 'pie',
		            name: 'Positive Sentiment',
				data: posPair
		        },
			
		]
	
	});
	
	//Draw the negative chart
	$("#negChart").highcharts({
	
		chart: {
		            plotBackgroundColor: null,
		            plotBorderWidth: null,
		            plotShadow: false
		        },
		        title: {
		            text: 'Negative Sentiment Distribution'
		        },
		        tooltip: {
			    headerFormat:'<b>Topic: {point.key}</b><br>',
		    	    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
		        },
		        plotOptions: {
		            pie: {
		                allowPointSelect: true,
		                cursor: 'pointer',
		                dataLabels: {
		                    enabled: true,
		                    color: '#000000',
		                    connectorColor: '#000000',
		                    format: '<b>Topic: {point.name}</b>: {point.y:.f}'
		                }
		            }
		        },
		        series: [{
		            type: 'pie',
		            name: 'Negative Sentiment',
				data: negPair
		        },
			
		]
	
	});
	
	//Draw the neutral chart
	$("#neuChart").highcharts({
	
		chart: {
		            plotBackgroundColor: null,
		            plotBorderWidth: null,
		            plotShadow: false
		        },
		        title: {
		            text: 'Neutral Sentiment Distribution'
		        },
		        tooltip: {
			    headerFormat:'<b>Topic: {point.key}</b><br>',
		    	    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
		        },
		        plotOptions: {
		            pie: {
		                allowPointSelect: true,
		                cursor: 'pointer',
		                dataLabels: {
		                    enabled: true,
		                    color: '#000000',
		                    connectorColor: '#000000',
		                    format: '<b>Topic: {point.name}</b>: {point.y:.f}'
		                }
		            }
		        },
		        series: [{
		            type: 'pie',
		            name: 'Neutral Sentiment',
				data: negPair
		        },
			
		]
	
	});
	
	//Draw the neutral chart
	$("#mixChart").highcharts({
	
		chart: {
		            plotBackgroundColor: null,
		            plotBorderWidth: null,
		            plotShadow: false
		        },
		        title: {
		            text: 'Mixed Sentiment Distribution'
		        },
		        tooltip: {
			    headerFormat:'<b>Topic: {point.key}</b><br>',
		    	    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
		        },
		        plotOptions: {
		            pie: {
		                allowPointSelect: true,
		                cursor: 'pointer',
		                dataLabels: {
		                    enabled: true,
		                    color: '#000000',
		                    connectorColor: '#000000',
		                    format: '<b>Topic: {point.name}</b>: {point.y:.f}'
		                }
		            }
		        },
		        series: [{
		            type: 'pie',
		            name: 'Mixed Sentiment',
				data: mixPair
		        },
			
		]
	
	});
	
}


function setTheme(){
	Highcharts.theme = {
		colors: ["#DDDF0D", "#55BF3B", "#DF5353", "#7798BF", "#aaeeee", "#ff0066", "#eeaaee",
			"#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
		chart: {
			backgroundColor: {
				linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
				stops: [
					[0, 'rgb(48, 48, 96)'],
					[1, 'rgb(0, 0, 0)']
				]
			},
			borderColor: '#000000',
			borderWidth: 2,
			className: 'dark-container',
			plotBackgroundColor: 'rgba(255, 255, 255, .1)',
			plotBorderColor: '#CCCCCC',
			plotBorderWidth: 1
		},
		title: {
			style: {
				color: '#C0C0C0',
				font: 'bold 26px "Trebuchet MS", Verdana, sans-serif'
			}
		},
		subtitle: {
			style: {
				color: '#666666',
				font: 'bold 20px "Trebuchet MS", Verdana, sans-serif'
			}
		},
		xAxis: {
			gridLineColor: '#333333',
			gridLineWidth: 1,
			labels: {
				style: {
					color: '#A0A0A0'
				}
			},
			lineColor: '#A0A0A0',
			tickColor: '#A0A0A0',
			title: {
				style: {
					color: '#CCC',
					fontWeight: 'bold',
					fontSize: '18px',
					fontFamily: 'Trebuchet MS, Verdana, sans-serif'

				}
			}
		},
		yAxis: {
			gridLineColor: '#333333',
			labels: {
				style: {
					color: '#A0A0A0'
				}
			},
			lineColor: '#A0A0A0',
			minorTickInterval: null,
			tickColor: '#A0A0A0',
			tickWidth: 1,
			title: {
				style: {
					color: '#CCC',
					fontWeight: 'bold',
					fontSize: '18px',
					fontFamily: 'Trebuchet MS, Verdana, sans-serif'
				}
			}
		},
		tooltip: {
			backgroundColor: 'rgba(0, 0, 0, 0.75)',
			style: {
				color: '#F0F0F0'
			}
		},
		toolbar: {
			itemStyle: {
				color: 'silver'
			}
		},
		plotOptions: {
			line: {
				dataLabels: {
					color: '#CCC'
				},
				marker: {
					lineColor: '#333'
				}
			},
			spline: {
				marker: {
					lineColor: '#333'
				}
			},
			scatter: {
				marker: {
					lineColor: '#333'
				}
			},
			candlestick: {
				lineColor: 'white'
			}
		},
		legend: {
			itemStyle: {
				font: '12pt Trebuchet MS, Verdana, sans-serif',
				color: '#A0A0A0'
			},
			itemHoverStyle: {
				color: '#FFF'
			},
			itemHiddenStyle: {
				color: '#444'
			}
		},
		credits: {
			style: {
				color: '#666'
			}
		},
		labels: {
			style: {
				color: '#CCC'
			}
		},

		navigation: {
			buttonOptions: {
				symbolStroke: '#DDDDDD',
				hoverSymbolStroke: '#FFFFFF',
				theme: {
					fill: {
						linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
						stops: [
							[0.4, '#606060'],
							[0.6, '#333333']
						]
					},
					stroke: '#000000'
				}
			}
		},

		// scroll charts
		rangeSelector: {
			buttonTheme: {
				fill: {
					linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
					stops: [
						[0.4, '#888'],
						[0.6, '#555']
					]
				},
				stroke: '#000000',
				style: {
					color: '#CCC',
					fontWeight: 'bold'
				},
				states: {
					hover: {
						fill: {
							linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
							stops: [
								[0.4, '#BBB'],
								[0.6, '#888']
							]
						},
						stroke: '#000000',
						style: {
							color: 'white'
						}
					},
					select: {
						fill: {
							linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
							stops: [
								[0.1, '#000'],
								[0.3, '#333']
							]
						},
						stroke: '#000000',
						style: {
							color: 'yellow'
						}
					}
				}
			},
			inputStyle: {
				backgroundColor: '#333',
				color: 'silver'
			},
			labelStyle: {
				color: 'silver'
			}
		},

		navigator: {
			handles: {
				backgroundColor: '#666',
				borderColor: '#AAA'
			},
			outlineColor: '#CCC',
			maskFill: 'rgba(16, 16, 16, 0.5)',
			series: {
				color: '#7798BF',
				lineColor: '#A6C7ED'
			}
		},

		scrollbar: {
			barBackgroundColor: {
					linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
					stops: [
						[0.4, '#888'],
						[0.6, '#555']
					]
				},
			barBorderColor: '#CCC',
			buttonArrowColor: '#CCC',
			buttonBackgroundColor: {
					linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
					stops: [
						[0.4, '#888'],
						[0.6, '#555']
					]
				},
			buttonBorderColor: '#CCC',
			rifleColor: '#FFF',
			trackBackgroundColor: {
				linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
				stops: [
					[0, '#000'],
					[1, '#333']
				]
			},
			trackBorderColor: '#666'
		},

		// special colors for some of the
		legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
		background2: 'rgb(35, 35, 70)',
		dataLabelsColor: '#444',
		textColor: '#C0C0C0',
		maskColor: 'rgba(255,255,255,0.3)'
	};

	// Apply the theme
	var highchartsOptions = Highcharts.setOptions(Highcharts.theme);
}
