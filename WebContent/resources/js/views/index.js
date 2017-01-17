(function() {
	
	function Index() {
		
		/* 
		 * private variables
		 */
		
		/* 
		 * 초기화 메소드
		 */
		
		function _init() {
			bindEvent();
			
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
					
				}
				
			}, false);
			
			$("#findList").on("click", function(e) {
				e.preventDefault();
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