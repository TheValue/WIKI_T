	/*
	 * draw Chart
	 */
	
	/*  chart 호출
	var chartObj = gfn_drawChart({
				chartOption: { //----------------------- 필수 입력
					divId: "graphArea",					// div id (필수 값)
					type: "combi",  					// 챠트 전체 type (line / column / scatter / combi / ....)
					zoomType: "x",						// zoom type (선택) : null 인 경우 default "x" (x / y / xy)	
					fontType: "돋움",					// 챠트 전체 font type : null 인 경우 default "돋움"
        			marginLeft: 80,						// master-detail chart 인 경우 사용
					marginRight: 80,					// master-detail chart 인 경우 사용
					selectionEventUse: true				// master-detail chart 인 경우 사용
				}
				,seriesOption: {
					name: ["name1", "name2"],			// 시리즈 별 name : array
					data: [data1, data2],				// 시리즈 별 data : array
					type: ["line", "area"],				// 시리즈 별 type : array
					tickData: setPosition.xAxisLabel, 	// tickposition 을 이용하여 특정 카테고리만 출력 시 사용(data 와 같이 전달)
					pointStart: 20,						// category start point (detail)
					firstHighlight: true				// default : null , 시리즈 중 첫 시리즈에 하이라이트 주고자 할 때 사용 (한 라인만 부각되어 보이게)	
				}
				,xAxisOption: {
					xTitle: "x축 타이틀",				// x 축 타이틀 : default null
					category: categories,				// x 축 데이터 (필수 값) : array
					tickValue: 10,						// x 축 label interval : default null 인 경우 label 수에 따라 interval 따로 지정
					replaceLabel: ['~', '<br/>~'],		// x 축 label 개행 설정 시 (선택) : default null
					categoryFuncParam: "360D",			// 360D / 360M
					tickPosition: null,					// x 축 label 리스트 중 챠트에 보여줄 position 설정 : default null : array 로 전달
					max: 30.0,							// bubble chart 사용 시 x 축 max value 설정
					min: 0.0,							// bubble chart 사용 시 x 축 min value 설정
					tickInterval: 2.5,					// bubble chart 사용 시 x 축 min max 간 interval 설정
					plotBandTo: 20,						// default plotBand 를 그리기 위한 값을 전달 (master)
					fixedFormat: 2					    // x축이 숫자로 구성된 경우 소수점 표시 자리 수 
				}
				,yAxisOption: {
					yTitle: "first y Title",			// y 축 타이틀 : default null
					yTitle2: "second y Title",			// y 축 타이틀 : default null
					align: "middle",
					margin: 10,
					minValue: 0,						// min value : default null
					allowDecimals: true,				// 소수점 표시 유무
					fixedFormat: 3,						// 소수점 표시 자리 수 
					labelFormatFunc: labelFormatFunc,	// label function (fixedFormat 과 같이 사용하지 말 것)
					minTickInterval: 0.05,
        			labelEnable: false,					// label 출력 유무
        			minorTickInterval: false
				}
				,titleOption: { //---------------------- 이하는 선택
					mainTitle: "챠트 테스트",			// 챠트 메인 타이틀 : null 인 경우 default 타이틀 공란			
					textAlign: "left",					// 타이틀 정렬 : null 인 경우 default "center"
					titleFontSize: "14px"				// 타이틀 font size : default "14px"
				}
				,plotOption: {
					// line 챠트인 경우 :  marker 속성 제거 / null 값 대체 유무 / line width 수정
					markerUse: false,
					nullConnectUse: true, 
					lineWidth: 2,
					// bubble 챠트인 경우 (2개 모두 같이 전달되어야 함)
					minSize: 5,							// bubble 최소 size
					maxSize: 20,						// bubble 최대 size
					// pie 챠트인 경우
					pieUse: true,
					turboThreshold: true,				// data 양이 많은 경우에 사용 (부도율 페이지(3개)에서 사용함)
					// stack 챠트인 경우
					stacking: "normal"
				}
				,legendOption: {
					layoutType: "horizontal",			// legend box 출력 type 옵션 : default "horizontal" (horizontal / vertical)
					hAlign: "center",					// legend box 가로 정렬 옵션 : default "center" (left / center / right)
					vAlign: "bottom",					// legend box 세로 정렬 옵션 : default "middle" (top / middle / bottom)
					itemWidth: 150,						// legend item 간 너비 설정 : default 150px
					borderWidth: 0,						// legend border : default 0px
        			enabled: false				
				}
				,creditOption: {
					use: true,							// credit 사용 유무 : default true
					creditText: "(주)한국자산평가",		// credit text : default "(주)한국자산평가"
					linkUrl: "http://www.koreaap.com"   // link url
				}
				,exportOption: {
					use: false							// file export use : default true
				}
				,tooltipOption: {
					sharedUse: true,					// tooltip : default false
					formatFunc: toolTipFormatStack,		// tooltip format : stack
        			enabled: false,						// tooltip 사용 유무
        			xCrossLine: true					// x 축으로 크로스라인(점선) 표시할 때 사용
				}
				,seriesColors: colors					// colors : 배열로 전달, 공통으로 적용되는 색상이 아닌 지정한 색상으로 챠트 표시할 때 사용
														// ex> var colors = ['#d93611', '#3265c9', '#fc9300', '#109417', '#8a8484'];
				,trendLineUse: true						// 특정 1개의 시리즈(A)에 트렌드라인을 그릴 때 사용(필수 - 데이터 전달 시 A와 동일한 데이터를 한번 더 전달이 필요)
			});
	*/
	
	function gfn_drawChart(objChart) {
    	
    	var _chartOption = {};
    	var _seriesOption = [];
    	var _xAxisOption = {};
    	var _yAxisOption = [];
    	var _plotOption = {};
    	var _titleOption = {};
    	var _legendOption = {};
    	var _creditOption = {};
    	var _exportOption = {};
    	var _tooltipOption = {};
    	
    	var colorArr = null;
    	
    	if(objChart.seriesColors != null) {
    		colorArr = objChart.seriesColors;
    	} else {
    		colorArr = ['#3265c9', 
			         '#d93611', 
			         '#fc9300', 
			         '#109417', 
			         '#910000', 
			         '#1aadce', 
			         '#492970',
			         '#f28f43', 
			         '#77a1e5', 
			         '#c42525', 
			         '#941068', 
			         '#a6c96a'];
    	}
    	/*
    	 * chart 공통 스타일 
    	 */
    	Highcharts.setOptions({
			colors: colorArr,
			chart: {
				backgroundColor: {
			         linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
			         stops: [
			            [0, 'rgb(255, 255, 255)'],
			            [1, 'rgb(240, 240, 255)']
			         ]
			      }
			    , plotBackgroundColor: 'rgba(255, 255, 255, .9)'
			    , plotShadow: true
			    , plotBorderWidth: 1
				, style: {
					fontFamily: '돋움'
				}
			},
			xAxis: {
			      gridLineWidth: 1,
			      lineColor: '#cccccc',
			      tickColor: '#cccccc'
			},
			yAxis: {
			      lineColor: '#cccccc',
			      lineWidth: 1,
			      tickWidth: 1,
			      tickColor: '#cccccc',
			      title: {
	                   style: {
	                   		fontWeight: "normal",
	                   		color: '#333',
				            fontSize: '12px',
				            backgroundColor: '#ffffff'
	                   }
	              },
	              labels: {
	                   align: 'right',
	                   x: -4,
	                   y: 0
	              }
			},
			tooltip: {
				crosshairs: {
	                width: 1,
	                color: 'gray',
	                dashStyle: 'shortdot'
	            }
			},
			legend: { /* HighChart 4.0 lib 적용 시 사용 : 레전드 default 가 3.0과 다름 */
				itemStyle: {
					fontWeight: "normal"
				}
			}
		});
    	
    	
    	/*
    	 * 기 생성된 차트 있는 경우 차트 초기화 (destroy)
    	 */
    	if($("#" + objChart.chartOption.divId).highcharts() != null) {
    		$("#" + objChart.chartOption.divId).highcharts().destroy();
    	}
    	
		/*
    	 * chart option (필수 입력 값)
    	 */
    	_chartOption.renderTo = objChart.chartOption.divId;
    	_chartOption.type = objChart.chartOption.type;
    	
    	// defualt 
//    	_chartOption.marginBottom = 50;
    	_chartOption.spacingTop = 5;
    	
    	if(objChart.chartOption.zoomType != null) {
    		if(objChart.chartOption.zoomType == "none") {
    			_chartOption.zoomType = null;
    		} else {
    			_chartOption.zoomType =  objChart.chartOption.zoomType;
    		}
    	} else {
    		_chartOption.zoomType =  "x";
    	}
    	
    	if(objChart.chartOption.fontType != null) {
    		_chartOption.style = {};
    		_chartOption.style.fontFamily =  objChart.chartOption.fontType;
    	} else {
    		_chartOption.style = {};
    		_chartOption.style.fontFamily =  "돋움";
    	}
    	
    	if(objChart.chartOption.marginLeft != null) {
    		_chartOption.marginLeft = objChart.chartOption.marginLeft;
    	}
    	if(objChart.chartOption.marginRight != null) {
    		_chartOption.marginRight = objChart.chartOption.marginRight;
    	}
    	// event test
    	if(objChart.chartOption.selectionEventUse != null) {
    		_chartOption.events = {
    				selection: function(event) {
    					
                        var extremesObject = event.xAxis[0],
                            min = extremesObject.min,
                            max = extremesObject.max,
                            detailData = [],
                            xAxis = this.xAxis[0];
                        
                        xAxis.removePlotBand('mask-before');

                        xAxis.addPlotBand({
                            id: 'mask-before',
                            from: -1,
                            to: min,
                            color: 'rgba(0, 0, 0, 0.2)'
                        });

                        xAxis.removePlotBand('mask-after');
                        
                        xAxis.addPlotBand({
                            id: 'mask-after',
                            from: max,
                            to: objChart.xAxisOption.category.length,
                            color: 'rgba(0, 0, 0, 0.2)'
                        });

                        for(var i = 0; i < this.series.length; i++) {
                        	detailData = [];
                        	$.each(this.series[i].data, function(j, point) {
                        		if (point.x > min && point.x < max) {
                        			detailData.push({
                        				x: point.x,
                        				y: point.y
                        			});
                        		}
                        	});
                        	
                        	objChart.chartOption.eventObject.series[i].setData(detailData);
                        }
                        return false;
                    }
    		};
    	}
    	
    	/*
    	 * series option
    	 */
    	var seriesLength = objChart.trendLineUse != null ? objChart.seriesOption.data.length - 1 : objChart.seriesOption.data.length;
    	
    	
    	for(var i = 0; i < seriesLength; i++) {
    		var _dataOption = {};
    		
    		if(objChart.seriesOption.name != null) {
    			_dataOption.name = objChart.seriesOption.name[i];
    		} else {
    			_dataOption.name = ' ';
    		}
    		
    		// tickData 를 전달 받은 경우
    		var ticData = null;
    		
    		if(objChart.seriesOption.tickData != null) {
    			var setData = new Array();
    			
    			// data 객체에 value 만 저장되어 전달된 경우에만 해당함 
    			for(var j = 0; j < objChart.seriesOption.tickData.length; j++) {
    				setData.push([objChart.seriesOption.tickData[j], objChart.seriesOption.data[i][j]]);
    			}
    			ticData = setData;
    			_dataOption.data = setData;
    		} else {
    			_dataOption.data = objChart.seriesOption.data[i];
    			
    			// firstHighlight 옵션을 설정한 챠트에 한해서만...
    			if(objChart.seriesOption.firstHighlight && i == 0) {
    				_dataOption.lineWidth = 3; // 라인 width 를 타 시리즈보다 굵게 표시하기 위해
    				_dataOption.zIndex = 100; // 첫번째 시리즈를 가장 앞으로 출력되도록 설정
    			}
    		}
    		
    		if(objChart.seriesOption.type != null) {
    			_dataOption.type = objChart.seriesOption.type[i];
    		}
    		
    		if(objChart.seriesOption.pointStart != null) {
    			_dataOption.pointStart = objChart.seriesOption.pointStart - 1;
    		}
    		
    		// 그래프 type 이 "combi" 인 경우 y 축을 따로 사용
    		if(objChart.chartOption.type == "combi" && i == objChart.seriesOption.name.length - 1) {
    			_dataOption = {
						name: objChart.seriesOption.name[i],
						data: ticData == null ? objChart.seriesOption.data[i] : ticData,
						type: objChart.seriesOption.type[i],
						pointStart: objChart.seriesOption.pointStart != null ? objChart.seriesOption.pointStart - 1 : 0,
						color: objChart.seriesColors == null ? '#90c7ff' : objChart.seriesColors[objChart.seriesColors.length - 1],
						yAxis: 1,
						zIndex: -1,
						fillColor : {
							linearGradient : {
								x1: 0, 
								y1: 0, 
								x2: 0, 
								y2: 1
							},
							stops : [[0, '#90c7ff'], [1, 'rgba(195,222,250,0)']]
						}
				};
			}
    		
     		_seriesOption.push(_dataOption);
    	}
    	
    	// trend line 을 적용한 경우
		if(objChart.trendLineUse != null) {
			_dataOption = {
					showInLegend: false,
					marker: { enabled: false, lineWidth: 1 },
					data: (function() {
			              return fitData(objChart.seriesOption.data[objChart.seriesOption.data.length - 1]).data;
			            })(),
					type: "line",
					enableMouseTracking: false,
					color: "black"
			};
			_seriesOption.push(_dataOption);
		}
    	
    	/*
    	 * xAxis option
    	 */
    	if(objChart.xAxisOption != null) {
    		if(objChart.xAxisOption.category != null) {
        		_xAxisOption.categories = objChart.xAxisOption.category;
        	}
        	if(objChart.xAxisOption.xTitle != null) {
        		_xAxisOption.title = {};
        		_xAxisOption.title.text = objChart.xAxisOption.xTitle;
        	}
        	if(objChart.xAxisOption.tickValue != null) {
        		_xAxisOption.tickInterval = objChart.xAxisOption.tickValue;
        	} else {
        		if(objChart.xAxisOption.category != null) {
        			// interval 이 지정되지 않았을 경우 처리
        			var length = objChart.xAxisOption.category.length;
        			if(length < 10) {
        				_xAxisOption.tickInterval = 1;
        			} else if(length < 20) {
        				_xAxisOption.tickInterval = 2;
        			} else {
        				_xAxisOption.tickInterval = parseInt(length / 8);
        			}
        		}
        	}
        	if(objChart.xAxisOption.replaceLabel != null) {
        		// x 축이 날짜~날짜 인 경우 개행 필요
        		_xAxisOption.labels = {
        				formatter: function() {
      					  return this.value.replace(objChart.xAxisOption.replaceLabel[0], objChart.xAxisOption.replaceLabel[1]);
      				  }
        		};
        	}
    		if(objChart.xAxisOption.categoryFuncParam != null) {
    			
    			var newCategory = new Array();
    			newCategory.push("0");
    			
    			if(objChart.xAxisOption.categoryFuncParam == "600M") {
    				for(var i = 1; i <= 600; i++) {
    	            	if(i >= 12) {
    	            		newCategory.push((i / 12) + "Y");
    	            	} 
    	                else {
    	                	newCategory.push(i + "M");      
    	                }
    	            }
    				
    				//newCategory.push("50Y");
    			}
    			else if(objChart.xAxisOption.categoryFuncParam == "360D") {
    	        	for(var i = 1; i <= 360; i++) {
    	            	if(i >= 30) {
    	            		newCategory.push((i / 30) + "M");
    	            	} 
    	                else {
    	                	newCategory.push(i + "D");      
    	                }
    	            }
    	        } else {
    	        	for(var i = 1; i <= 360; i++) {
    	            	if(i >= 12) {
    	            		newCategory.push((i / 12) + "Y");
    	            	} 
    	                else {
    	                	newCategory.push(i + "M");      
    	                }
    	            }
    	        }
    			
    			_xAxisOption.categories = newCategory;
    		}
        	if(objChart.xAxisOption.tickPosition != null) {
        		_xAxisOption.tickPositions = objChart.xAxisOption.tickPosition;
        	}
        	if(objChart.xAxisOption.max != null) {
        		_xAxisOption.max = objChart.xAxisOption.max;
        	}
        	if(objChart.xAxisOption.min != null) {
        		_xAxisOption.min = objChart.xAxisOption.min;
        	}
        	if(objChart.xAxisOption.tickInterval != null) {
        		_xAxisOption.tickInterval = objChart.xAxisOption.tickInterval;
        	}
        	if(objChart.xAxisOption.plotBandTo != null) {
        		_xAxisOption.plotBands = {};
        		_xAxisOption.plotBands = [{
        				id : 'mask-before',
        				from : -1,
        				to : objChart.xAxisOption.plotBandTo,
        				color: 'rgba(0, 0, 0, 0.2)'
        		}];
        	}
        	if(objChart.xAxisOption.fixedFormat != null) {
        		_xAxisOption.labels = {};
        		_xAxisOption.labels.formatter =  function() { return this.value.toFixed(objChart.xAxisOption.fixedFormat); };
    		}
    	}
    	
    	/*
    	 * yAxis option
    	 */
    	if(objChart.yAxisOption) {
    		var _yOption = {};
    		_yOption.title = {};
    		
    		if(objChart.yAxisOption.yTitle != null) {
    			_yOption.title.text = objChart.yAxisOption.yTitle;
    			_yOption.title.rotation = 270;
        	} else {
        		_yOption.title.text = null;
        	}
    		if(objChart.yAxisOption.align != null) {
    			_yOption.title.align = objChart.yAxisOption.align;
    		}
    		if(objChart.yAxisOption.margin != null) {
    			_yOption.title.margin = objChart.yAxisOption.margin;
    		}
    		if(objChart.yAxisOption.minValue != null) {
    			_yOption.min = objChart.yAxisOption.minValue;
    		}
    		if(objChart.yAxisOption.allowDecimals != null) {
    			_yOption.allowDecimals = objChart.yAxisOption.allowDecimals;
    		}
    		if(objChart.yAxisOption.fixedFormat != null) {
    			_yOption.labels = {};
    			_yOption.labels.formatter =  function() { return this.value.toFixed(objChart.yAxisOption.fixedFormat); };
    		}
    		if(objChart.yAxisOption.labelFormatFunc != null) {
    			_yOption.labels = {};
    			_yOption.labels.formatter =  function() { return objChart.yAxisOption.labelFormatFunc(this.value, true); };
    		}
    		if(objChart.yAxisOption.minTickInterval != null) {
    			_yOption.tickInterval = objChart.yAxisOption.minTickInterval;
    		}
    		
    		if(objChart.yAxisOption.labelEnable != null) {
    			_yOption.labels = {};
    			_yOption.labels.enabled = objChart.yAxisOption.labelEnable;
    		}
    		
    		if(objChart.yAxisOption.minorTickInterval != null) {
//    			_yOption.minorTickInterval = objChart.yAxisOption.minorTickInterval;
    		} else {
    			_yOption.minorTickInterval = 'auto';
    		}
    		
    		
    		// KP Yield Curve - Yield Curve 챠트에서 사용 
    		// 라인 챠트의 max 값을 지정하여 챠트 상단의 여백을 줄이기 위함.. 
    		// 요청사항 : 그래프 표시 Max값은 Yield Curve 최고치의 +1%
    		if(objChart.yAxisOption.maxRangeUse != null) {
    			var arr1 = objChart.seriesOption.data[0];
    			var arr2 = objChart.seriesOption.data[1];
    			
    			var max1 = Math.max.apply(null, arr1);
    			var max2 = Math.max.apply(null, arr2);
    			
//    			log("max1 : " + max1);
//    			log("max2 : " + max2);
    			
    			var max = max1 > max2 ? max1 : max2;
    			
//    			log("max : " + max);
//    			log("result : " + (Math.floor(max) + 0.1));
    			_yOption.max = (Math.floor(max) + 0.1);
    		}
    		
    		_yAxisOption.push(_yOption);
    		
    		if(objChart.yAxisOption.yTitle2 != null) {
    			_yOption = {};
    			_yOption.title = {};
    			
    			_yOption.title.text = objChart.yAxisOption.yTitle2;
    			_yOption.title.rotation = -270;
    			
    			if(objChart.yAxisOption.align != null) {
        			_yOption.title.align = objChart.yAxisOption.align;
        		}
        		if(objChart.yAxisOption.margin != null) {
        			_yOption.title.margin = objChart.yAxisOption.margin + 5;
        		}
        		if(objChart.yAxisOption.allowDecimals != null) {
        			_yOption.allowDecimals = objChart.yAxisOption.allowDecimals;
        		}
        		if(objChart.yAxisOption.minValue2 != null) {
        			_yOption.min = objChart.yAxisOption.minValue2;
        		} else {
        			_yOption.min = null;
        		}
    			_yOption.opposite = true;
    			
    			_yOption.labels = {};
    			
    			if(objChart.yAxisOption.labelFormatFunc != null) {
        			_yOption.labels.formatter =  function() { return objChart.yAxisOption.labelFormatFunc(this.value, true); };
        		} else {
        			// 우측 Y축에 해당
        			// y축 value 가 소수점인 경우와 천단위를 표현하기 위해 사용 
        			// param : y축 value, decimal 표시 자릿수 (-1 로 고정), 소수점 표현 방법 ('.' 으로 고정 - default), 천단위 표현 방법 
        			_yOption.labels.formatter = function() { return Highcharts.numberFormat(this.value, -1,'.',','); };
        		}
    			
    			if(objChart.yAxisOption.minTickInterval2 != null) {
        			_yOption.tickInterval = objChart.yAxisOption.minTickInterval2;
        		}
    			
    			_yOption.labels.align = 'left';
    			_yOption.labels.x = 10;
    			_yOption.labels.y = 0;
    			
    			_yAxisOption.push(_yOption);
    		} else {
    			_yOption = {};
    			_yOption.title = {};
    			_yOption.title.text = null;
    			_yOption.opposite = true;
    			
    			if(objChart.yAxisOption.labelEnable != null) {
        			_yOption.labels = {};
        			_yOption.labels.enabled = objChart.yAxisOption.labelEnable;
        		} else {
        			_yOption.labels = {};
        			
        			if(objChart.yAxisOption.labelFormatFunc != null) {
        				_yOption.labels.formatter =  function() { return objChart.yAxisOption.labelFormatFunc(this.value, true); };
        			}
        			
        			_yOption.labels.align = 'left';
        			_yOption.labels.x = 10;
        			_yOption.labels.y = 0;
        		}
    			
    			_yAxisOption.push(_yOption);
    		}
    	}
    	
    	/*
    	 * title option
    	 */
    	if(objChart.titleOption) {
    		if(objChart.titleOption.mainTitle != null) {
    			_titleOption.text = objChart.titleOption.mainTitle;
    			_chartOption.marginTop = 50; // main title 있는 경우 margin top을 따로 설정
    		} 
    		if(objChart.titleOption.textAlign != null) {
    			_titleOption.align = objChart.titleOption.textAlign;
    		} else {
    			_titleOption.align = "left";
    		}
    		if(objChart.titleOption.titleFontSize != null) {
    			_titleOption.style = {};
    			_titleOption.style.fontSize = objChart.titleOption.titleFontSize;
    		} else {
    			_titleOption.style = {};
    			_titleOption.style.fontSize = "14px";
    		}
    	} else {
			_titleOption.text = null;
			_chartOption.marginTop = 20;
		}
    	
    	/*
    	 * plot option
    	 */
    	if(objChart.plotOption) {
    		_plotOption.series = {};
    		_plotOption.series.marker = {};
    		
    		if(objChart.plotOption.turboThreshold != null) {
    			_plotOption.series.turboThreshold = 0;
    		} 
    		if(objChart.plotOption.markerUse != null) {
    			_plotOption.series.marker.enabled = objChart.plotOption.markerUse;
    		} else {
    			_plotOption.series.marker.enabled = false;
    		}
    		if(objChart.plotOption.nullConnectUse != null) {
    			_plotOption.series.connectNulls = objChart.plotOption.nullConnectUse;
    		} else {
    			_plotOption.series.connectNulls = true;
    		}
    		if(objChart.plotOption.lineWidth != null) {
    			_plotOption.line = {};
    			_plotOption.line.lineWidth = objChart.plotOption.lineWidth;
    		}
    		if(objChart.plotOption.stacking != null) {
    			if(objChart.chartOption.type == "bar") {
    				_plotOption.series = {};
    				_plotOption.series.stacking = objChart.plotOption.stacking;
    			} else {
    				_plotOption.column = {};
    				_plotOption.column.stacking = objChart.plotOption.stacking;
    			}
    		}
    		if(objChart.plotOption.minSize != null) {
    			_plotOption.bubble = {};
    			_plotOption.bubble.minSize = objChart.plotOption.minSize;
    			_plotOption.bubble.maxSize = objChart.plotOption.maxSize;
    			_plotOption.bubble.sizeBy = "width";
    			
    			_plotOption.bubble.tooltip = {};
    			_plotOption.bubble.tooltip.pointFormat = "{point.x}, {point.y}";
    		}
    		if(objChart.plotOption.pieUse != null) {
    			_plotOption.pie = {
    					allowPointSelect: true,
						cursor: 'pointer',
						dataLabels: {
							enabled: true,
							formatter: function() {
								return '<b>' + this.point.name + '</b>: ' + Highcharts.numberFormat(this.percentage, 1) + ' %';
							}
						}
    			};
    		}
    	} else {
    		_plotOption.series = {};
    		_plotOption.series.marker = {};
    		_plotOption.line = {};
    		_plotOption.series.marker.enabled = false;
    		_plotOption.series.connectNulls = true;
    		_plotOption.line.lineWidth = 1.5;
    		
    		// scatter 챠트 사용하기 위해 
    		// scatter 챠트는 점으로 이루어지기 때문에 marker 속성을 true 로 해야 한다.
    		if(objChart.chartOption != null && objChart.chartOption.type == "scatter") {
    			_plotOption.series.marker.enabled = true;
    			_plotOption.series.marker.radius = 3;
    		}
    	}
    	
    	/*
    	 * legend option
    	 */
    	if(objChart.legendOption) {
    		if(objChart.legendOption.layoutType != null) {
    			_legendOption.layout = objChart.legendOption.layoutType;
    		}
    		if(objChart.legendOption.hAlign != null) {
    			_legendOption.align = objChart.legendOption.hAlign;
    		}
    		if(objChart.legendOption.vAlign != null) {
    			_legendOption.verticalAlign = objChart.legendOption.vAlign;
    		}
    		if(objChart.legendOption.itemWidth != null) {
    			_legendOption.itemWidth = objChart.legendOption.itemWidth;
    		}
    		if(objChart.legendOption.borderWidth != null) {
    			_legendOption.borderWidth = objChart.legendOption.borderWidth;
    		} else {
    			_legendOption.borderWidth = 0;
    		}
    		
    		if(objChart.legendOption.enabled != null) {
    			_legendOption.enabled = objChart.legendOption.enabled;
    		}
    		_legendOption.itemMarginBottom = 7;
    		_legendOption.itemMarginTop = 0;
    	} else {
    		_legendOption.layout = "horizontal";
    		_legendOption.align = "center";
    		_legendOption.verticalAlign = "bottom";
    		_legendOption.itemWidth = 150;
    		_legendOption.borderWidth = 0;
    		_legendOption.itemMarginBottom = 7;
    		_legendOption.itemMarginTop = 0; // HighChart 4.0 으로 사용한 경우에 사용 (챠트 panel 부분과 레전드 사이의 간격 조정)
    	}
    	
    	/*
    	 * credit option
    	 */
    	if(objChart.creditOption) {
    		if(objChart.creditOption.use != null) {
    			_creditOption.enabled = objChart.creditOption.use;
    		}
    		if(objChart.creditOption.creditText != null) {
    			_creditOption.text = objChart.creditOption.creditText;
    		}
    		if(objChart.creditOption.linkUrl != null) {
    			_creditOption.href = objChart.creditOption.linkUrl;
    		}
    	} else {
    		_creditOption.enabled = true;
    		_creditOption.text = "Korea Asset Pricing";
    		_creditOption.href = "http://www.koreaap.com";
    	}
    	
    	/*
    	 * export option
    	 */
    	
    	if(objChart.exportOption) {
    		if(objChart.exportOption.use != null) {
    			_exportOption.enabled = objChart.exportOption.use;
    		}
    	} else {
    		_exportOption.enabled = true;
    	}
    	
    	/*
    	 * tooltip option
    	 */
    	if(objChart.tooltipOption) {
    		if(objChart.tooltipOption.sharedUse != null) {
    			_tooltipOption.shared = objChart.tooltipOption.sharedUse;
    			_tooltipOption.headerFormat = '{point.key}<br/>';
    		}
    		if(objChart.tooltipOption.formatFunc != null) {
    			_tooltipOption.shared = objChart.tooltipOption.sharedUse;
    			_tooltipOption.useHTML = true;
    			_tooltipOption.formatter = objChart.tooltipOption.formatFunc;
    		}
    		if(objChart.tooltipOption.enabled != null) {
    			_tooltipOption.shared = objChart.tooltipOption.sharedUse;
    			_tooltipOption.enabled = objChart.tooltipOption.enabled;
    		}
    		if(objChart.tooltipOption.xCrossLine != null) {
    			_tooltipOption.crosshairs = [{
    				width: 1,
	                color: 'gray',
	                dashStyle: 'shortdot'
    			}, {
    				width: 1,
	                color: 'gray',
	                dashStyle: 'shortdot'
    			}
    			];
    		}
    	} else {
    		_tooltipOption.shared = false;
    		_tooltipOption.headerFormat = '{point.key}<br/>';
    	}
    	
    	var setOption = {
    			chart: _chartOption,
    			series: _seriesOption,
    			xAxis: _xAxisOption,
    			yAxis: _yAxisOption,
    			title: _titleOption,
    			plotOptions: _plotOption,
    			legend: _legendOption,
    			credits: _creditOption,
    			exporting: _exportOption,
    			tooltip: _tooltipOption
    	};
    	
		return new Highcharts.Chart(setOption);
    }