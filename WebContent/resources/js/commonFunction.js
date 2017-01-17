/**
 * 각 화면에서 공통으로 사용하는 함수들을 모아 놓은 파일.
 * <pre>
 * Note :
 * 
 * 
 * History :
 * 2008.09.01 created. (Younghwan.KO.)
 * </pre>
 * 
 * @author Younghwan.KO.
 * @version 1.0
 * @since 2009.06.04
 * @see 기능추가 - 이성일
 */
var GLB_URL_CONTEXT         = "";
//엑셀출력source 지정
var GLB_EXCEL_ACTION        = "../dml/CreateStr2Xml4Xls.jsp";
var GLB_EXECUTE_URL         = GLB_URL_CONTEXT+"/jsp/dml/ExecuteQuery.jsp";
// 세자리마다 comma를 찍는 함수
function number_format(f) {
 var val = f.value;
 var len = val.length;
 var number_format1 = "", number_format2 = "";
 var c = 0;
 
 if(val.charCodeAt(len-1)<48 || val.charCodeAt(len-1)>57) {
  alert("숫자만 입력해주세요");
  f.value = val.substr(0, (len-1));
 }else{
     if(len > 3) {   
         for(i = 0 ; i < len; i++){
    one = val.charAt(i)
    if(one != ",") number_format1 += one;
         }
   var number_format1_len = number_format1.length;
   var in_c = number_format1_len%3;
   if(!in_c) in_c = 3;
   
   for(i = 0 ; i < number_format1_len; i++){
    number_format2_one = number_format1.charAt(i)
    if(i == in_c){
     number_format2 += ",";
     in_c = 3+in_c;
    }
    number_format2 += number_format2_one;
         }
         f.value = number_format2;
     }
 }
}

function percent_format(f, limit) {
    var val = f.value;
    var len = val.length;
    if(val.charCodeAt(len-1)<48 || val.charCodeAt(len-1)>57) {
        if(val.charAt(len-1) != ".") {
            alert("숫자만 입력해주세요");
            f.value = val.substr(0, (len-1));
        }
    }
    if(val > limit) {
        alert("입력된 값이 [" + limit + "] 보다 큽니다.");
        f.value = limit;
    }
}

/*
 * 선택된 날짜를 가져온다
 */
function getCalValue(txtCal) {
    var calValue = $("#"+txtCal).val().replace(/-/gi,"");
    return calValue;
}

/**
 * 그리드의 행병합을 해준다.
 * 저장또는 엑셀출력에 해당하는 컬럼에는 사용하지 말것
 * gd 그리드객체
 * colIdx ColumnIndex
 */         

function f_setRowSpan(gd, colIdx){
    var cnt = 0;
    var sRowId;
    var rowCnt = gd.getRowsNum();
    var cw  = "";
    if(rowCnt>0){
        sRowId = gd.getRowId(0);            
        cw = gd.getCellValue(sRowId, colIdx)
    }else{
        return;
    }   
            
    for(r=0;r<rowCnt;r++){
        var rowId = gd.getRowId(r);
        if(cw == gd.getCellValue(rowId, colIdx)){
            cnt++;
        }else{
            gd.setRowspan(sRowId,colIdx,cnt);
            cw = gd.getCellValue(rowId, colIdx, cnt);
            cnt = 1;
            sRowId = rowId;
        }
    }
    gd.setRowspan(sRowId,colIdx,cnt);
}

function f_setRowSpan2(gd, colIdx1, colIdx2){
	
	var cnt = 0;
	var sRowId;
	var rowCnt = gd.getRowsNum();
	var cw  = "";
	
	if(rowCnt>0){
		sRowId = gd.getRowId(0);     
		cw = gd.getCellValue(sRowId, colIdx2); 
	}else{
		return;
	}   
	
	for(var r=0;r<rowCnt;r++){
		var rowId = gd.getRowId(r);
		if(cw == gd.getCellValue(rowId, colIdx2) && cw == gd.getCellValue(rowId, colIdx1)){
			cnt++;
		}else{
			if(cnt>0) {	 // cnt가 0일 때 ie7 script error 발생 
				gd.setRowspan(sRowId,colIdx2,cnt);
			}
			cw = gd.getCellValue(rowId, colIdx2, cnt);
			cnt = 1;
			sRowId = rowId;
		}
	}
	
	if(cnt>0) {  // cnt가 0일 때 ie7 script error 발생
		gd.setRowspan(sRowId,colIdx2,cnt);
	}
}


/*
 * 그리드의 내용을 배열로 만들어 리턴한다.
 */            
//포함목록을 배열로 만들어 리턴한다.            
function gridToArray(grid) {
    var contents="";
    for (var i=0; i<grid.getRowsNum(); i++) {
        if (grid.rowsCol[i].style.display=="none") continue;
        
        var c=grid.cells(grid.rowsCol[i].idd, 0);
        if (c._setState) var value="";
        else if (c.getContent) value = c.getContent();
        else if (c.getImage || c.combo) var value=c.cell.innerHTML;
        else var value = c.getValue();
        contents += (value);
        for (var j=1; j<grid.getColumnsNum(); j++) {
            var c=grid.cells(grid.rowsCol[i].idd, j);
            if (c._setState) var value="";
            else if (c.getContent) value = c.getContent();
            else if (c.getImage || c.combo) var value=c.cell.innerHTML;
            else var value = c.getValue();
            
//            if(j == grid.getColumnsNum()-1) {
//                contents += '|'+(i);
//            }
//            else {
                contents += '|'+(value);
//            }
        }
        contents += "||";
    }
    contents = contents.substring(0, contents.length - 1);
    
    var incArray = new Array();
    var tmpArray = contents.split("||");
    
    for(var ac=0; ac<tmpArray.length; ac++) {
        incArray[ac] = tmpArray[ac].split("|");
    }
    return incArray;
}

/*
 * 콤보박스의 선택된 값을 가져온다.
 */
function getComboSelectedValue(objCbo, gbn) {
    var sel;
    if(gbn == "idx")
        sel = objCbo.getSelectedIndex();
    else if(gbn == "txt")
        sel = objCbo.getSelectedText();
    else if(gbn == "val") 
        sel = objCbo.getSelectedValue();
    return sel;
}

/*
 * 트리의 선택된 id를 가져온다.
 */
function getSelVal(id) {
    //return id;
    alert(id);
}

/*
 * 그리드 내용을 엑셀로 출력
 */
function viewExcel(objFrm, objGrid, strSubject) {
//    objFrm.exContents.value = objGrid.getExcel();
//    objFrm.action = "/mro/jsp/Common/Excel.jsp";
//    objFrm.submit();
    
    var temp_table  = document.createElement('<TABLE>');
    var temp_tobody = document.createElement('<TBODY>');    
    var temp_tr     = null;
    var temp_td     = null;
    var temp_width  = null;
    
    temp_table.style.border = '1';
    
    /*헤더.*/
    for(var rowcnt=1; rowcnt<objGrid.hdr.rows.length;rowcnt++){

        temp_tr     = document.createElement('<TR>');
        temp_tobody.appendChild(temp_tr);

        for(var colcnt=0; colcnt<objGrid.getColumnsNum();colcnt++){
            if(objGrid.isColumnHidden(colcnt)){
                continue;
            }else{
                temp_td = document.createElement('<TD align=center>');
                temp_td.innerHTML = objGrid.hdr.rows[rowcnt].cells[colcnt].innerHTML;
                temp_tr.appendChild(temp_td);
            }    
        }
        temp_tobody.appendChild(temp_tr);
    }
    
    /*데이타*/
    for(var rowcnt=0; rowcnt<objGrid.getRowsNum();rowcnt++){
        temp_tr     = document.createElement('<TR>');        
        temp_tobody.appendChild(temp_tr);
        
        for(var colcnt=0; colcnt<objGrid.getColumnsNum();colcnt++){
            if(objGrid.isColumnHidden(colcnt)){
                continue;
            }else{
                var tdObj = objGrid.cells2(rowcnt,colcnt).cell;
                temp_td = document.createElement('<TD align='+tdObj.style.textAlign+'>');
                temp_td.innerHTML = tdObj.innerHTML;
                temp_tr.appendChild(temp_td);
            }
        }
        temp_tobody.appendChild(temp_tr);            
    }    
    temp_table.appendChild(temp_tobody);
        
    var htmlText = temp_table.innerHTML;
    if(strSubject == null) {
        htmlText = "<TABLE border=1>" + htmlText + "</TABLE>";
    }
    else {
        htmlText = "<table><tr><td>"+strSubject+"</td></tr></table><TABLE border=1>" + htmlText + "</TABLE>";
    }
    htmlText = htmlText.replace(/<\/TD><\/TR><\/TABLE>/gi, "</TABLE>");

    objFrm.exContents.value = htmlText;
    objFrm.action = GLB_URL_CONTEXT+"/jsp/Common/Excel.jsp";
    objFrm.submit();
}

/*
 * 그리드 내용을 html로 출력
 */
function viewHTML(objGrid) {
    objGrid.printView();
}

/*
 * 트리아이템 휴지통에 dnd 삭제
 */
function itemTrash() {    
    this._drag=function(sourceHtmlObject,dhtmlObject,targetHtmlObject) {
        targetHtmlObject.style.backgroundColor="";
        targetHtmlObject.value=sourceHtmlObject.parentObject.id;
       
        if(dhtmlObject == tree2) {
            dhtmlObject.deleteItem(sourceHtmlObject.parentObject.id);
        }
        
        targetHtmlObject.style.backgroundImage="url('"+GLB_URL_CONTEXT+"/images/TrashFull.png')";
    }
 
    this._dragIn=function(htmlObject,shtmlObject) {
        htmlObject.style.backgroundColor="#fffacd";
        htmlObject.style.backgroundImage="url('"+GLB_URL_CONTEXT+"/images/TrashBlank.png')";
        return htmlObject;
    }
 
    this._dragOut=function(htmlObject) {
        htmlObject.style.backgroundColor="";
        htmlObject.style.backgroundImage="url('"+GLB_URL_CONTEXT+"/images/TrashFull.png')";
        return this;
    }
}

/*
 * 트리 drop event가 자기 자신일경우 drop 불가
 */
var id, pid;

function  disableSelfDrop(id_drag, id_landing, treeObj) {
    id = id_drag;
    pid = treeObj.getParentId(id);
    return false;
}

/*
 * 콤마로 구분된 문자열 2개를 받아 두문자열간에 같은 단어가 있는지 검사
 */
function  checkSameWord(str1, str2) {
    var arrStr1 = str1.split(",");
    var arrStr2 = str2.split(",");
    
    for(i=0; i<arrStr1.length; i++) {
        for(j=0; j<arrStr2.length; j++) {
            if(arrStr1[i] == arrStr2[j]) {
                return false;
            }
        }
    }
    return true;
}

/*
 * 버튼 클릭시 달력을 보여주고 다시 한번 클릭시 달력을 닫는다.
 */
function btnCalendarOnClick() {
    var divCal = arguments[0];
    var calSeq = arguments[1];
    
    var calStat = arrCalStat[calSeq];
    
    if(calStat == 0 || calStat == null) {
        $("#"+divCal).css("display", 'block');
        arrCalStat[calSeq] = 1;
        
    }
    else {
        $("#"+divCal).css("display", 'none');
        arrCalStat[calSeq] = 0;
    }
    /*
    var objLayer = $(divCal);    
    
    document.body.onclick = function() {
        var tName = event.srcElement.id;
        
        if(tName != btnID) {
            objLayer.style.display = 'none';
        }
    }
    */
}

/*
 * 달력이 from ~ to 일 경우 하나보여주면 하나는 감춘다.
 */
function showHideCalendarFromTo(divCal1, divCal2) {
    $("#"+divCal1).css("display", 'block');    
    $("#"+divCal2).css("display", 'none');
}

/*
 * 달력 감추기
 */
function hideCalendar(divCal) {
    var $objLayer = $("#"+divCal);
    if(mouseStatus == "out") {
        $objLayer.css("display", 'none');
    }
}

function hideCalendarFromTo(divCal1, divCal2) {
    $("#"+divCal1).css("display", 'none');
    $("#"+divCal2).css("display", 'none');
}

/*
 * 날짜 필드 초기값 세팅
 */
function setDateField(txtDate, objCal, addDay) {
    objCal.setDate(addDate(addDay));
    $("#"+txtDate).val(objCal.getFormatedDate(null,objCal.getDate()));
}

/*
 * 날짜 필드 초기값 세팅
 */
function setDateFieldBatch(txtDate, objCal, batchDate, addDay) {
    if(batchDate != null) {
        objCal.setDate(addDateBatch(batchDate, addDay));
        $("#"+txtDate).val(objCal.getFormatedDate(null,objCal.getDate()));
    }
}

/*
 * 날짜 계산
 */
function addDate(addDay) {
    var newDate = new Date();
    var processTime = newDate.getTime() + (parseInt(addDay) * 24 * 60 * 60 * 1000);
    newDate.setTime(processTime);
    
    return newDate;
}

/*
 * 날짜 계산
 */
function addDateBatch(batchDate, addDay) {
    var newDate = batchDate;
    var processTime = newDate.getTime() + (parseInt(addDay) * 24 * 60 * 60 * 1000);
    newDate.setTime(processTime);
    
    return newDate;
}

/*
 * 두날짜사이의 일수 구하기
 */
function getPeriodDays(fDate, tDate) {
    var fromDate = getUserDate(fDate);
    var toDate = getUserDate(tDate);
    var days = Math.ceil((toDate - fromDate) / 1000 / 24 / 60 / 60);
    
    return days;
}


/*
 * 두날짜사이의 일수 구하기
 * a, b는 date type
 */
function getDateDiffInDays(a, b) {
	
	var _MS_PER_DAY = 1000 * 60 * 60 * 24;
	
	// Discard the time and time-zone information.
	var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
	var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
	
	return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}


/*
 * 날짜 가져오기
 */
function getDateText(txtDate) {
    var dt = $("#"+txtDate).val().replace(/-/gi,"");
    
    return dt;
}

/*
 * tab url 변경
 */
function changeUrl(tabObj, tabID, Url) {
    tabObj.setContentHref(arrID[i], tabID, Url);
}

/*
 * 파라미터의 데이터 타입이 배열인지 아닌지 판별
 */
function isArray(obj) {
   if (obj.constructor.toString().indexOf("Array") == -1)
      return false;
   else
      return true;
}

/*
 * lTrim 함수 - 왼쪽 공백 제거
 */
String.prototype.lTrim = function() {
    var re = /\s*((\S+\s*)*)/;
    return this.replace(re, "$1");
}
 
/*
 * rtrim 함수 - 오른쪽 공백 제거
 */
String.prototype.rTrim = function() {
    var re = /((\s*\S+)*)\s*/;
    return this.replace(re, "$1");
}

/*
 * trim 함수 - 공백 제거
 */
String.prototype.trim = function() {
        return this.lTrim().rTrim();
    }

/*
 * 넘버 포멧 함수-숫자에 1000단위로 , 를 찍고 소수점 반올림한다.
 */
String.prototype.numberFormat=function(mask) {
    if(isNaN(this)) {
        return this;
    }
    else {
        var symbol = "";
        var intPart = "";
        var decPart = "";
        var tValue = "";    

        if(mask == null || mask == "") {
            if(this == "") {
                return this;
            }
            rtnValue = Math.round(new Number(this)) + "";
            return rtnValue.replace(/(\d)(?=(?:\d{3})+(?!\d))/g,'$1,');
        }
        else {
            if(mask.split(",").length == 2) {
                symbol = mask.split(",")[1];
            }
        }
        
        if(symbol.trim() != "") {
            if(this == "0") {
                var tStr = this + ".";
                for(var cn=0; cn<mask.getCharCnt("#"); cn++) {
                    tStr += "0";
                }
                return tStr + symbol;
            }
            if(this == "") {
                return this;
            }
            tValue = (new Number(this)*100).extRound(mask.split(",")[0].length) + "";
        }
        else {
            tValue = new Number(this).extRound(mask.split(",")[0].length) + "";
        }

        if(tValue.indexOf(".") > -1) {
            intPart = tValue.split(".")[0].length == 0 ? "0" : tValue.split(".")[0].replace(/(\d)(?=(?:\d{3})+(?!\d))/g,'$1,');
            decPart = tValue.split(".")[1];
              
            if(decPart.length < mask.split(",")[0].length-1) {
                var tmpDecPart = decPart;
                for(var i=0; i<mask.split(",")[0].length-1-decPart.length; i++) {
                    tmpDecPart += "0";
                }
                decPart = tmpDecPart;
            }
                    
            return intPart.replace(/(\d)(?=(?:\d{3})+(?!\d))/g,'$1,') + "." + decPart + symbol;
        }        
        else {
            return tValue.replace(/(\d)(?=(?:\d{3})+(?!\d))/g,'$1,') + symbol;
        }
    }
}

/*
 * 문자열에 포함된 특정 문자의 갯수 리턴
 */
String.prototype.getCharCnt = function(ch) {
    var orgLen = this.length;
    
    var reg = "/"+ch+"/gi";
    
    changeLen = this.replace(eval(reg), "").length;

    return orgLen - changeLen;
}

/*
 * 소수 pos번째 자리에서 반올림.
 */
Number.prototype.extRound = function(pos) {
    var rtn;
    rtn = Math.round(this * Math.pow(10, Math.abs(pos)-1));
    rtn = rtn / Math.pow(10, Math.abs(pos)-1);    

    return rtn;
}


var xmlHttpReq;
/*
 * XMLHttpRequest 객체 생성
 */
function createXMLHttpRequest() {
    //IE
    if (window.ActiveXObject) {
        try {
            return new ActiveXObject("Msxml2.XMLHTTP");
        } catch (ex) {
            try {
                return new ActiveXObject("Microsoft.XMLHTTP");
            } catch (exms) {
                return null;
            }
        }        
    }
    //기타 브라우져
    else if (window.XMLHttpRequest) {
        return new XMLHttpRequest();
    }
    else {
        return null;
    }
}

/*
 * sql key와 sql 파라미터를 문자열로 만든다
 */
function setParameters(parms, queryKey, devNum, sStr, tStr) {    
    var parmString= "sql_parms=";
    if(parms != null) {
        if($("#"+parms[0]).get(0) == null || $("#"+parms[0]).get(0) == "0") {
            for(var i=0; i<parms.length; i++) {
                if(i < parms.length-1) {
                    parmString += encodeURIComponent(parms[i]) + "~!~";
                }
                else {
                    parmString += encodeURIComponent(parms[i]);
                }
            }
        }
        else {
            for(var i=0; i<parms.length; i++) {
                if(i < parms.length-1) {
                    parmString += encodeURIComponent($("#"+parms[i]).val()) + "~!~";
                }
                else {
                    parmString += encodeURIComponent($("#"+parms[i]).val());
                }
            }
        }
    }
    parmString = parmString + "&sql_key=" + queryKey + "&dev_no=" + devNum;
    
    if(sStr != null && tStr != null) {
        parmString = parmString + "&from=" + sStr + "&to=" + tStr;
    }
    
    return parmString;
}

/*
 * sql key와 sql 파라미터를 문자열로 만든다
 */
function setParametersNoURIEncode(parms, queryKey, devNum, sStr, tStr) {    
    var parmString= "sql_parms=";
    if(parms != null) {
        for(var i=0; i<parms.length; i++) {
            if(i < parms.length-1) {
                parmString += parms[i] + "~!~";
            }
            else {
                parmString += parms[i];
            }
        }
    }
    parmString = parmString + "&sql_key=" + queryKey + "&dev_no=" + devNum;
    
    if(sStr != null && tStr != null) {
        parmString = parmString + "&from=" + sStr + "&to=" + tStr;
    }
    
    return parmString;
}

/*
 * sql key와 sql 파라미터를 문자열로 만든다(한번에 여러건 처리하는 Batch사용시)
 */
function setParametersBatch(parms, queryKey, devNum, sStr, tStr) {    
    var parmString= "sql_parms=";
    if(parms != null) {
        //parmString += encodeURIComponent(parms);
        parmString += parms;
    }
    parmString = parmString + "&sql_key=" + queryKey + "&dev_no=" + devNum;
    
    if(sStr != null && tStr != null) {
        parmString = parmString + "&from=" + sStr + "&to=" + tStr;
    }
    
    return parmString;
}

/*
 * sql key와 sql 파라미터를 문자열로 만든다(자바메소드 실행)
 */
function setParametersJava(parms, queryKey, devNum, menuId, userId) {    
    var parmString= "sql_parms=";
    if(parms != null) {
        if($("#"+parms[0]).get(0) == null || $("#"+parms[0]).get(0) == "0") {
            for(var i=0; i<parms.length; i++) {
                if(i < parms.length-1) {
                    parmString += encodeURIComponent(parms[i]) + "~!~";
                }
                else {
                    parmString += encodeURIComponent(parms[i]);
                }
            }
        }
        else {
            for(var i=0; i<parms.length; i++) {
                if(i < parms.length-1) {
                    parmString += encodeURIComponent($("#"+parms[i]).val()) + "~!~";
                }
                else {
                    parmString += encodeURIComponent($("#"+parms[i]).val());
                }
            }
        }
    }
    parmString = parmString + "&sql_key=" + queryKey + "&dev_no=" + devNum + "&menu_id=" + menuId + "&user_id=" + userId;
    return parmString;
}

/*
 * 서버로 전송
 */
function sendRequest(url, params, callback, method) {
    xmlHttpReq = createXMLHttpRequest();
    var httpMethod = method ? method : 'POST';
    if (httpMethod != 'GET' && httpMethod != 'POST') {
        httpMethod = 'POST ';
    }
    var httpParams = (params == null || params == '') ? null : params;
    var httpUrl = url;
    if (httpMethod == 'GET' && httpParams != null) {
        httpUrl = httpUrl + "?" + httpParams;
    }
    xmlHttpReq.open(httpMethod, httpUrl, false);
    xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xmlHttpReq.onreadystatechange = callback;
    xmlHttpReq.send(httpMethod == 'POST' ? httpParams : null);
}

/*
 * 파일 확장자 검사 엑셀 파일만 가능
 */
function checkExt(fieldId) {
    var extName = "\\.(xls|xlsx)$";
    if((new RegExp(extName, "i")).test($("#"+fieldId).val())) return true;
    alert("엑셀 파일이 아닙니다.");
    $("#"+fieldId).get(0).focus();
    return false;
}


/*
 * 
 * DHX와 연계된 excel 출력용으로 사용
 * SERVER로 부터 데이터를 스트링형태로 받아 libWebToExcel.dll과 연계처리한다.
 * libWebToExcel.dll과 연계처리한다.
 * resultSet data를 String으로 생성
 */
XlsData = function(ObjGrd,httpURL){
    this.xlData;
    var ppu = ObjGrd.xmlFileUrl;
    var httpParams = ppu.substring(ppu.indexOf("?")+1, ppu.length).replaceAll("::","~!~").replace("&key","&sql_key").replace("&args","&sql_parms");
    var httpMethod = "POST";
    sendRequest(httpURL, httpParams,
    function(){if(xmlHttpReq.readyState==4){if(xmlHttpReq.status==200){getTermMiliSec();this.xlData = xmlHttpReq.responseText.trim();}}}, httpMethod);
}
XlsData.prototype={getData:function(){getTermMiliSec();return xlData;}}

/*
 * excel 출력함수 엑셀2003부터 지원하는 xml포멧을 이용한 엑셀 출력 객체
 * CreateStr2Xml4Xls.jsp와 함께 사용해야한다.
 * xml로 저장된 엑셀서식에 조회된 resultSet data를 xml서식으로 생성
 */
ExportXle = function(ifrm) {
    // member변수
    this.iXlsTitle    = "";
    this.iQry         = "";
    this.iParm        = "";
    this.iFormId      = "";
    this.setFormElement(ifrm);
};

ExportXle.prototype = {
    setTitle : function(sTtl) {
        this.iXlsTitle    = sTtl.replaceAll("|","~!~");
    },
    setQry : function(sQry) {
        this.iQry         = sQry;
    },
    setParm : function(sParm) {
        this.iParm        = sParm;
    },
    setFormId : function(sFormId) {
        this.iFormId      = sFormId;
    },
    setFormElement : function(ifrm) {
        var iXlsTitle = document.createElement("<input type=hidden id=iXlsTitle name=iXlsTitle>");
        var iQry = document.createElement("<input type=hidden id=iQry name=iQry>");
        var iParm = document.createElement("<input type=hidden id=iParm name=iParm>");
        var iFormId = document.createElement("<input type=hidden id=iFormId name=iFormId>");
        ifrm.appendChild(iXlsTitle);
        ifrm.appendChild(iQry);
        ifrm.appendChild(iParm);
        ifrm.appendChild(iFormId);
    },
    submit : function(ifrm) {
        ifrm.iXlsTitle.setAttribute("value", this.iXlsTitle);
        ifrm.iQry.setAttribute("value", this.iQry);
        ifrm.iParm.setAttribute("value", this.iParm);
        ifrm.iFormId.setAttribute("value", this.iFormId);
        ifrm.setAttribute("action",GLB_EXCEL_ACTION);
                    
        //document.charset      = "utf-8";
        ifrm.submit();
    }
}
/*
 * query 결과를 array 저장해놓은 클래스
 */
Dataset = function(data) {
    // member변수
    this.rsArray = new Array();
    this.rsOrgArray = new Array();
    this.rowCount = 0;
    this.colCount = 0;
    this.ds = data.replace(/null/gi, " ").split("||");

    this.keys = this.ds[0].split("|");
    
    for(var i=1; i<this.ds.length; i++) {
        this.rsArray[i-1] = this.ds[i].split("|");
    }
    
    this.rsOrgArray = this.rsArray;
    
    if(this.ds.length > 1) {
        this.rowCount = this.rsArray.length;
        this.colCount = this.keys.length;
    }
};

/*
 * Dataset Class 에서 사용하는 함수
 */
Dataset.prototype = {
    getRowCnt : function() {//row count return
        return this.rowCount;
    },
    getColCnt : function() {//column count return
        return this.colCount;
    },
    getKeyIdx : function(key) {//문자열 key가 몇번째 index인지 리턴
        var idx = 0;
        for(var i=0; i<this.keys.length; i++) {
            if(key == this.keys[i]) {
                idx = i;
                break;
            }
        }
        return idx;
    },
    getColumn : function(key, rowNum) {//해당 key의 rowNum 번째 행의 값을 리턴
        var colVal = this.rsArray[rowNum][this.getKeyIdx(key)];
        return colVal.trim();
    },
    getColumnByIdx : function(pRow, pCol) {//데이터셋의 pRow행의 pCol번째 컬럼값을 리턴
        var colVal = this.rsArray[pRow][pCol];
        return colVal.trim();
    },
    getKeyValue : function(keyID, valueField) {//ex) dsSystem.getKeyValue("key_id=login.pwd_fail_cnt.usage", "key_valu");
        var arrKey = keyID.split("=");
        
        var id = arrKey[0];//키
        var idValue = arrKey[1];//키값
        var idx = 0;
        
        for(var i=0; i<this.getRowCnt(); i++) {
            var vID = this.getColumn(id, i);

            if(vID == idValue) {
                idx = i;
                break;
            }
        }
        return this.getColumn(valueField, idx);
    },
    filter : function(column, strCond) {//dataset의 해당 column값이 strCond인거만 남기고 나머진 삭제
        var tempArray = new Array();
        for(var i=0; i<this.getRowCnt(); i++) {
            if(this.getColumn(column, i) == strCond) {
                tempArray[tempArray.length] = this.rsArray[i];
            }
        }
        
        this.rsArray = tempArray;
        this.rowCount = tempArray.length;
    },
    unFilter : function() {//dataset을 filter전으로 되돌린다.
        this.rsArray = this.rsOrgArray;
        this.rowCount = this.rsOrgArray.length;
    }
}


/**
 * @type   : function
 * @access : public
 * @desc   : 사용자의 입력값이 Byte로 환산된 최대길이를 넘을 경우 입력이 안되도록 하는 함수. <br>
 *           안타깝게도 Windows XP 환경에서는 한글에 대한 키이벤트가 발생하지 않아서 동작하지 않는다.<br>
 *           오브젝트 선언시 onkeydown 이벤트에 다음과 같이 기술해 주어야만 한다.
 * <pre>
 *     onkeydown="cfValidateMaxByteLength(this, max_byte_length)"
 *     (여기서 max_byte_length 자리에는 Byte로 환산시 최대길이를 숫자로 적어준다.)
 *
 *     예)
 *     &lt;input type="text" size="10" onkeydown="cfValidateMaxByteLength(this, 10)"&gt;
 * </pre>
 *           현재는 html의 text input, textarea 와 가우스의 EMEdit 에만 적용된다.
 * @sig    : oElement, length
 * @param  : oElement required 입력필드 객체
 * @param  : length   required max byte length
 */
function cfValidateMaxByteLength(oElement, length) {
    var value = "";

    if (event.keyCode == 8 ||   // backspace
        event.keyCode == 35 ||  // end key
        event.keyCode == 36 ||  // home key
        event.keyCode == 37 ||  // left key
        event.keyCode == 38 ||  // up key
        event.keyCode == 39 ||  // right key
        event.keyCode == 40 ||  // down key
        event.keyCode == 46     // delete key
       ) {
           return true;
    }

    switch (cfGetElementType(oElement)) {
        case "TEXT" :
        case "TEXTAREA" :
            value = oElement.value;
            break;

        case "GE" :
        case "GTA" :
            value = oElement.Text;
            break;

        default :
            return;
    }

    if (cfGetByteLength(value) > length ) {
          oElement.blur();
        oElement.focus();
         oElement.value = oElement.value.substr(0, oElement.value.length - 1);
        event.returnValue = false;
        return;
    }

    if (oElement.onkeyup == null) {
        oElement.onkeyup =
            function() {
                if (cfGetByteLength(oElement.value) > length) {
                    oElement.blur();
                    oElement.focus();
                    oElement.value = oElement.value.substr(0, oElement.value.length - 1);
                }
            }
    }

    if (cfGetByteLength(value) == length ) {
       // 완성한글 : 0xAC00 <= c && c <= 0xD7A3
       // 자음 : 0x3131 <= c
       // 모음 : c <= 0x318E
        var c = value.charCodeAt(value.length - 1);

        if ( (0xAC00 <= c && c <= 0xD7A3) || (0x3131 <= c && c <= 0x318E) ) {
            event.returnValue = true;
        } else {
            event.returnValue = false;
        }
    } else {
        event.returnValue = true;
    }
}

/*
 * text field validation 체크
 */
function fieldCheck(id, txt, minLen, maxLen) {
    var regEx = null;
    var reEn = "^[a-zA-Z\-\_\\d\\s]{" + minLen + "," + maxLen + "}$"; // space 추가 (2009.03.10)
    //var reKr = "^[a-zA-Zㄱ-ㅎㅏ-ㅣ가-?\-\_\\d\\s]{" + minLen + "," + maxLen + "}$";  // space 추가 (2009.03.10)

    var reKr = "^[a-zA-Zㄱ-ㅎㅏ-ㅣ가-하\-\_\\d\\s]{" + minLen + "," + maxLen + "}$";  // space 추가 (2009.03.10)
    
    var obj = $("#"+id).get(0);
    var iMode = obj.style.imeMode;
    
    if(iMode == "disabled") {
        regEx = new RegExp(reEn, "g");
    }
    else {
        regEx = new RegExp(reKr, "g");
    }
    
    obj.value = obj.value.trim(); // 추가 (2009.03.10)
    
    if(regEx.test(obj.value) && obj.value.length >= minLen) {
        return true;
    }
    else {
        if(iMode == "disabled") {
            alert(txt+"는(은) " + minLen + "자 이상 "+ maxLen +"자 이하 영문/숫자만 가능합니다.");
        }
        else {
            alert(txt+"는(은) " + minLen + "자 이상 "+ maxLen +"자 이하 영문/한글/숫자만 가능합니다.");
        }
        obj.focus();
        return false;
    }
}

/*
 * 단어 체크
 */
function checkWord(str, txt, minLen, maxLen) {
    var regEx = null;
    var re = "^[a-zA-Zㄱ-ㅎㅏ-ㅣ가-?\-\_\\d]{" + minLen + "," + maxLen + "}$";
    
    regEx = new RegExp(re, "g");
    
    if(regEx.test(str) && str.length >= minLen) {
        return true;
    }
    else {
        alert(txt+"는(은) " + minLen + "자 이상 "+ maxLen +"자 이하 영문/한글/숫자만 가능합니다.");
        return false;
    }
}

/*
 * text field validation 체크 숫자만
 */
function fieldCheckNum(id, txt, minLen, maxLen, isChkLen) {
    var regEx = null;
    var rtnMsg = "";
    var re1 = "^[\\d]{" + minLen + "," + maxLen + "}$";
    var re2 = "^[\\d]{" + minLen + ",}$";
    
    if(isChkLen) {
        regEx = new RegExp(re1, "g");
        rtnMsg = txt + "는(은)" + minLen + "자리이상 " + maxLen + "자리 이하 숫자만 가능합니다."
    }
    else {
        regEx = new RegExp(re2, "g");
        rtnMsg = txt + "는(은)" + "숫자만 가능합니다."
    }    
    
    var obj = $("#"+id).get(0);
    var rs = regEx.test(obj.value);
    
    if(rs) {
        return true;
    }
    else {
        alert(rtnMsg);
        obj.focus();
        return false;
    }
}

/*
 * 날짜 기간일경우 from이 to보다 큰지 확인
 */
function dateCheck(fromID, toID) {
    var fDate = $("#"+fromID).get(0);
    var tDate = $("#"+toID).get(0);
    
    if(fDate.value <= tDate.value) {
        return true;
    }
    else {
        alert("시작일이 종료일보다 큽니다.");
        fDate.focus();
        return false;
    }
}

/*
 * textArea validation 체크
 */
function textCheck(id, txt, minLen, maxLen) {
    var obj = $("#"+id).get(0);
    
    if(obj.value.trim().length >= minLen) {
        return true;
    }
    else {
        alert(txt+"는(은) " + minLen + "자 이상 "+ maxLen +"자 이하로 입력 가능합니다.");
        obj.focus();
        return false;
    }
}

/*
 * 시스템 환경 변수를 DB에서 가져온다.
 */
var dsSystem = null;

function getSysEnv() {
    var httpParams = setParameters(null, "Common.getEnv");
    var callBackFunction = callBackGetSysEnv;
    var httpMethod = "POST";
    sendRequest(GLB_EXECUTE_URL, httpParams, callBackFunction, httpMethod);
}

/*
 * CallBack 함수 : getSysEnv()
 */
function callBackGetSysEnv() {
    if (xmlHttpReq.readyState == 4) {
        if (xmlHttpReq.status == 200) {
            var rsData = xmlHttpReq.responseText.trim();
            dsSystem = new Dataset(rsData);
        }
    }
}

/*
 * 시스템 환경 변수를 DB에서 가져온다.
 */
var dsResult = null;

function getResult(parms, key) {
    dsResult = null;
    var httpParams = setParameters(parms, key);
    var callBackFunction = callBackGetResult;
    var httpMethod = "POST";
    sendRequest(GLB_EXECUTE_URL, httpParams, callBackFunction, httpMethod);
}

/*
 * CallBack 함수 : getResult()
 */
function callBackGetResult() {
    if (xmlHttpReq.readyState == 4) {
        if (xmlHttpReq.status == 200) {
            var rsData = xmlHttpReq.responseText.trim();                        
            dsResult = new Dataset(rsData);
        }
    }
}

/*
 * 사용, 미사용을 인수로 받아 Y or N 을 리턴
 */
function getYN(v) {
    var rtn = "";
    
    if (v == "예") {
        rtn = "Y";
    }
    else {
        rtn = "N";
    }
    
    return rtn;
}

/*
 * 그리드에서 해당 rowId의 colIdx번째 column의 값을 가져온다.
 */
dhtmlXGridObject.prototype.getCellValue = function(rowId, colIdx) {
    //var rtnStr = this.cells(rowId, colIdx).cell.innerHTML.trim();
    var rtnStr = "";
    try{
        rtnStr = this.cells(rowId, colIdx).getValue();
    }catch(e){
    }
    return rtnStr;
}

/*
 * 그리드에서 해당 rowId의 colIdx번째 column의 값을 가져온다.
 */
dhtmlXGridObject.prototype.getCellText = function(rowId, colIdx) {
    var rtnStr = "";
    try{
        if(this.cellType[colIdx] == "coro" || this.cellType[colIdx] == "co"){
            rtnStr = this.cells(rowId, colIdx).cell.innerHTML.trim();
        }else{
            rtnStr = this.cells(rowId, colIdx).getValue();
        }
    }catch(e){
    }
    return rtnStr;
}

/*
 * 그리드에서 해당 rowId의 colIdx번째 column의 값을 설정한다.
 */
dhtmlXGridObject.prototype.setCellValue = function(rowId, colIdx, cellValue) {
    //this.cells(rowId, colIdx).cell.innerHTML = cellValue;
    this.cells(rowId, colIdx).setValue(cellValue);
}

/*
 * 그리드에서 해당 rowId의 colIdx번째 column의 값을 설정한다.
 */
dhtmlXGridObject.prototype.setCellText = function(rowId, colIdx, cellValue) {
    this.cells(rowId, colIdx).cell.innerHTML = cellValue;
}

/*
 * 그리드에서 해당 colIdx번 column의 배경색을 설정한다.
 */
dhtmlXGridObject.prototype.setBgColorCells = function(colIdx, colorValue) {
    this.forEachRow(function(id) {
        this.cells(id, colIdx).setBgColor(colorValue);
    });
}

/*
 * 그리드에서 해당 rowId의 colIdx번째 column의 배경색을 설정한다.
 */
dhtmlXGridObject.prototype.setBgColorCell = function(rowId, colIdx, colorValue) {
    this.cells(rowId, colIdx).setBgColor(colorValue);
}

/*
 * 그리드의 아이디를 얻어온다.
 */
dhtmlXGridObject.prototype.getId = function() {
    return this.entBox.id;
}

/*
 * html <select> 태그의 option 을 추가하는 함수
 */
var listID;
function addItems(id, keys, vals, isDB, devNo, siteLang){
	addItems2(id, keys, vals, "", isDB, devNo, siteLang);
}
function addItems2(id, keys, vals, andSql, isDB, devNo, siteLang) {
    var key  = keys;
    var args = vals;
    var slang = (siteLang==undefined)?'':siteLang;
    var httpMethod = "POST";
    listID = id;
    $("#"+listID).html("");
    if(isDB == 'st'){
        isDB = false;
        var len = key.length;
        key  = keys[0];
        args = vals.get(keys[0]);
        for(i=1;i<len;i++){
            key  += ","+ keys[i];
            args += ","+ vals.get(keys[i]);
        }
        args = args.split(",");
    }
    if(isDB) {
        var orgCode = devNo;
        var httpParams = "";
        if(devNo == null) {
            orgCode = "000000";
        }
        httpParams = setParameters([key,orgCode], "mro.cm.retrieveBasicCodeCombo", "cm.mrbc0031m0");
        httpParams += "&biz_key=cm.MRBC0031M0";
        httpParams += "&siteLang="+slang;
        httpParams += "&txtVal="+args;
        httpParams += "&pAndSql="+andSql;
        var htpURL = GLB_EXECUTE_URL;
        var callBackFunction = callBackAddItems;
        sendRequest(htpURL, httpParams, callBackFunction, httpMethod);
    }else{ 
        var txt = key.split(",");
        var val = args;
        if(txt.length != val.length) {
            alert("txt and val has differnt Count.")
            return;
        }
        if(txt.length ==0 || val.length == 0) {
            alert("txt, val length has 0.")
            return;
        }
        var selBox = $("#"+listID).get(0);
        for(var i=0; i<txt.length; i++) {
            var objNode = document.createElement("option");
            var text=document.createTextNode(txt[i]);
            objNode.setAttribute("value", val[i]);
            objNode.appendChild(text);
            selBox.appendChild(objNode);
        }
        var createdSelect = $("#"+listID).get(0).firstChild;
        createdSelect.selected = false;
    }
}

/*
 * CallBack 함수 : addItems()
 */
function callBackAddItems() {
    if (xmlHttpReq.readyState == 4) {
        if (xmlHttpReq.status == 200) {
            var rsData = xmlHttpReq.responseText.trim();
            var dsList = new Dataset(rsData);
            if(dsList.getRowCnt() > 0) {
                var selBox = document.getElementById(listID);
                for(var i=0; i<dsList.getRowCnt(); i++) {
                    var objNode = document.createElement("option");
                    var text=document.createTextNode(dsList.getColumn("txt", i));
                    objNode.setAttribute("value", dsList.getColumn("val", i));
                    objNode.appendChild(text);
                    selBox.appendChild(objNode);
                }
                var createdSelect = $("#"+listID).get(0).firstChild;
                createdSelect.selected = false;
                for(var j=0; j<dsList.getRowCnt(); j++) {
                    if(j%2 == 1) {
                        $("#"+listID).get(0).options[j].style.background = "#E5F2F8";
                    }
                    else  {
                        $("#"+listID).get(0).options[j].style.background = "#FFFFFF";
                    }
                }
            }
            else {
                alert("No more result");
            }
        }
    }
}

/*
 * select tag 옵션제거
 */
function removeOptions(obj){
    var cnt = obj.length;
    for(o=cnt;o>0;o--){
    obj.options[o-1] = null;
    }
}

/*
 * 돈단위 계산
 */
function moneyUnit(val, cbo) {
    var rtn;
    rtn = new Number(val) / new Number(getComboSelectedValue(cbo, 'val'));
    return rtn + "";
}

/*
 * TextArea의 경우 maxlength를 처리 하는 함수.
 */
function taLimit() {
    var strPreVal = "";
    if(this.value.length >= parseInt(this.getAttribute("maxlength"))) {
        this.value = strPreVal;
    }
    else {
        strPreVal = this.value;
    }
}

/*
 * 문서 전체의 입력 필드 Validation 체크
 */
function checkValidation(objs) {
    var validation = null;
    
    for(var i=0; i<objs.length; i++) {
        if(objs[i].getAttribute("validation") != null) {
            validation = objs[i].getAttribute("validation").split(",");
            
            if(validation.length == 4) {
                var flg = false;
                if(validation[2] == "num") {
                    flg = fieldCheckNum(objs[i].id, validation[3], parseInt(validation[0]), parseInt(validation[1]));
                }
                else if(validation[2] == "str") {
                    flg = fieldCheck(objs[i].id, validation[3], parseInt(validation[0]), parseInt(validation[1]));
                }
                else {
                    flg = textCheck(objs[i].id, validation[3], parseInt(validation[0]), parseInt(validation[1]));
                }
                
                if(!flg) {
                    return false;
                }
            }
        }        
    }
    return true;
}

/*
 * 현재 날짜시간을 밀리세컨드 단위까지 17자리 구함
 */
function getCurrentTimeMillies() {
    var dateObj = new Date();

    var yyyy = new String(dateObj.getFullYear());
    var mm = new String(dateObj.getMonth() + 1).length == 1 ? "0" + new String(dateObj.getMonth() + 1) : new String(dateObj.getMonth() + 1);
    var dd = new String(dateObj.getDate()).length == 1 ? "0" + new String(dateObj.getDate()) : new String(dateObj.getDate());
    var hh = new String(dateObj.getHours()).length == 1 ? "0" + new String(dateObj.getHours()) : new String(dateObj.getHours());
    var min = new String(dateObj.getMinutes()).length == 1 ? "0" + new String(dateObj.getMinutes()) : new String(dateObj.getMinutes());
    var sec = new String(dateObj.getSeconds()).length == 1 ? "0" + new String(dateObj.getSeconds()) : new String(dateObj.getSeconds());
    var mil = new String(dateObj.getMilliseconds());
    
    if(mil.length == 1) {
        mil = "00" + mil;
    }
    else if(mil.length == 2) {
        mil = "0" + mil;
    }

    var ctm = yyyy 
                    + mm
                    + dd
                    + hh
                    + min
                    + sec
                    + mil;
    return ctm;
}

/*
 * 년, 월, 일을 인수로 받아서 날짜객체를 만든후 리턴한다.
 */
function getUserDate(pYear, pMonth, pDay) {
    var dateObj = null;
    
    if(pMonth == null && pDay == null) {
        var arrDate = pYear.split("-");
        if(pYear.trim() != "") {
            dateObj = new Date(arrDate[0], new String(parseInt(arrDate[1])-1), arrDate[2]);
        }
        else {
            dateObj = null;
        }
    }
    else {
        dateObj = new Date(pYear, new String(parseInt(pMonth)-1), pDay);
    }
    
    return dateObj;
}

/*
 * 날짜를 yyyy-mm-dd 스트링형으로 리턴
 */
function getDateString(pDate) {
    var y = new String(pDate.getFullYear());
    var m = new String(pDate.getMonth() +1).length == 1 ? "0" + new String(pDate.getMonth() +1) : new String(pDate.getMonth() +1);
    var d = new String(pDate.getDate()).length == 1 ? "0" + new String(pDate.getDate()) : new String(pDate.getDate());
    return y + "-" + m +"-" + d;
}

/*
 * 그리드 url에 사용하는 파라미터문자열을 리턴
 */
function getGridUrlParms(arrParm) {
    var rtnStr = "args="+arrParm[0];
    for(var i=1; i<arrParm.length; i++) {
        rtnStr = rtnStr + "::" + arrParm[i];
    }
    
    return rtnStr;
}

/*
 * 체크박스 체크된 항목 가져오기
 */
function getCheckData(obj) {
    var rtn = "";
    for(var i=0; i<obj.length; i++) {
        if(obj[i].checked) {
            rtn += "," + "Y";
        }
        else {
            rtn += "," + "N";
        }
    }
    return rtn.substring(1).split(",");
}

/*
 * 도움말 클릭이벤트
 */
function btnHelpOnClick() {
    
    var menuId = arguments[1];
    var parms = [menuId];
    var httpParams = setParameters(parms, "Common.getHelpId", 5);
    var callBackFunction = callBackBtnHelpOnClick;
    var httpMethod = "POST";
    sendRequest(GLB_EXECUTE_URL, httpParams, callBackFunction, httpMethod);
}

/*
 * CallBack 함수 : btnHelpOnClick()
 */
function callBackBtnHelpOnClick() {
    if (xmlHttpReq.readyState == 4) {
        if (xmlHttpReq.status == 200) {
            var rsData = xmlHttpReq.responseText.trim();                        
            var dsHelp = new Dataset(rsData);
            if(dsHelp.getRowCnt()) {
                window.open('../Help/' + dsHelp.getColumn("help_id", 0), 'HELP', 'toolbar=0, status=0, scrollbars=yes, location=0, menubar=0, width=700, height=800');
            }
        }
    }
}

/*서버 에러 체크 */
function isSvrError(_rsData){
    var tmp_rsData = _rsData.replace(/\,/gi,'');
    
    if(isNaN(tmp_rsData)){
          return true;
    }else {
        return false;
    }
}

/*서버 에러 리턴 */
function getSvrErrorToString(_rsData){
    return _rsData;
}

/**
 * @type   : prototype_function
 * @object : String
 * @access : public
 * @desc   : 입력필드를 활성화, 비활성화
 * ex : cfEditStyleChange(document.all.colId, "disable");
 */
function cfEditStyleChange(Obj, vFlag) {

    if (vFlag == "disable") {

         Obj.readOnly = true;
         Obj.style.background="#f3f3f3";
         Obj.style.borderTopStyle = "none";
         Obj.style.borderLeftStyle = "none";
         Obj.style.borderRightStyle = "none";
         Obj.style.borderBottomStyle = "none";
         Obj.style.height = "20px";

    } else if (vFlag == "enable") {

         Obj.readOnly = false;
         Obj.style.background="white";
         Obj.style.borderTopStyle = "solid";
         Obj.style.borderLeftStyle = "solid";
         Obj.style.borderRightStyle = "solid";
         Obj.style.borderBottomStyle = "solid";
         Obj.style.height = "20px";
    }  
}

//-------------------------------------------------------------------------
// 그리드 정렬함수 첫째라인을 정렬에서 제외시킨다. -- 문자형
//-------------------------------------------------------------------------
    function CustomSort(a,b,ord,aid,bid) {
        if (aid == 1) return -1;
        if (bid == 1) return 1;
        return ((a>b)?1:-1)*(ord=="asc"?1:-1);
    }
//-------------------------------------------------------------------------
// 그리드 정렬함수 -- 문자형
//-------------------------------------------------------------------------
    function CustomSort0(a,b,ord,aid,bid) {
        if (aid == 0) return -1;
        if (bid == 0) return 1;
        return ((a>b)?1:-1)*(ord=="asc"?1:-1);
    }

//-------------------------------------------------------------------------
// 그리드 정렬함수 첫째라인을 정렬에서 제외시킨다.  -- 숫자형
//-------------------------------------------------------------------------
    function CustomSortNum(a,b,ord,aid,bid) {
        if (aid == 1) return -1;
        if (bid == 1) return 1;
        var p = a-b;
        return ((p>=0)?1:-1)*(ord=="asc"?1:-1);
    }
//-------------------------------------------------------------------------
// 그리드 정렬함수 -- 숫자형
//-------------------------------------------------------------------------
    function CustomSortNum0(a,b,ord,aid,bid) {
        if (aid == 0) return -1;
        if (bid == 0) return 1;
        var p = a-b;
        return ((p>=0)?1:-1)*(ord=="asc"?1:-1);
    }


/**
 * 파라미터의 ID 를 가지는 document 내의 콤보박스에서 현재 선택된 Text 를 가져온다.
 * @date 2009.10.21
 * @author 김정훈
 * @param objName: 콤보박스의 ID
 * @return 선택된 콤보박스의 Text
 */
function getComboSelectedText(objName) {
    var obj = document.getElementById(objName);
    if(obj.options.length==0) return "";
    return obj.options(obj.selectedIndex).text
}

//-------------------------------------------------------------------------
// 공통 엑셀 데이터셋 만들기 PARAMS: 그리드오브젝트, 컬럼수 RETURN: 엑셀데이터셋
// 2009.11.05 김정훈(서울보증보험 적용)
//-------------------------------------------------------------------------
    function setCommonExcelData(gridObj, colLength, useDataSet2) { 
        var strExcel = "";
        for(var i=1; i<=gridObj.getRowsNum();i++){    
            strExcel += "||";
            for(var j=1; j <= colLength; j++){
                if(j != 1){
                    strExcel += "|";
                }
                // 컬럼속성이 edn 이면서 값이 NULL 일 경우 "0"를 입력
                if(gridObj.getColType(j-1)=="edn" && gridObj.getCellText(i,j-1).toString()=="") strExcel += "0";
                else strExcel += gridObj.getCellValue(i,j-1).toString().replace(/(^\s*)|(\s*$)/g, " ");
            }
        }
    
        strExcel = strExcel.replace(/(&amp;)/gi,"&");

        if(!useDataSet2) {
            return new Dataset(strExcel.replace(/(,)/gi,""));
        } else {
            strExcel = strExcel.replace(/(&nbsp;)/gi," ");
            return new Dataset2(strExcel.replace(/(,)/gi,""));
        }
    }      

    

//-------------------------------------------------------------------------
//-------------------------------------------------------------------------

// 쿼리결과 저장 ARRAY 클래스 

//-------------------------------------------------------------------------
//-------------------------------------------------------------------------
Dataset2 = function(data) {
  // member변수
  this.rsArray = new Array();
  this.rsOrgArray = new Array();
  this.rowCount = 0;
  this.colCount = 0;
    this.ds = data.replace(/null/gi, "0").split("||");

    this.keys = this.ds[0].split("|");
    
    for(var i=1; i<this.ds.length; i++) {
        this.rsArray[i-1] = this.ds[i].split("|");
    }
    
    this.rsOrgArray = this.rsArray;
    
    if(this.ds.length > 1) {
        this.rowCount = this.rsArray.length;
        this.colCount = this.keys.length;
    }
};

/*
* Dataset Class 에서 사용하는 함수
*/
Dataset2.prototype = {
    getRowCnt : function() {//row count return
        return this.rowCount;
    },
    getColCnt : function() {//column count return
        return this.colCount;
    },
    getKeyIdx : function(key) {//문자열 key가 몇번째 index인지 리턴
        var idx = 0;
        for(var i=0; i<this.keys.length; i++) {
            if(key == this.keys[i]) {
                idx = i;
                break;
            }
        }
        return idx;
    },
    getColumn : function(key, rowNum) {//해당 key의 rowNum 번째 행의 값을 리턴
        var colVal = this.rsArray[rowNum][this.getKeyIdx(key)];
        return colVal.trim();
    },
    getColumnByIdx : function(pRow, pCol) {//데이터셋의 pRow행의 pCol번째 컬럼값을 리턴
        var colVal = this.rsArray[pRow][pCol];
        return colVal;
    },
    getKeyValue : function(keyID, valueField) {//ex) dsSystem.getKeyValue("key_id=login.pwd_fail_cnt.usage", "key_valu");
        var arrKey = keyID.split("=");
        
        var id = arrKey[0];//키
        var idValue = arrKey[1];//키값
        var idx = 0;
        
        for(var i=0; i<this.getRowCnt(); i++) {
            var vID = this.getColumn(id, i);

            if(vID == idValue) {
                idx = i;
                break;
            }
        }
        return this.getColumn(valueField, idx);
    },
    filter : function(column, strCond) {//dataset의 해당 column값이 strCond인거만 남기고 나머진 삭제
        var tempArray = new Array();
        for(var i=0; i<this.getRowCnt(); i++) {
            if(this.getColumn(column, i) == strCond) {
                tempArray[tempArray.length] = this.rsArray[i];
            }
        }
        
        this.rsArray = tempArray;
        this.rowCount = tempArray.length;
    },
    unFilter : function() {//dataset을 filter전으로 되돌린다.
        this.rsArray = this.rsOrgArray;
        this.rowCount = this.rsOrgArray.length;
    }
}

Dataset3 = function(gridObj) {
	
  gridObj.setCSVDelimiter("\t");
  var data = gridObj.serializeToCSV();
  var cData = new Array();
  var rCnt = 0;
  // member변수
  this.rsArray = new Array();
  this.rsOrgArray = new Array();
  this.rowCount = 0;
  this.colCount = 0;
  this.ds = data.replace(/(&nbsp;)/gi," ").replace(/(&amp;)/gi,"&").split("\n");
  //this.ds = data.split("\n");
  this.keys = this.ds[0].split("\t");  
  rCnt  = this.ds.length;
  cData = this.ds[0].split("\t");
  cCnt  = cData.length;
  for(var c=0; c<cCnt; c++){
      cData[c] = gridObj.getColType(c);
  }
    for(var i=0; i<rCnt; i++) {
        var rData = this.ds[i].split("\t");
        for(var j=0;j<cCnt; j++){
            rData[j] = rData[j].toString();
        }
        this.rsArray[i] = rData;
    }
    this.rsOrgArray = this.rsArray;
    
    if(this.ds.length > 0) {
        this.rowCount = this.rsArray.length;
        this.colCount = this.keys.length;
    }
    gridObj.setCSVDelimiter(",");
};

/*
* Dataset Class 에서 사용하는 함수
*/
Dataset3.prototype = {
    getRowCnt : function() {//row count return
        return this.rowCount;
    },
    getColCnt : function() {//column count return
        return this.colCount;
    },
    getKeyIdx : function(key) {//문자열 key가 몇번째 index인지 리턴
        var idx = 0;
        for(var i=0; i<this.keys.length; i++) {
            if(key == this.keys[i]) {
                idx = i;
                break;
            }
        }
        return idx;
    },
    getColumn : function(key, rowNum) {//해당 key의 rowNum 번째 행의 값을 리턴
        var colVal = this.rsArray[rowNum][this.getKeyIdx(key)];
        return colVal.trim();
    },
    getColumnByIdx : function(pRow, pCol) {//데이터셋의 pRow행의 pCol번째 컬럼값을 리턴
        var colVal = this.rsArray[pRow][pCol];
        return colVal;
    },
    getKeyValue : function(keyID, valueField) {//ex) dsSystem.getKeyValue("key_id=login.pwd_fail_cnt.usage", "key_valu");
        var arrKey = keyID.split("=");
        
        var id = arrKey[0];//키
        var idValue = arrKey[1];//키값
        var idx = 0;
        
        for(var i=0; i<this.getRowCnt(); i++) {
            var vID = this.getColumn(id, i);

            if(vID == idValue) {
                idx = i;
                break;
            }
        }
        return this.getColumn(valueField, idx);
    },
    filter : function(column, strCond) {//dataset의 해당 column값이 strCond인거만 남기고 나머진 삭제
        var tempArray = new Array();
        for(var i=0; i<this.getRowCnt(); i++) {
            if(this.getColumn(column, i) == strCond) {
                tempArray[tempArray.length] = this.rsArray[i];
            }
        }
        
        this.rsArray = tempArray;
        this.rowCount = tempArray.length;
    },
    unFilter : function() {//dataset을 filter전으로 되돌린다.
        this.rsArray = this.rsOrgArray;
        this.rowCount = this.rsOrgArray.length;
    }
}








    /*
    * COMMENT 처리시 매개변수처리
    */
    function f_getCmt(cmt, arg){
        var arrCmt = cmt.split('@');
        var arrArg = arg;
        var cnt = arrCmt.length;
        var strCmt = "";
        if(cnt>2){
            cnt--;
            try{arrArg = arg.split(',');}catch(e){arrArg = arg;}
            for(var i=0;i<cnt;i++){
                strCmt += arrCmt[i] +  arrArg[i];
            }
            strCmt += arrCmt[cnt];
        }else{
            strCmt = arrCmt[0] +  arg + arrCmt[1];
        }
        return strCmt;
    }

    //로딩시간 테스트용 시작시 호출
    function getTimeMiliSec(){
        debugLink.innerHTML = ""; 
        szLoadMiliSec = new Date().getTime();
    }
    
    //로딩시간 테스트용 종료시 호출 debugLink에 값 표시
    function getTermMiliSec(objGrid){
        var tt = ((new Date().getTime() - szLoadMiliSec)/1000);
        var cnt = objGrid.getRowsNum();
        ss = cnt + " row, " + tt + ".sec";
        debugLink.innerHTML = ss; 
    }
    
    //로딩시간 테스트용 종료시 호출 debugLink에 값 표시
    function getTermMiliSec(){
        var tt = ((new Date().getTime() - szLoadMiliSec)/1000);
        ss = tt + ".sec";
        debugLink.innerHTML = debugLink.outerText + " > " +ss;
    }
    
    /**
     * 그리드의 모든 행과 열을 json타입의 문자열로 리턴해주는 함수
     * Hidden된 row는 제외
     * */
    function makeGridToJson(gridObjTxt){
    	var gridObj = eval(gridObjTxt);
    	var jsonString = "";
    	jsonString += "\""+gridObjTxt+"\":[";
    	var rowCnt = gridObj.getRowsNum();
    	var rowCol = gridObj.getColumnsNum();
    	for(var i=0; i<rowCnt; i++){
    		var roww = gridObj.getRowById(gridObj.getRowId(i));
    		if(roww.style.display!="none"){
    			jsonString += "{";
    	    	for(var j=0; j<rowCol; j++){
    	    		jsonString += "\""+gridObj.getColumnId(j)+"\":\""+gridObj.getCellValue(gridObj.getRowId(i), j)+"\"";
    	    		if(j<rowCol-1) jsonString += ",";
    	    	}
    	    	jsonString += "}";
    	    	jsonString += ",";
    		}
    	}
    	if(rowCnt>0)jsonString = jsonString.substring(0,jsonString.length-1);
    	jsonString += "]";
    	return jsonString;
    }
    
    /**
     * 그리드의 선택된 행과 모든 열을 json타입의 문자열로 리턴해주는 함수
     * */
    function makeGridToJsonSelect(gridObjTxt){
    	var gridObj = eval(gridObjTxt);
    	var jsonString = "";
    	var rowId = gridObj.getSelectedRowId();
    	var colCnt = gridObj.getColumnsNum();
    	jsonString = "\""+gridObjTxt+"\":{";
    	for(var i=0; i<colCnt; i++){
    		jsonString += "\""+gridObj.getColumnId(i)+"\":\""+gridObj.getCellValue(rowId, i)+"\"";
    		if(i<colCnt-1) jsonString += ",";
    	}
    	jsonString += "}";
    	return jsonString;
    }
    
    /**
     * 그리드에서 SUM_TYPE 값이 'T'인 로우에 스타일을 지정한다.(노란 바탕에 폰트 굵게) 
     * by jwk
     * */
	function setLastRowStyle(grd){
		var rowNum = grd.getRowsNum();
		var colIndex = grd.getColIndexById("SUM_TYPE");

		if(!(rowNum>0 && colIndex>0))
			return;
		
		var rowIndex=0;		
		for(var i=1; i<=rowNum; i++){			
			if(grd.cells(i,colIndex).getValue() == "T"){				
				rowIndex = i;
				break;
			}
		}
		if(rowIndex>0){
			grd.setRowColor(rowIndex, "#ffff99");
			grd.setRowTextBold(rowIndex);
		}
	}
	
	/*
	 * string array를 콤마 구분자를 넣은 string으로 변환
	 */
	function cfConvertArrayToString(array) {
		var str = "";
		for(var i=0; i<array.length; i++) {
			str += array[i] + ",";
		}
		if(str.length > 0)
			str = str.substr(0, str.length - 1);
		return str;
	}
	
	/*
	 * calendar 에서 선택한 날짜를 텍스트로 출력할 때 '-'를 포함 
	 */
	function cfChangeDashString(date) {
		
		if(date == null || date == "") {
			return "";
		}
		if(date.length > 8) {
			return date;
		}
		
		var str = date.substr(0, 4) + "-" + date.substr(4, 2) + "-" + date.substr(6, 2);
//		var str = date.substring(0, 4) + "-" + date.substring(4, 6) + "-" + date.substring(6, 8);
		return str;
	}
	
	
	/*
	 * 소문자만 입력받도록 함 (알파벳 소문자가 아닌 다른 key는 입력 x)
	 */
	function fn_GetEvent(e) {
	    if(navigator.appName == 'Netscape') {
	        keyVal = e.which;
	    }
	    else {
	    	keyVal = event.keyCode;
	    }
	    return keyVal;
	}
	
	function fn_lowTextOnly(e) {
		
	    var myEvent = window.event ? window.event : e;
	    var isWindowEvent = window.event ? true : false;
	    var keyVal = fn_GetEvent(e);
	    var result = false;
	    if(myEvent.shiftKey){
	        result = false;
	    }
	    else {
	    	if(e.ctrlKey && keyVal == 86) {
	    		// ctrl + v 금지
	    		result = false;
	    	}
//	    	else if(keyVal == 229) {
//	    		f_SubmitMessage("영문만 입력 가능합니다.");
//	    	}
	    	else if((keyVal >= 48 && keyVal <= 57) || (keyVal >= 65 && keyVal <= 90) || (keyVal >= 97 && keyVal <= 122) || (keyVal == 8) || (keyVal == 9)) {
	            result = true;
	        }
	        else {
	            result = false;
	        }
	    }
	    if(!result) {
	        if(!isWindowEvent) {
	            myEvent.preventDefault();
	        }
	        else {
	            myEvent.returnValue=false;
	        }
	    }
	}
	
	/*
	 * 서버로 전송 (비동기)
	 */
	function sendAsyncRequest(url, params, callback, method, asyncType) {
    	$.ajax({
    		type: method,  
    	    url:url,      
	        data:params,
	        async: asyncType == null ? true : asyncType,
	        success:function(args){   
	        	callback(args);
	        },   
	        error:function(e){  
	        	cf_hideLoadingPopup('asyncRequest');
	        	f_SubmitAlert("데이터 처리 중 에러가 발생하였습니다.");
	            log("responseText :  " + e.responseText);  
	        },
	        beforeSend:function() {
	        	cf_showLoadingPopup('asyncRequest');
	        },
	        complete: function() {
	        	setTimeout(function() {
		        	cf_hideLoadingPopup('asyncRequest');
	        	}, 200);
	        }
	    }); 
    }
	
	/*
	 * 서버로 전송 시 한글처리 부분을 위해 사용 
	 * (IE 에서 accept-charset='euc-kr' 이 적용되지 않아 onsubmit 이 호출될 때 아래와 같이 처리 필요함) 
	 */
	function emulAcceptCharset(form) {
	    if (form.canHaveHTML) { // detect IE
	        document.charset = form.acceptCharset;
	    }
	    return true;
	}
	
	function setFormData(fileName, fileDir) {
//		$(".divForm").attr('action', 'http://www.koreaap.com/h_include/file_download.php');
//		$(".divForm").attr('method', 'get');
//		$(".divForm").attr('target', '_blank'); //target='_blank'
//		$(".divForm").attr('accept-charset', 'euc-kr'); //accept-charset='euc-kr'
		$(".divForm").append("<input type='hidden' name='dataa' value='" + fileName + "'/>");
		$(".divForm").append("<input type='hidden' name='f_gb' value='../" + fileDir + "'/>");
		
		$(".divForm").submit();
		document.charset = "utf-8";
	} 
