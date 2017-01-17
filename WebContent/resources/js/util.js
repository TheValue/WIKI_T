function cfGridInit(arrInfo, divGrid, pSkin, pImgPath){
	
	var imgPath = pImgPath || "resources/dhtmlx/css/imgs/";
	var skin = pSkin || "dhx_terrace";
	
	var obj;
	var divId = "";
	
	// divGrid는 
    // dhtmlxLayout에 attach된 그리드인 경우 이미 생성된 grid object를 넘겨받고
    // 그 외의 경우는 div id인 string을 넘겨받아 grid object를 새로 생성함 
	if(typeof divGrid === "string") {
		obj = new dhtmlXGridObject(divGrid);
		divId = divGrid;
	}
	else {
		obj = divGrid;
		divId = obj.entBox.id;
	}
	
	var arr = cfconvDHTMLXArray(arrInfo);
	
	obj.setColumnIds(arr.setColumnIds);
	obj.setHeader(arr.setHeader);
	obj.setInitWidths(arr.setInitWidths);
	obj.setColAlign(arr.setColAlign);
	obj.setColTypes(arr.setColTypes);
	obj.setColSorting(arr.setColSorting);
	obj.setSerializableColumns(arr.setXls);
	obj.setSkin(skin);
	obj.setImagePath(imgPath);
	
	//obj.setAwaitedRowHeight(22);  // smart rendering을 사용하고 default grid height 를 변경한 경우 사용(20->21)
	
	obj.enableColumnMove(false);
	obj.enableMultiselect(false);
	obj.enableColumnAutoSize(false);
	obj.enableBlockSelection(false);
	
	obj.setEditable(false);  //cell edit 불가
	
	//obj.enableSmartRendering(true);
	//obj.enableDistributedParsing(true,100,250);
	
	obj.init();

    obj.attachEvent("onXLS", function(){ 
        //cf_showLoadingPopup(divId); 
    });
    obj.attachEvent("onXLE", function(){ 
        //cf_hideLoadingPopup(divId);
        
        //if(obj.getRowsNum() == 0) {
        //	obj.showNoDataFoundImg();
        //}
    });
	
	return obj;
}
 
/*
 * 그리드용 배열로 json타입으로 return
 */
function cfconvDHTMLXArray(arr){
	
	var setColumnIds = "";
	var setHeader = "";
	var setInitWidths = "";
	var setInitHeights = "";
	var setColAlign = "";
	var setColTypes = "";
	var setColSorting = "";
	var setXls = "";
	var arrLength = arr.length;
	
	for(var i=0; i<arrLength; i++){
		var tmpArr = arr[i].split(",");
		setColumnIds	+=tmpArr[0]+",";
		setHeader		+=tmpArr[1]+",";
		setInitWidths	+=tmpArr[2]+",";
		setInitHeights	+=tmpArr[3]+",";
		setColAlign		+=tmpArr[4]+",";
		setColTypes		+=tmpArr[5]+",";
		setColSorting	+=tmpArr[6]+",";
		setXls			+=tmpArr[7]+",";
	}
	
	var newArr = {"setColumnIds":cutEndString(setColumnIds)
			,"setHeader":cutEndString(setHeader)
			,"setInitWidths":cutEndString(setInitWidths)
			,"setInitHeights":cutEndString(setInitHeights)
			,"setColAlign":cutEndString(setColAlign)
			,"setColTypes":cutEndString(setColTypes)
			,"setColSorting":cutEndString(setColSorting)
			,"setXls":cutEndString(setXls)};
	
	return newArr;
}
 
/*
 * 문자열 마지막 글자를 잘라낸 결과를 리턴
 */
function cutEndString(str){
	return str.substring(0,str.length-1);
}

function getDateText(txtDate) {
    var dt = $("#"+txtDate).val().replace(/-/gi,"");
    return dt;
}

function cfBatchRun(url, fnSuccess, isSync) {
	$.ajax({
		beforeSend: function(xhr) {
	        xhr.setRequestHeader("AJAX", true);
	    },
//		dataType : "json",
		type : "POST",
		url : url,
//		contentType : "application/json; charset=utf-8",
//		data : JSON.stringify(obj),
		async : (isSync)? false : true,  /* sync */
		success : fnSuccess || function(jsonData){
			console.log(data);
		},
		error : function(request){
			console.log("통신중 에러가 발생하였습니다.\n"+"code:"+request.status+"\nmessage:"+request.responseText);
		}
	});
}

function cfFind(url, obj, fnSuccess, isSync) {
	
	$.ajax({
		beforeSend: function(xhr) {
	        xhr.setRequestHeader("AJAX", true);
	    },
		dataType : "json",
		type : "POST",
		url : url,
		contentType : "application/json; charset=utf-8",
		data : JSON.stringify(obj),
		async : (isSync)? false : true,  /* sync */
		success : fnSuccess || function(jsonData){
			console.log(data);
		},
		error : function(request){
			console.log("통신중 에러가 발생하였습니다.\n"+"code:"+request.status+"\nmessage:"+request.responseText);
		}
	});
}



var g_loadingPopupList = new Array();
var g_cover;
var g_box;

// progress popup (bpo에서 가져옴)
function cf_loadingPopup(mode){
	if(!g_cover){
		g_cover = document.createElement("DIV");
		
		g_cover.className = "dhx_modal_cover";
		//g_cover.style.backgroundColor = "transparent";  // ie에서는 backgroundColor를 transparent로 하면 배경을 클릭할 수 있음
		g_cover.style.backgroundColor = "#324234";
		g_cover.style.filter = "alpha(opacity = 0)";  //necessary for IE only
		g_cover.style.opacity = "0.0";
		
		var height = $(".container-main").height();
		
		g_cover.style.top = "0px";  
		g_cover.style.width = "98%";  
		g_cover.style.height = height + "px";  
		
		g_cover.style.position = "absolute";  // 기본 position이 fixed 였는데 absolute로 수정
		
		// body가 아니라 .contents 내부에 생성함
		document.body.appendChild(g_cover);
		$(".container-main").append(g_cover);  
		//////////////////////////////////////////////////
		
		
		g_box = document.createElement("DIV");
    	g_box.style.width = "25px";
    	g_box.style.height = "25px";
    	g_box.className = "progressPopup";
    	var inner = "<img src=\"resources/images/progress.gif\" />";
    	g_box.innerHTML = inner;
    	
		g_box.style.position = "fixed";
		g_box.style.top = '50%';
		g_box.style.left = '50%';
		
		$(".container-main").append(g_box);
	}
	
	g_cover.style.display = mode?"inline-block":"none";
	g_box.style.display = mode?"inline-block":"none";
}

// 로딩 팝업 띄우기
function cf_showLoadingPopup(id) {
	
	if(g_loadingPopupList.length == 0) {
		cf_loadingPopup(true);
	}

	g_loadingPopupList.push(id);
}

// 로딩 팝업 감추기
function cf_hideLoadingPopup(id) {

	var index = g_loadingPopupList.indexOf(id);
	if(index >= 0) {
		g_loadingPopupList.splice(index, 1);
	}
	
	if(g_loadingPopupList.length == 0) {
		cf_loadingPopup(false);
	}
}

// 로딩 팝업 초기화
function cf_initLoadingPopup() {
	g_loadingPopupList.length = 0;
	g_cover = null;
	g_box = null;
}

