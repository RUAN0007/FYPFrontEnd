
$("#waiting").hide();
setInterval(animateProgressBar,1000)
    
$(":submit").click(function(){
	var paragraph = $("#paragraph").val();
	if(paragraph.replace(/(^s*)|(s*$)/g, "").length ==0){
		alert('The input paragraph can NOT be empty!'); 	
		return;
	}
	$("#waiting").show();
	

	if(containChinese(paragraph)){
	
		chinese(paragraph);
	}else{
		english(paragraph);
	
	}
	
	
})
    
var preWidth = 0;
function animateProgressBar(){
	
	$("#bar").css("width",preWidth + "%");
	preWidth = (preWidth + 10) % 100 + 1;
	
}


function getAllKeys(msg){
	var r = [];
	for (var key in msg) {
		r.push(cap(key));
	}
	return r;
}

function getAllValues(msg){
	var r = [];
	for (var key in msg) {
		r.push(msg[key]);
	}
	return r;
}

function callback(data){
	$("#waiting").hide();
	var sentis = getAllKeys(data.sentiment);
	var values = getAllValues(data.sentiment);
	setTheme();
	$("#sentiChart").highcharts({
		chart: {
		            type: 'column'
		        },
		        title: {
		            text: 'Sentiment Distribution'
		        },
		        subtitle: {
		            text: 'From SentiAgentPlus Backend'
		        },
		        xAxis: {
				categories: sentis
		        },
		        yAxis: {
		            min: 0,
		            title: {
		                text: 'Sentence Number'
		            }
		        },
		        tooltip: {
		            pointFormat: '<tr><td style="color:{series.color};padding:0">{point.key}: </td>' +
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
		            name: 'Sentiment',
				data: values

		        }]
	});
	var e = [];
	for (var key in data.emotion) {
		e.push([cap(key),data.emotion[key]]);
	}
	
	$("#emotionChart").highcharts({
	
		chart: {
		            plotBackgroundColor: null,
		            plotBorderWidth: null,
		            plotShadow: false
		        },
		        title: {
		            text: 'Emotion Distribution'
		        },
		        tooltip: {
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
		                    format: '<b>{point.name}</b>: {point.y:.f}'
		                }
		            }
		        },
		        series: [{
		            type: 'pie',
		            name: 'Emotion share',
		            data: e
		        }]
	
	});
	
}

function chinese(s){  
	//Change later
	$.getJSON("test/paragraph.json",s,callback);


	//  $.ajax({
// // 	url: "http://localhost/~ruanpingcheng/product3.json",
// 	url: "http://localhost/~ruanpingcheng/FYPFrontEnd/test/paragraph.json",
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
}

function english(s){  
	$.getJSON("test/paragraph.json",s,callback);
	
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
