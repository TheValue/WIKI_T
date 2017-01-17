(function() {
	
	function Index() {
		
		/* 
		 * private variables
		 */
		var dsYtmList = null;
		var dsSpotList = null;
		var dsCdCpList = null;
		var dsYieldCurveList = null;
		var dsSwapRateList = null;
		
		/* 
		 * 초기화 메소드
		 */
		
		function _init() {
			bindEvent();
			
			initYtmGrid();
			initCdCpGrid();
			initYieldCurveGrid();
			initSwapRateGrid();
		}
		
		function bindEvent() {
			
			// 현재 날짜
			cfFind(Config.CONTEXT_PATH + "/findStdDate", null, function(jsonData) {
				var stdDate = jsonData.STD_DATE;
				if(stdDate != "") {
					var date = stdDate.substring(4, 6) + "/" + stdDate.substring(6, 8) + "/" + stdDate.substring(0, 4);
					
					$("#stdDate").datepicker({
						format: 'yyyy-mm-dd',
						onSelect: function(dateText, inst) {
							var date = $(this).val();
							if(date != null || date != "") {
								searchList();
							}
						}
					});
					$("#stdDate").val(date);
					
					// 최초조회
					searchList();
				}
				
			}, false);
			
			$("#findList").on("click", function(e) {
				e.preventDefault();
				searchList();
			});
		}
		
		function searchList() {
			searchYtm();
			searchSpot();
			searchCdCp();
			searchYieldCurve();
			searchSwapRate();
		}
		
		function initYtmGrid() {
			var dsInfoArr = [];
			dsInfoArr.push("GMRI_TYPE,Type,80,20,center,ro,na,1");
			dsInfoArr.push("GMRI_SUBTYPE,Class,80,20,center,ro,na,1");
			dsInfoArr.push("GMRI_BOND,target bond / credit rating,100,20,center,ro,na,1");
			dsInfoArr.push("GMRI_INT,Method,100,20,center,ro,na,1");
			dsInfoArr.push("m003,3M,50,20,right,ro,na,1");
			dsInfoArr.push("m006,6M,50,20,right,ro,na,1");
			dsInfoArr.push("m009,9M,50,20,right,ro,na,1");
			dsInfoArr.push("m012,1Y,50,20,right,ro,na,1");
			dsInfoArr.push("m018,1.5Y,50,20,right,ro,na,1");
			dsInfoArr.push("m024,2Y,50,20,right,ro,na,1");
			dsInfoArr.push("m030,2.5Y,50,20,right,ro,na,1");
			dsInfoArr.push("m036,3Y,50,20,right,ro,na,1");
			dsInfoArr.push("m048,4Y,50,20,right,ro,na,1");
			dsInfoArr.push("m060,5Y,50,20,right,ro,na,1");
			dsInfoArr.push("m084,7Y,50,20,right,ro,na,1");
			dsInfoArr.push("m120,10Y,50,20,right,ro,na,1");
			dsInfoArr.push("m240,20Y,50,20,right,ro,na,1");
			dsInfoArr.push("m360,30Y,50,20,right,ro,na,1");
			dsInfoArr.push("m600,50Y,50,20,right,ro,na,1");
			dsInfoArr.push("P_TYPE,P_TYPE,50,20,right,ro,na,1");
			dsInfoArr.push("GMRI_CODE,GMRI_CODE,50,20,right,ro,na,1");
			dsInfoArr.push("GMRI_SEQ,GMRI_SEQ,50,20,right,ro,na,1");
			dsInfoArr.push("CLASSID,CLASSID,50,20,right,ro,na,1");
			dsInfoArr.push("FULLNAME,FULLNAME,50,20,right,ro,na,1");
			
			/* YTM GRID */
			dsYtmList = cfGridInit(dsInfoArr, "dsYtmList");
			
			dsYtmList.setColumnHidden(dsYtmList.getColIndexById("P_TYPE"), true);
			dsYtmList.setColumnHidden(dsYtmList.getColIndexById("GMRI_CODE"), true);
			dsYtmList.setColumnHidden(dsYtmList.getColIndexById("GMRI_SEQ"), true);
			dsYtmList.setColumnHidden(dsYtmList.getColIndexById("CLASSID"), true);
			dsYtmList.setColumnHidden(dsYtmList.getColIndexById("FULLNAME"), true);
			
			dsYtmList.attachEvent("onXLE", function(){ 
				var cnt = dsYtmList.getRowsNum();
				
				if(cnt > 0) {
					dsYtmList.selectRow(0);
					
					drawYtmChart(1);
					// row span
					f_setRowSpan(dsYtmList, dsYtmList.getColIndexById("GMRI_TYPE"));
		        	f_setRowSpan2(dsYtmList, dsYtmList.getColIndexById("GMRI_TYPE"), dsYtmList.getColIndexById("GMRI_SUBTYPE"));
				}
			});
			
			dsYtmList.attachEvent("onRowSelect", function(rId, cIdx) {
				drawYtmChart(rId);
			});
			
			/* SPOT GRID */
			dsSpotList = cfGridInit(dsInfoArr, "dsSpotList");
			
			dsSpotList.setColumnHidden(dsSpotList.getColIndexById("P_TYPE"), true);
			dsSpotList.setColumnHidden(dsSpotList.getColIndexById("GMRI_CODE"), true);
			dsSpotList.setColumnHidden(dsSpotList.getColIndexById("GMRI_SEQ"), true);
			dsSpotList.setColumnHidden(dsSpotList.getColIndexById("CLASSID"), true);
			dsSpotList.setColumnHidden(dsSpotList.getColIndexById("FULLNAME"), true);
			
			dsSpotList.attachEvent("onXLE", function(){ 
				var cnt = dsSpotList.getRowsNum();
				
				if(cnt > 0) {
					// row span
					f_setRowSpan(dsSpotList, dsSpotList.getColIndexById("GMRI_TYPE"));
		        	f_setRowSpan2(dsSpotList, dsSpotList.getColIndexById("GMRI_TYPE"), dsSpotList.getColIndexById("GMRI_SUBTYPE"));
				}
			});
			
		}
		
		// YTM 데이터 조회
		function searchYtm() {
			
			dsYtmList.clearAll();
			
			// 기준일 get
			var stdDate = $("#stdDate").val();
			if(stdDate == "") {
				alert("Please Input Date..");
				return false;
			}
			
			// set param
			var obj = {
					stdDate : stdDate
			};
			
			cf_showLoadingPopup("dsYtmList");
			
			// 결과 리스트 조회
			cfFind(Config.CONTEXT_PATH + "/findYtm", obj, function(jsonData){
				if(jsonData.result == "success") {
					dsYtmList.parse(jsonData, "json");
				}
				else {
					alert(jsonData.msg);
				}
				cf_hideLoadingPopup("dsYtmList");
			}, false);
		}
		
		// SPOT 데이터 조회
		function searchSpot() {
			
			dsSpotList.clearAll();
			
			// 기준일 get
			var stdDate = $("#stdDate").val();
			if(stdDate == "") {
				alert("Please Input Date..");
				return false;
			}
			
			// set param
			var obj = {
					stdDate : stdDate
			};
			
			cf_showLoadingPopup("dsSpotList");
			
			// 결과 리스트 조회
			cfFind(Config.CONTEXT_PATH + "/findSpot", obj, function(jsonData){
				if(jsonData.result == "success") {
					dsSpotList.parse(jsonData, "json");
				}
				else {
					alert(jsonData.msg);
				}
				cf_hideLoadingPopup("dsSpotList");
			}, false);
		}
		
		function initCdCpGrid() {
			var dsInfoArr = [];
			dsInfoArr.push("DATACODE,Code,*-25,20,center,ro,na,1");
			dsInfoArr.push("STD_DATE,Date,100,20,center,ro,na,1");
			dsInfoArr.push("CLASS,target bond / credit rating,200,20,center,ro,na,1");
			dsInfoArr.push("D1,1Day,70,20,right,ron,na,1");
			dsInfoArr.push("D7,1Week,70,20,right,ron,na,1");
			dsInfoArr.push("D15,15Day,70,20,right,ron,na,1");
			dsInfoArr.push("M1,1Month,70,20,right,ron,na,1");
			dsInfoArr.push("M2,2Month,70,20,right,ron,na,1");
			dsInfoArr.push("M3,3Month,70,20,right,ron,na,1");
			dsInfoArr.push("M6,6Month,70,20,right,ron,na,1");
			dsInfoArr.push("Y1,1Year,70,20,right,ron,na,1");
			
			dsCdCpList = cfGridInit(dsInfoArr, "dsCdCpList");
			
			var colIdx = dsCdCpList.getColIndexById("Y1");
			for(var i = 0; i < colIdx; i++) {
				dsCdCpList.setNumberFormat("0,000.00", (i+1)); 
			}
			
			dsCdCpList.attachEvent("onXLE", function(){ 
				var cnt = dsCdCpList.getRowsNum();
				
				if(cnt > 0) {
					f_setRowSpan(dsCdCpList, dsCdCpList.getColIndexById("DATACODE"));
					f_setRowSpan2(dsCdCpList, dsCdCpList.getColIndexById("DATACODE"), dsCdCpList.getColIndexById("STD_DATE"));
//					drawYtmTrendChart();
				}
			});
		}
		
		// CD/CP 데이터 조회
		function searchCdCp() {
			dsCdCpList.clearAll();
			
			var stdDate = $("#stdDate").val();
			if(stdDate == "") {
				alert("Please Input Date..");
				return false;
			}
			
			// set param
			var obj = {
					stdDate : stdDate
			};
			
			cf_showLoadingPopup("dsCdCpList");
			
			// 결과 리스트 조회
			cfFind(Config.CONTEXT_PATH + "/findCdCp", obj, function(jsonData){
				if(jsonData.result == "success") {
					dsCdCpList.parse(jsonData, "json");
				}
				else {
					alert(jsonData.msg);
				}
				cf_hideLoadingPopup("dsCdCpList");
			}, false);
			
		}
		
		function initYieldCurveGrid() {
			var dsInfoArr = [];
			dsInfoArr.push("CURVE_NAME,S&P,120,20,center,ro,str,1");
			dsInfoArr.push("CURVETYPE,CURVETYPE,100,20,center,ro,str,1");
			dsInfoArr.push("MATRIX_ID,MATRIX_ID,100,20,center,ro,str,1");
			dsInfoArr.push("TRADEDAY,TRADEDAY,100,20,center,ro,str,1");
			dsInfoArr.push("M1,1Month,70,20,right,ron,int,1");
			dsInfoArr.push("M3,3Month,70,20,right,ron,int,1");
			dsInfoArr.push("M6,6Month,70,20,right,ron,int,1");
			dsInfoArr.push("Y1,1Year,70,20,right,ron,int,1");
			dsInfoArr.push("Y2,2Year,70,20,right,ron,int,1");
			dsInfoArr.push("Y3,3Year,70,20,right,ron,int,1");
			dsInfoArr.push("Y5,5Year,70,20,right,ron,int,1");
			dsInfoArr.push("Y7,7Year,70,20,right,ron,int,1");
			dsInfoArr.push("Y10,10Year,70,20,right,ron,int,1");
			dsInfoArr.push("Y15,16Year,70,20,right,ron,int,1");
			dsInfoArr.push("Y20,20Year,70,20,right,ron,int,1");
			dsInfoArr.push("Y30,30Year,70,20,right,ron,int,1");
			
			dsYieldCurveList = cfGridInit(dsInfoArr, "dsYieldCurveList");
			
			var colIdx = dsYieldCurveList.getColIndexById("Y30");
			for(var i = 0; i < colIdx; i++) {
				dsYieldCurveList.setNumberFormat("0,000.000", (i+1)); 
			}
			
			dsYieldCurveList.setColumnHidden(dsYieldCurveList.getColIndexById("CURVETYPE"), true);
			dsYieldCurveList.setColumnHidden(dsYieldCurveList.getColIndexById("MATRIX_ID"), true);
			dsYieldCurveList.setColumnHidden(dsYieldCurveList.getColIndexById("TRADEDAY"), true);
			
			dsYieldCurveList.attachEvent("onXLE", function(){ 
				var cnt = dsYieldCurveList.getRowsNum();
				
				if(cnt > 0) {
				}
			});
		}
		
		// Yield Curve 데이터 조회
		function searchYieldCurve() {
			dsYieldCurveList.clearAll();
			
			var stdDate = $("#stdDate").val();
			if(stdDate == "") {
				alert("Please Input Date..");
				return false;
			}
			
			// set param
			var obj = {
					stdDate : stdDate
			};
			
			cf_showLoadingPopup("dsYieldCurveList");
			
			// 결과 리스트 조회
			cfFind(Config.CONTEXT_PATH + "/findYieldCurve", obj, function(jsonData){
				if(jsonData.result == "success") {
					dsYieldCurveList.parse(jsonData, "json");
				}
				else {
					alert(jsonData.msg);
				}
				cf_hideLoadingPopup("dsYieldCurveList");
			}, false);
			
		}
		
		function initSwapRateGrid() {
			var dsInfoArr = [];
			dsInfoArr.push("P,Type,120,20,center,ro,str,1");
			dsInfoArr.push("CRS3L,CRS KRW,70,20,right,ro,int,1");
			dsInfoArr.push("CRS3L_BID,#cspan,70,20,right,ro,int,1");
			dsInfoArr.push("CRS3L_ASK,#cspan,70,20,right,ro,int,1");
			dsInfoArr.push("KRW01,IRS KRW,70,20,right,ro,int,1");
			dsInfoArr.push("KRW01_BID,#cspan,70,20,right,ro,int,1");
			dsInfoArr.push("KRW01_ASK,#cspan,70,20,right,ro,int,1");
			dsInfoArr.push("USD3L,IRS USD,70,20,right,ro,int,1");
			dsInfoArr.push("USD3L_BID,#cspan,70,20,right,ro,int,1");
			dsInfoArr.push("USD3L_ASK,#cspan,70,20,right,ro,int,1");
			
			dsSwapRateList = cfGridInit(dsInfoArr, "dsSwapRateList");
			var attach = "#rspan,MID,BID,ASK,MID,BID,ASK,MID,BID,ASK";
			dsSwapRateList.attachHeader(attach);
			
			dsSwapRateList.attachEvent("onXLE", function(){ 
				var cnt = dsSwapRateList.getRowsNum();
				
				if(cnt > 0) {
				}
			});
		}
		
		// Swap Rate 데이터 조회
		function searchSwapRate() {
			dsSwapRateList.clearAll();
			
			var stdDate = $("#stdDate").val();
			if(stdDate == "") {
				alert("Please Input Date..");
				return false;
			}
			
			// set param
			var obj = {
					stdDate : stdDate
			};
			
			cf_showLoadingPopup("dsSwapRateList");
			
			// 결과 리스트 조회
			cfFind(Config.CONTEXT_PATH + "/findSwapRate", obj, function(jsonData){
				if(jsonData.result == "success") {
					dsSwapRateList.parse(jsonData, "json");
				}
				else {
					alert(jsonData.msg);
				}
				cf_hideLoadingPopup("dsSwapRateList");
			}, false);
			
		}
		
		/*
	     * 기준 수익률 데이터  
	     */
	    function getStdData(rowId) {
	    	
	    	var data = new Array();
	    	var index = dsYtmList.getColIndexById("m003");
	    	var rowIndex = rowId;
	    	var month = [3, 6, 9, 12, 18, 24, 30, 36, 48, 60, 84, 120, 240, 360, 600];
	    	var pos = 0;
	    	
	    	for(var i = 0; i < month.length; i++) {
	    		var value = dsYtmList.cells(rowIndex, index++).getValue();
    			
    			if(value != "-") {
    				data.push({
    					x: month[pos++],
    					y: parseFloat(value)
    				});
    			}
    		}
	    	
	    	return data;
	    }
	    
		// Draw CHART (highChart)
		function drawYtmChart(rowId) {
			
	    	// 수익률
			var stdData = getStdData(rowId);
	    	
			var legendText = dsYtmList.cells(rowId, dsYtmList.getColIndexById("FULLNAME")).getValue();
			var legendName = [legendText];
			var setData = [stdData];
			var seriesType = ['line'];
            var yTitle = "YTM(%)";
            
            var sectorLast = 0;
            var lastLabel = stdData[stdData.length - 1].x;
            
            // x 축에 출력할 카테고리를 설정한다.
            // 해당 섹터와 섹터별 종목리스트에서 가장 마지막 x 축 값들까지만 출력되도록 설정
            var tickArr = [3, 12, 24, 48, 60, 84, 120, 240, 360, 600];
//            var tickArr = [3, 6, 9, 12, 18, 24, 30, 36, 48, 60, 84, 120, 240, 360, 600];
            var tickPositions = new Array();
            
            for(var i = 0; i < tickArr.length; i++) {
            	if(lastLabel >= tickArr[i] || sectorLast >= tickArr[i]) {
            		tickPositions.push(tickArr[i]);
            	}
            }
            
            // 그래프 호출
            graphYieldCurve = gfn_drawChart({
				chartOption: {
					divId: "chtYtmList",					// div id (필수 값)
					zoomType: "xy"
				}
				,seriesOption: {
					name: legendName,					// 시리즈 별 name : array
					data: setData,						// 시리즈 별 data : array
					type: seriesType					// 시리즈 별 type : array
				}
				,xAxisOption: {
					categoryFuncParam: "600M",
					tickPosition: tickPositions
				}
				,yAxisOption: {
					yTitle: yTitle,				// y 축 타이틀 : default null
					fixedFormat: 3
				}
				,exportOption: {
					use: false							// file export use : default true
				}
			});
		}
		
		function getYtmTrendData(rowIndex) {
	    	
	    	var data = new Array();
	    	var index = dsCdCpList.getColIndexById("m003");
	    	var month = [3, 6, 9, 12, 18, 24, 30, 36, 48, 60, 84, 120, 240, 360, 600];
	    	var pos = 0;
	    	
	    	for(var i = 0; i < month.length - 1; i++) {
	    		var value = dsCdCpList.cells(rowIndex, index++).getValue();
    			
    			if(value != "-") {
    				data.push({
    					x: month[pos++],
    					y: parseFloat(value)
    				});
    			}
    		}
	    	
	    	return data;
	    }

		function drawYtmTrendChart() {
			
	    	// 수익률
			var stdData1 = getYtmTrendData(1);
			var stdData2 = getYtmTrendData(3);
			var stdData3 = getYtmTrendData(4);
	    	
			var legendName = ["2017-01-10", "2017-01-06", "2017-01-04"];
			var setData = [stdData1, stdData2, stdData3];
			var seriesType = ['line', 'line', 'line'];
            var yTitle = "YTM(%)";
            
            // 그래프 호출
            graphYieldCurve = gfn_drawChart({
				chartOption: {
					divId: "chtYtmTrendList",					// div id (필수 값)
					zoomType: "xy"
				}
				,seriesOption: {
					name: legendName,					// 시리즈 별 name : array
					data: setData,						// 시리즈 별 data : array
					type: seriesType					// 시리즈 별 type : array
				}
				,yAxisOption: {
					yTitle: yTitle,				// y 축 타이틀 : default null
					fixedFormat: 3
				}
				,exportOption: {
					use: false							// file export use : default true
				}
			});
		}
		
		function _finalize() {
		}
		
		return {
            init : _init,
            finalize : _finalize
        };
    };
    
    var index = new Index();
    index.init();
    
})();

//# sourceURL=index.js