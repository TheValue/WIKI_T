(function() {
	
	function Index() {
		
		/* 
		 * private variables
		 */
		var appRouter;
		
		/* 
		 * 초기화 메소드
		 */
		
		function _init() {
			bindEvent();
			
		}
		
		
		function bindEvent() {
			
			var AppRouter = Backbone.Router.extend({
				routes: {
					"" : "main",
					"aaa" : "defaultRoute"
				},
				
				main: function(actions) {
					console.log(actions);
					$(".container-main").show();
				},
				
				defaultRoute: function(actions) {
					$(".container-main").hide();
					//_navigate("login.do", {trigger: true, replace: true});
				}
			});
			
			appRouter = new AppRouter;
			
			Backbone.history.start();
			
			function _navigate(url, options) {
				options = options || true;  
				appRouter.navigate(url, options);
			}
			// 현재 날짜
//			cfFind(Config.CONTEXT_PATH + "/findStdDate", null, function(jsonData) {
//				var stdDate = jsonData.STD_DATE;
//				if(stdDate != "") {
//					var date = stdDate.substring(4, 6) + "/" + stdDate.substring(6, 8) + "/" + stdDate.substring(0, 4);
//					
//					$("#stdDate").datepicker({
//						format: 'yyyy-mm-dd',
//						onSelect: function(dateText, inst) {
//							var date = $(this).val();
//							if(date != null || date != "") {
//								searchList();
//							}
//						}
//					});
//					$("#stdDate").val(date);
//					
//				}
//				
//			}, false);
			
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