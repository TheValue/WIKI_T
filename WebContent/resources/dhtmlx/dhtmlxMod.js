/* 
*------------------------------------------------------------------------------
* NAME : dhtmlxMod.js
* DESC : DHTMLX 수정 스크립트 for MRO 
* VER  : v1.0 
* PROJ : 시장리스크관리  
* Copyright 2013 한국자산평가 All rights reserved
*------------------------------------------------------------------------------
*                  변         경         사         항
*------------------------------------------------------------------------------
*    DATE     AUTHOR       DESCRIPTION
* ----------  ------  ---------------------------------------------------------
* 2013.08.20  김정훈    최초개발
*------------------------------------------------------------------------------
*/

//----------------------------------------------------------
// 데이터 프로세서 setSyncState() 함수 추가
//----------------------------------------------------------
dataProcessor.prototype.setSyncState = function(){
    this._in_progress = {};
    this.updatedRows = [];    
};

//----------------------------------------------------------
// 데이터 프로세서의 setUpdated 메소드 사용시 
// 그리드의 wasChanged 속성까지 변경하도록 재정의
//----------------------------------------------------------
dataProcessor.prototype.setUpdated = function(rowId,state,mode){
	if (this._silent_mode) return;
	var ind=this.findRow(rowId);
	
	mode=mode||"updated";
	var existing = this.obj.getUserData(rowId,this.action_param);
	if (existing && mode == "updated") mode=existing;
	if (state){
		this.set_invalid(rowId,false); //clear previous error flag
		this.updatedRows[ind]=rowId;
		this.obj.setUserData(rowId,this.action_param,mode);
		if (this._in_progress[rowId]) 
			this._in_progress[rowId]="wait";
		this.obj.rowsAr[rowId].childNodes[0].wasChanged=true; // 2013.08.20 추가 Kim Jung-Hoon
	} else{
		if (!this.is_invalid(rowId)){
			this.updatedRows.splice(ind,1);
			this.obj.setUserData(rowId,this.action_param,"");
		}
	}

	//clear changed flag
	if (!state)
		this._clearUpdateFlag(rowId);
 			
	this.markRow(rowId,state,mode);
	if (state && this.autoUpdate) this.sendData(rowId);
};

//-----------------------------------------------------------------------------
// DHTMLX 캘린더 한국어 언어 설정
//-----------------------------------------------------------------------------
dhtmlXCalendarObject.prototype.langData["ko"] = {
    dateformat: "%Y-%m-%d",
    monthesFNames: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
    monthesSNames: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
    daysFNames: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"],
    daysSNames: ["일", "월", "화", "수", "목", "금", "토"],
    weekstart: 0
}

// 디폴트 언어로 설정
dhtmlXCalendarObject.prototype.lang = "ko";

//-----------------------------------------------------------------------------
// DHTMLX 그리드 캘린더 설정 재정의(그리드내에서 캘린더 호출될 경우)
//-----------------------------------------------------------------------------
eXcell_dhxCalendar.prototype.edit = function() {
    var arPos = this.grid.getPosition(this.cell);
    this.grid._grid_calendarA._show(false, false);
    this.grid._grid_calendarA.setPosition(arPos[0],arPos[1]+this.cell.offsetHeight);
	this.grid._grid_calendarA._last_operation_calendar=false;						
    this.grid.callEvent("onCalendarShow",[this.grid._grid_calendarA,this.cell.parentNode.idd,this.cell._cellIndex]);
    this.cell._cediton=true;
    this.val=this.cell.val;
	this._val=this.cell.innerHTML;                    
    var t=this.grid._grid_calendarA.draw; this.grid._grid_calendarA.draw=function(){};
	this.grid._grid_calendarA.setDateFormat((this.grid._dtmask||"%d/%m/%Y"));
    this.grid._grid_calendarA.setDate(this.val||(new Date()));
    this.grid._grid_calendarA.setSkin("omega");  // 스킨 설정 - 2013.08.22 Kim Jung-Hoon
    this.grid._grid_calendarA.hideTime(); // 시간 바 표시 없애기 - 2013.08.22 Kim Jung-Hoon
    this.grid._grid_calendarA.draw=t;
}






//----------------------------------------------------------
// DhxComboGrid 정의
//----------------------------------------------------------
DhxComboGrid = function (m, gd, dp) {
    this.objGd  = gd;
    this.objDp  = dp;
    this.oCombo = m;
    this.valCol = "";
    this.txtCol = "";
};

DhxComboGrid.prototype = {
    setAddonComboGridEvt : function (obj,rowId,type,cbNm,gdNm,dpNm,valCol,txtCol,opt){
        this.valCol = valcol;
        this.txtCol = txtcol;
        window.onresize = function(){
           dCombo.displayOff(divAddon0);
        }
        var cIdx = obj.getSelectedCellIndex();
        //var opv = "<select id='comboAddon0' class=text_title_t style='position:absolute;'  onblur=\""+cbNm+".displayOff(divAddon0);\" onchange=\""+cbNm+".applyValue("+gdNm+", "+dpNm+", comboAddon0);\" onFocusin=\"this.focus();\">"+opt+"</select>";
        var opv = "<select id='comboAddon0' class=text_title_t style='position:absolute;'  onFocusout=\""+cbNm+".displayOff(divAddon0);\" onchange=\""+cbNm+".applyValue("+gdNm+", "+dpNm+", comboAddon0);\" onFocusin=\"this.focus();\">"+opt+"</select>";
        document.all.divAddon0.innerHTML = opv; 
        document.all.comboAddon0.selectedIndex = -1;
        document.all.divAddon0.style.display = "";
        var vSel = obj.getPosition(obj.cell);
        document.all.divAddon0.style.top = vSel[1]+1;
        document.all.divAddon0.style.left = vSel[0];
        document.all.comboAddon0.style.width = obj.getColWidth(cIdx);
        //document.all.comboAddon0.disabled = true;
        document.all.comboAddon0.focus();
    },
    setAddonComboGrid : function (obj,valcol,txtcol,opt){
        var rowId = obj.getSelectedRowId();
        obj.setCellExcellType(rowId,txtcol, "ro");
        if(valcol==""){
            var tColId = obj.getColumnId(txtcol);
            valcol = obj.getColIndexById(tColId+"_1");
        }                   
        //alert(valcol);
        var cIdx  = obj.getSelectedCellIndex();
        if(txtcol == cIdx){
            this.valCol = valcol;
            this.txtCol = txtcol;
            var v = obj.getCellValue(rowId, valcol);
            //alert( navigator.appVersion);
            //var opv = "<select id='comboAddon0' class=text_title_t style='position:absolute;'  onblur=\""+this.oCombo+".displayOff(divAddon0);\" onchange=\""+this.oCombo+".applyValue("+this.objGd+", "+this.objDp+", comboAddon0);\">"+opt+"</select>";
            var opv = "<select id='comboAddon0' class=text_title_t style='position:absolute;'  onFocusout=\""+this.oCombo+".displayOff(divAddon0);\" onchange=\""+this.oCombo+".applyValue("+this.objGd+", "+this.objDp+", comboAddon0);\">"+opt+"</select>";
            var vSel = obj.getPosition(obj.cell);
            document.all.divAddon0.innerHTML = opv;
            var cnt = comboAddon0.length;
            document.all.comboAddon0.selectedIndex = -1;
            for(i=0;i<cnt;i++){
                if(comboAddon0[i].value == v){
                    document.all.comboAddon0.selectedIndex = i;
                    break;
                }
            }
            document.all.divAddon0.style.display = "";
            document.all.divAddon0.style.top = vSel[1]+1;
            document.all.divAddon0.style.left = vSel[0];
            document.all.comboAddon0.style.width = obj.getColWidth(cIdx);
            //document.all.comboAddon0.disabled = true;
            document.all.comboAddon0.focus();
            document.all.comboAddon0.size = 10;
        }
    },
    setAddonComboGridChgOpt : function (obj,valcol,txtcol,opt,chgOpt){
        var rowId = obj.getSelectedRowId();
        obj.setCellExcellType(rowId,txtcol, "ro");
        if(valcol==""){
            var tColId = obj.getColumnId(txtcol);
            valcol = obj.getColIndexById(tColId+"_1");
        }                   
        //alert(valcol);
        var cIdx  = obj.getSelectedCellIndex();
        if(txtcol == cIdx){
            this.valCol = valcol;
            this.txtCol = txtcol;
            var v = obj.getCellValue(rowId, valcol);
            //alert( navigator.appVersion);
            //var opv = "<select id='comboAddon0' class=text_title_t style='position:absolute;'  onblur=\""+this.oCombo+".displayOff(divAddon0);\" onchange=\""+this.oCombo+".applyValue("+this.objGd+", "+this.objDp+", comboAddon0);\">"+opt+"</select>";
            var opv = "<select id='comboAddon0' class=text_title_t style='position:absolute;'  onFocusout=\""+this.oCombo+".displayOff(divAddon0);\" onchange=\""+this.oCombo+".applyValue("+this.objGd+", "+this.objDp+", comboAddon0);"+chgOpt+"\">"+opt+"</select>";
            var vSel = obj.getPosition(obj.cell);
            document.all.divAddon0.innerHTML = opv;
            var cnt = comboAddon0.length;
            document.all.comboAddon0.selectedIndex = -1;
            for(i=0;i<cnt;i++){
                if(comboAddon0[i].value == v){
                    document.all.comboAddon0.selectedIndex = i;
                    break;
                }
            }
            document.all.divAddon0.style.display = "";
            document.all.divAddon0.style.top = vSel[1]+1;
            document.all.divAddon0.style.left = vSel[0];
            document.all.comboAddon0.style.width = obj.getColWidth(cIdx);
            //document.all.comboAddon0.disabled = true;
            document.all.comboAddon0.focus();
            document.all.comboAddon0.size = 10;
        }
    },
    setCellType : function(obj,rowId,valcol){
        obj.getCellValue(rowId, valcol);
    },
    getOCombo : function(){
        return this.oCombo;
    },
    getGd : function(){
        return this.objGd;
    },
    getDp : function(){
        return this.objDp;
    },
    displayOff : function (obj){
        obj.innerHTML = "";
        obj.style.display="none";
    },
    detachEvent : function (obj){
        obj.detachEvent("onmouseout");
    },
    applyValue : function (gd,dp,sel){
        var rowId = gd.getRowId(gd.getRowIndex(gd.getSelectedId()));
        //var cols  = obj.getColumnId(obj.getRowIndex(obj.getSelectedId()));
        var v = sel.value;
        var t = sel[sel.selectedIndex].text;
        dp.setUpdated(rowId,true,false);
        gd.setCellValue(rowId, this.valCol, v);
        gd.setCellValue(rowId, this.txtCol, t);
        this.displayOff(divAddon0);
    }
}

function getOjbCombo(){
    return getOCombo();
}



//-----------------------------------------------------------------------------
// DHTMLX 그리드 CELL Edit시 숫자 자릿수 체크
// DhxAddonComboGrid를 사용시 grid의 OnEditCell 이벤트에 사용한다. mrin2511 참고 
//----------------------------------------------------------------------------- 
function setValueWithAddonCombo(gdObj, dpObj, val, limit, vCol, tCol){
    if(checkGridNumLengthAddCombo(val, limit)){
        var rowId = gdObj.getSelectedRowId();
        if(vCol == ""){
            var tColId = gdObj.getColumnId(tCol);
            vCol = gdObj.getColIndexById(tColId+"_1");
        }
        gdObj.setCellValue(rowId, vCol , val);
        //입력시 해당rowId의 상태를 updated로 변경해줘야 한다.
        dpObj.setUpdated(rowId,true,false);
        return true;
    }else{
        return false;
    }
}


//-----------------------------------------------------------------------------
// DHTMLX 그리드 CELL Edit시 문자 체크
// DhxAddonComboGrid를 사용시 grid의 OnEditCell 이벤트에 사용한다. mrin2511 참고 
//----------------------------------------------------------------------------- 
function setStringWithAddonCombo(gdObj, dpObj, val, limit, vCol, tCol){
    var rowId = gdObj.getSelectedRowId();
    if(vCol == ""){
        var tColId = gdObj.getColumnId(tCol);
        vCol = gdObj.getColIndexById(tColId+"_1");
    }
    if(limit == "date"){
        gdObj.setCellValue(rowId, vCol , cfChangeDateFormat2(val));
    }else{
        if(checkGridStrLength(val, limit, rowId+"번째 입력항목")){
            gdObj.setCellValue(rowId, vCol , val);
        }else{
            return false;
        }
    }
    //입력시 해당rowId의 상태를 updated로 변경해줘야 한다.
    dpObj.setUpdated(rowId,true,false);
    return true;
}

//-----------------------------------------------------------------------------
// DHTMLX 그리드 CELL Edit시 숫자 자릿수 체크 
//----------------------------------------------------------------------------- 
function checkGridNumLengthAddCombo(val, limit){
    if(isNaN(val)){
        alert("숫자만 입력해주세요.");
        return false;
    }
    if(val.toString().indexOf(".") == -1){
        var tmpl= limit.toString().substring(0, limit);  
        if(val.toString().length > tmpl){
            alert("입력 숫자의 자릿수가 너무 큽니다. \n소수점을 제외한 최대길이는 "+ tmpl + "자리 입니다.");
            return false;
        }
    }else{
        var tmp = val.toString().substring(0, val.toString().indexOf('.'));
        var tmpl= limit.toString().substring(0, limit.toString().indexOf('.'));  
        if(tmp.length > tmpl){
            alert("입력 숫자의 자릿수가 너무 큽니다. \n소수점을 제외한 최대길이는 "+ tmpl + "자리 입니다.");
            return false;
        }
        tmp = val.toString().substring(val.toString().indexOf('.')+1, val.toString().length);
        tmpl= limit.toString().substring(limit.toString().indexOf('.')+1, limit.toString().length);
        if(tmp.length > tmpl){
            alert("입력 숫자의 소수점 자릿수가 너무 큽니다. \n소수점 최대길이는 "+ tmpl + "자리 입니다.");
            return false;
        }       
    }
    return true;
}






//-----------------------------------------------------------------------------
// dhtmlxUploadObject 생성
//----------------------------------------------------------------------------- 
dhtmlxUploadObject = function()
{
    this.isMulty = false;
    
    this.isUploadFile = "false";
    this.isUploadFileAll = "false";
    this.countRows = null;

    //server handlers
    this.pathUploadHandler = null;

    //this.imPath = "imgs/";
    this.imPath = "/mro/dhtmlx/imgs/";

}

/* 다중 업로드를 활성화 시킨다. */
dhtmlxUploadObject.prototype.setMulty = function(s)
{
    this.isMulty = s;
}

dhtmlxUploadObject.prototype.setServerHandlers = function(uploadHandler)
{
    this.pathUploadHandler = uploadHandler;

}

dhtmlxUploadObject.prototype.setImagePath = function(newPath)
{
    this.imPath = newPath;
}

dhtmlxUploadObject.prototype.create = function(htmlObject, objName)
{

    this.parentObject = document.getElementById(htmlObject);

    this.parentObject.style.position = "relative";
    this.parentObject.innerHTML = "<iframe src='about:blank' id='dhtmlxUploadFrame' name='dhtmlxUploadFrame' style='display:none; height:400px; widht:400px;'></iframe>";

    this.container = document.createElement("div");
    this.container.style.position = "relative";
    var txtWidth = Number(this.parentObject.style.width.replace('px','')) - 17;

    var str = "<table height='18px' cellspacing='0' cellpadding='0' style='background-color:#ffffff;border: 1px solid silver;' border='0'>" +
              "<tr><td style='width:100%' align='left' id = 'cellContainer' >" +
              "<input type='text' id='"+objName+"' style='border-width:0px;font-family:Tahoma;font-size:12px;height:18; width:"+ txtWidth +"px;' readonly>" +
              "<img style='cursor:pointer;' height='18px' id='btnDhtmlxUploadFile' src='"+this.imPath+"combo_select.gif' align='absmiddle'>" +
              "</td></tr>" +
              "</table>" +
              "<div style='width:100%;overflow:hidden;height:18px;left:0px;direction:rtl;position:absolute;top:2px;align:right;'>" +
              "<input type='file' id='file1' name='file1' value='' class='hidden' style='cursor:pointer;position:absolute;z-index:3;height:18px;width:20px;top:0px;'/></div>" +
              "<div style='width:100%;align:right;'>" + 
              "<table id='tbFileList' width='100%'></table>" +
              "</div>";
   
    this.container.innerHTML = str;
    
    var self = this;

    this.fileContainer = this.container.childNodes[1];
    this.fileContainer.childNodes[0].style.left = Number((this.parentObject.style.width).replace("px",""))-30;
    this.fileContainer.childNodes[0].onchange = function() {
        self.addFile();
    };

    this.uploadForm = document.createElement("form");

    this.uploadForm.method = "post";
    this.uploadForm.encoding = "multipart/form-data";
    this.uploadForm.target = "dhtmlxUploadFrame";
    this.container.appendChild(this.uploadForm);

    this.parentObject.appendChild(this.container);

    this.currentFile = this.fileContainer.childNodes[0];

}

//get file name
dhtmlxUploadObject.prototype.getFileName = function(path)
{
    var arr = path.split("\\");
    return arr[arr.length - 1];
}

dhtmlxUploadObject.prototype.getFileString = function(){
    return this.container.childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].value;
}

// add File Item
dhtmlxUploadObject.prototype.addFile = function()
{
    var currentId = this.createId();
    var self = this;
    var file = this.currentFile;
    var fileNames = file.value.split('\\');
    
    if(!this.isMulty){
        this.removeAllItems();
        this.container.childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].value = file.value;
    }else{   
        var tr = tbFileList.insertRow(0);
        tr.onmouseover=function()
        {
            tbFileList.clickedRowIndex = this.rowIndex;
        };
        var td1=tr.insertCell(0);
        var td2=tr.insertCell(1);
        
        tr.id = "tdFileList_" + currentId;
        td1.innerHTML = fileNames[fileNames.length-1];
        td1.style.width = "100%";
        
        var btnImg = document.createElement("img");
        btnImg.src=this.imPath+"close.png";
        //btnImg.name=currentId;
        btnImg.style.cursor="pointer";
        btnImg.align='absmiddle';
        td2.appendChild(btnImg);
        btnImg.onclick = function() {
            self.delFileItem(tbFileList.clickedRowIndex);
        };
    }
    
    file.style.display = "none";
    this.uploadForm.appendChild(file);

    var newInputFile = document.createElement("input");
    newInputFile.type = "file";
    newInputFile.className = "hidden";
    newInputFile.style.cssText = "cursor:pointer;position:absolute;z-index:3;height:18px;width:20px;top:0px;";
    newInputFile.style.left = Number((this.parentObject.style.width).replace("px",""))-30;
    newInputFile.id = "file" + (currentId+1);
    newInputFile.name = "file" + (currentId+1);
    
    this.currentFile = newInputFile;
    
    
    this.fileContainer.appendChild(newInputFile);
    
    newInputFile.onchange = function() {
        return self.addFile();
    };

}

// add Param Item
dhtmlxUploadObject.prototype.addParam = function(ParamName, ParamValue)
{
    var newInputParam = document.createElement("input");
    newInputParam.type = "hidden";
    newInputParam.name = ParamName;
    newInputParam.id = ParamName;
    newInputParam.value = ParamValue;

    this.uploadForm.appendChild(newInputParam);

}

//create id for item control
dhtmlxUploadObject.prototype.createId = function()
{
    var count = this.countRows;
    if (!count)
    {
        count = 0;
    }
    this.countRows = parseInt(count) + 1;
    return this.countRows;
}

dhtmlxUploadObject.prototype.delFileItem = function(id)
{
    this.removeItem(id);
}

//remove current item in control
dhtmlxUploadObject.prototype.removeItem = function(id)
{
    if (this.isUploadFile == "false")
    {
        if (this.uploadForm != null)
        {
            var count = this.uploadForm.childNodes.length;

            if (count > 0)
            {
                this.uploadForm.childNodes[id].select();
                document.selection.clear();
                this.uploadForm.removeChild(this.uploadForm.childNodes[id]);
                
                if(this.isMulty){
                    tbFileList.deleteRow(id);
                }
                return;
                
//                for (var i = 0; i < count; i++)
//                {
//                    if (this.uploadForm.childNodes[i].id == "file" + id)
//                  {   
//                      this.uploadForm.childNodes[i].select();
//                          document.selection.clear();
//                      this.uploadForm.removeChild(this.uploadForm.childNodes[i]);
//                      
//                      if(this.isMulty){
//                          tbFileList.deleteRow(id);
//                      }
//                      return;
//                  }
//                }
            }
        }
    }
}

//remove all items in control
dhtmlxUploadObject.prototype.removeAllItems = function()
{
    if (this.isUploadFile == "false")
    {
        if (this.uploadForm != null)
        {
            var count = this.uploadForm.childNodes.length;

            if (count > 0)
            {
                for (var i = count-1; i >= 0; i--)
                {   
                    this.uploadForm.childNodes[i].select();
                    document.selection.clear();
                    this.uploadForm.removeChild(this.uploadForm.childNodes[i]);
                }
            }
        }
    }
}

//file FileItem
dhtmlxUploadObject.prototype.getFileItem = function(id)
{
    for (var i = 0; i < this.uploadForm.childNodes.length; i++)
    {   
        if (this.uploadForm.childNodes[i].id == "file" + id)
        {   
            return this.uploadForm.childNodes[i];
        }
    }
}

dhtmlxUploadObject.prototype.uploadFile = function ()
{
   
    //alert(this.uploadForm.innerHTML);
    //alert(this.pathUploadHandler);
     //debugger;
    if ( this.isUploadFile == "false" )
    {
            this.isUploadFile = "true";
      
            this.uploadForm.action = this.pathUploadHandler;
            this.uploadForm.submit();
                        
            this.container.childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].value = "";
            
            this.removeAllItems();
            
            this.isUploadFile = "false";
            
            //alert(this.uploadForm.innerHTML);
    }

}
 

////////////////////////////////////////////////////////////
// dynro Excell 추가
// 그리드 안에서 수정이 불가능하도록 dyn을 변형한 dynron를 만들었음
// 참고 : http://docs.dhtmlx.com/doku.php?id=dhtmlxgrid:toc_custom_excell_creation
// 테스트 필요함!!
function eXcell_dynron(cell){
	this.base=eXcell_ro;
	this.base(cell)
	this.getValue=function(){
		return this.cell.firstChild.childNodes[1].innerHTML.toString()._dhx_trim()
	}
}

eXcell_dynron.prototype=new eXcell_ro;
eXcell_dynron.prototype.setValue=function(val){
	
//	if (!val||isNaN(Number(val))){
//		if (val!=="")
//			val=0;
//	}

	var color = "";
	var img = "";
	
	if (val > 0){
		color = "#c23e40";
		img = "dyn_up.gif";
	} else if (val == 0){
		color = "#555555";
		img = "dyn_.gif";
	} else if (val < 0) {
		color = "#2077ba";
		img = "dyn_down.gif";
	} else {
		color = "#555555";
		img = "dyn_.gif";
	}
	
	var colText;
	if(val == "-") {
		colText = val;
	} else {
		colText = this.grid._aplNF(val, this.cell._cellIndex);
	}
	
	this.setCValue("<div style='position:relative;padding-right:2px; width:100%;overflow:hidden; white-space:nowrap;'><img src='"+this.grid.imgURL+""+img
		+"' height='15' style='position:absolute;top:0px;left:0px;'><span style=' padding-left:20px; width:100%;color:"+color+";'>"+colText
		+"</span></div>",
		val);
}
// dynron Excell 추가 끝
////////////////////////////////////////////////////////////


// dhtmlxgrid "조회된 결과가 없습니다" image
dhtmlXGridObject.prototype.loadXML=function(url, afterCall){

	//var obj = Element.childElements(this.entBox.id);  // second child(<table>) of dhtmlxgrid
	//var obj = $("#"+ this.entBox.id + " > div.objbox");  // split mode 에서는 동작안함 (entBox.id 없음)
	var obj = $(this.entBox).find(".objbox");   
	
	if(obj.get(0)) {
		//Element.removeClassName(obj[1], "gridNoResult");  // remove css class "No Data Found"
		obj.removeClass("gridNoResult");
	}
	
	this.load(url, afterCall, "xml");
}

dhtmlXGridObject.prototype.showNoDataFoundImg=function() {
	
	//var obj = Element.childElements(this.entBox.id);  // second child(<table>) of dhtmlxgrid
	//var obj = $("#"+ this.entBox.id + " > div.objbox");  // split mode 에서는 동작안함 (entBox.id 없음)
	var obj = $(this.entBox).find(".objbox");
	
	if(obj.get(0)) {
		//Element.addClassName(obj[1], "gridNoResult");  // add css class "No Data Found"
		obj.addClass("gridNoResult");
	}
}


// dhtmlXToolbar addSpacer() 수정
dhtmlXToolbarObject.prototype.addSpacer = function(nextToId) {
	var nti = this.idPrefix+nextToId;
	if (this._spacer != null) {
		// spacer already at specified position
		if (this._spacer.idd == nextToId) return;
		// if current spacer contain nextToId item
		// move all items from first to nextToId to this.base
		if (this._spacer == this.objPull[nti].obj.parentNode) {
			var doMove = true;
			while (doMove) {
				var idd = this._spacer.childNodes[0].idd;
				this.base.appendChild(this._spacer.childNodes[0]);
				if (idd == nextToId || this._spacer.childNodes.length == 0) {
					if (this.objPull[nti].arw != null) this.base.appendChild(this.objPull[nti].arw);
					doMove = false;
				}
			}
			this._spacer.idd = nextToId;
			this._fixSpacer();
			return;
		}
		// if this.base contain nextToId item, move (insertBefore[0])
		if (this.base == this.objPull[nti].obj.parentNode) {
			var doMove = true;
			var chArw = (this.objPull[nti].arw!=null);
			while (doMove) {
				var q = this.base.childNodes.length-1;
				if (chArw == true) if (this.base.childNodes[q] == this.objPull[nti].arw) doMove = false;
				if (this.base.childNodes[q].idd == nextToId) doMove = false;
				if (doMove) { if (this._spacer.childNodes.length > 0) this._spacer.insertBefore(this.base.childNodes[q], this._spacer.childNodes[0]); else this._spacer.appendChild(this.base.childNodes[q]); }
			}
			this._spacer.idd = nextToId;
			this._fixSpacer();
			return;
		}
		
	} else {
		var np = null;
		for (var q=0; q<this.base.childNodes.length; q++) {
			if (this.base.childNodes[q] == this.objPull[this.idPrefix+nextToId].obj) {
				np = q;
				if (this.objPull[this.idPrefix+nextToId].arw != null) np = q+1;
			}
		}
		if (np != null) {
			this._spacer = document.createElement("DIV");
			this._spacer.className = "dhxtoolbar_spacer "+(this.align=="right"?" float_left":" float_right");

			// 수정한 부분
			// dhtmlx window popup의 toolbar에서 addSpacer() 호출했을 때 ie7에서만 bug? 발생
			// 버튼 div element가 움직이는 오류가 발생했는데 float:right div와 dir="rtl" 속성 때문일거라 짐작되는데.. 정확한 원인은 모름
			// 일단 아래 문장 주석처리하는걸로 수정..
			//this._spacer.dir = "rtl";
			
			this._spacer.idd = nextToId;
			while (this.base.childNodes.length > np+1) this._spacer.appendChild(this.base.childNodes[np+1]);
			this.cont.appendChild(this._spacer);
			this._fixSpacer();
		}
	}
	if (this.skin == "dhx_terrace") this._improveTerraceSkin();
}


// dhtmlXCombo prototype 수정
// charset 이 euc-kr => utf-8로 바뀌면서 사용하지 않음
/*
dhtmlXCombo.prototype._fetchOptions=function(ind,text){
    if (text=="") { this.closeAll();  return this.clearAll();   }
    
    // 수정한 부분
    // dhtmlXCombo의 AutoComplete 기능에서 사용함
    // tomcat의 Connector URIEncoding="euc-kr" 설정때문에.. encodeURIComponent() 삭제
    // 원본 : var url=this._xml+((this._xml.indexOf("?")!=-1)?"&":"?")+"pos="+ind+"&mask="+encodeURIComponent(text);
    var url=this._xml+((this._xml.indexOf("?")!=-1)?"&":"?")+"pos="+ind+"&mask="+text;
    
    this._lasttext=text;
    if (this._load) this._load=url;
    else {
		if (!this.callEvent("onDynXLS",[text,ind])) return;
		this.loadXML(url);
	 }
};
*/


//dhtmlXCombo prototype 추가
dhtmlXCombo.prototype.updateAutoCompleteURL = function(arg, value) {
	var url = this._xml;
	this._xml = updateQueryStringParameter(url, arg, value);
	
	function updateQueryStringParameter(uri, key, value) {
		var re = new RegExp("([?|&])" + key + "=.*?(&|$)", "i");
		var separator = uri.indexOf('?') !== -1 ? "&" : "?";
		if (uri.match(re)) {
			return uri.replace(re, '$1' + key + "=" + value + '$2');
		}
		else {
			return uri + separator + key + "=" + value;
		}
	}
};

// checkbox 가 포함된 combobox에서 value 선택 유무를 확인
dhtmlXCombo.prototype.comboSelectType = false;


// ie7에서 화면이 로딩되는 시점에
// dhtmlXCombo를 초기화하고 setComboValue() 함수를 호출해서 초기값을 설정하면 
// dhtmlXCombo.setComboValue() -> selectOption() -> _confirmSelection() 로 호출되는 동안에
// _confirmSelection() 함수 내에 아래 코드를 수행하면서  
// DOMelem_input.focus();
// 로딩되던 중간에 잠깐동안 포커스를 받고 다시 화면이 왼쪽으로 slide되는 듯한 문제가 발생함
// 근본적인 원인을 찾지 못하고 일단 아래와 같이
// setComboValue()에서 this._skipFocus = true; 코드를 추가해서 임시로 해결함. 확인과 테스트 필요.
dhtmlXCombo.prototype.setComboValue = function(text){
	
	// 추가한 부분
	this._skipFocus = true;
	
    this.setComboText(text);
	  for(var i=0; i<this.optionsArr.length; i++)
       if (this.optionsArr[i].data()[0]==text)
       return this.selectOption(i,null,true);      
    this.DOMelem_hidden_input.value=text;
 }

// grid paging toolbar에서 사용
// 한글로 처리하여 보여주도록 한다.
dhtmlXGridObject.prototype.i18n.paging={
		 results:"Results",
		 records:" ",
		 to:" ~ ",
		 page:"Page ",
		 perpage:"개 씩 모아보기",
		 first:"To first Page",
		 previous:"Previous Page",
		 found:"Found records",
		 next:"Next Page",
		 last:"To last Page",
		 of:" of ",
		 notfound:"조회된 결과가 없습니다."
};


/*
 * 2014-05-21
 * dhtmlx의 ie11 hot fix 파일 중에서 dhtmlxcommon.js 의 아래 부분만 수정함
 * grid 헤더 클릭시 sort가 안되고 사라지는 문제가 발생하였음
 * http://www.dhtmlx.com/blog/?p=2053
 * 
 * 2014-05-23
 * 아래 dhtmlx hot fix에서는 ie11도 _isIE=true 가 되도록 수정되었으나
 * _isIE=true 로 변경한 이후 ie11에서 dhtmlxWindow 팝업이 안뜨는 등 다른 문제가 발생함
 * 아래 링크 처럼 deprecated 된 ie 고유의 javascript 때문에 발생된 것으로 보임
 * http://msdn.microsoft.com/ko-kr/library/ie/bg182625(v=vs.85).aspx
 * 그렇다고 dhtmlx hot fix의 전체 내용을 dhtmlx.js에 반영할 수 없어서
 * 일단 (임시로!!) ie11은 _isIE=false로 놔두고 grid sort 기능만 되도록 수정함
 * 
 * ie11를 체크하는 _IErv 변수를 전역에 추가함
 *  
 * 
*/
_IErv = false;  /* 추가한 부분 */

if (navigator.userAgent.indexOf('Macintosh') != -1)
	_isMacOS=true;


if (navigator.userAgent.toLowerCase().indexOf('chrome')>-1)
	_isChrome=true;

if ((navigator.userAgent.indexOf('Safari') != -1)||(navigator.userAgent.indexOf('Konqueror') != -1)){
	 _KHTMLrv = parseFloat(navigator.userAgent.substr(navigator.userAgent.indexOf('Safari')+7, 5));

	if (_KHTMLrv > 525){ //mimic FF behavior for Safari 3.1+
		_isFF=true;
		 _FFrv = 1.9;
	} else
		_isKHTML=true;
} else if (navigator.userAgent.indexOf('Opera') != -1){
	_isOpera=true;
	_OperaRv=parseFloat(navigator.userAgent.substr(navigator.userAgent.indexOf('Opera')+6, 3));
}
else if (navigator.appName.indexOf("Microsoft") != -1){
	_isIE=true;
	if ((navigator.appVersion.indexOf("MSIE 8.0")!= -1 || 
		 navigator.appVersion.indexOf("MSIE 9.0")!= -1 || 
		 navigator.appVersion.indexOf("MSIE 10.0")!= -1 ||
		 document.documentMode > 7) && 
			document.compatMode != "BackCompat"){
		_isIE=8;
	}
} 
/* 수정한 부분 시작 */
else if (navigator.appName  == 'Netscape' && navigator.userAgent.indexOf("Trident") != -1){
	//ie11
	//_isIE=8;
	_IErv = 11;
} 
/* 수정한 부분 끝 */
else {
	_isFF=true;
	 _FFrv = parseFloat(navigator.userAgent.split("rv:")[1])
}

/* dhtmlx의 ie11 hot fix 수정 */ 
/////////////////////////////////


/* ie11에서 grid 헤더 클릭시 sort가 안되던 문제 수정 */
dhtmlXGridObject.prototype._reset_view=function(skip){
	if (!this.obj.rows[0]) return;
	this.callEvent("onResetView",[]);
	var tb = this.obj.rows[0].parentNode;
	var tr = tb.removeChild(tb.childNodes[0], true)
    if (_isKHTML) //Safari 2x
    	for (var i = tb.parentNode.childNodes.length-1; i >= 0; i--) { if (tb.parentNode.childNodes[i].tagName=="TR") tb.parentNode.removeChild(tb.parentNode.childNodes[i],true); }
    //else if (_isIE)                /* 원본 소스 */
    else if (_isIE || _IErv == 11)   /* 수정한 부분 */
		for (var i = tb.childNodes.length-1; i >= 0; i--) tb.childNodes[i].removeNode(true);
	else
		tb.innerHTML="";
	tb.appendChild(tr)
	this.rowsCol=dhtmlxArray();
	if (this._sst)
		this.enableStableSorting(true);
	this._fillers=this.undefined;
	if (!skip){
	    if (_isIE && this._srnd){
	        // var p=this._get_view_size;
	        // this._get_view_size=function(){ return 1; }
		    this.render_dataset();
		    // this._get_view_size=p;
		}
	    else
	        this.render_dataset();
    }
}