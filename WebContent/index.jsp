<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>::: TEST PAGE :::</title>

    <%@include file="/resources/inc/incCss.jsp" %>
  </head>
<body>
<%@include file="/resources/inc/top.jsp" %>
	
	<div class="container container-main">
	
		<div class="panel panel-default">
		  <div class="panel-heading">
		  	<button type="button" class="btn btn-primary btn-xs">Link 1</button>
		  	<button type="button" class="btn btn-primary btn-xs">Link 2</button>
		  	<button type="button" class="btn btn-primary btn-xs">Link 3</button>
			<button type="button" class="btn btn-info btn-xs">Link 4</button>
			<button type="button" class="btn btn-warning btn-xs">Link 5</button>
		  </div>
		  <div class="panel-body">
		    Input Text..
		  </div>
		</div>

		<div class="panel panel-default">
			<div class="panel-body">
				<b>Date :</b> 
				<input type="text" id="stdDate">
				<button id="findList" type="button" class="btn btn-default btn-navbar btn-xs">Go</button>
			</div>
		</div>
		
		
		<div class="col-md-12">&nbsp;</div>
	</div>
	
	<div class="col-md-12 btmTag">
		<p align="center">Copyright ⓒ mscho mscho mscho mscho</p>
	</div>
	
<%@include file="/resources/inc/incJs.jsp" %>
    <script type="text/javascript" src="resources/js/views/index.js"></script>
  </body>
</html>