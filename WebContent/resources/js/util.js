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

