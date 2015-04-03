angular.module('mean.mean-admin').directive('ngNotification',function(){
    return{
        restrict : 'A',
        link : function(scope,element,attrs){
            element.bind('click',function clickHandler(){
            	console.log("value received..==="+attrs.ngNotification);
            	//$("#notification").show();
            	$("#notification").fadeIn(800);
               	$("#cancelnotification").click(function(){
                   $("#notification").fadeOut(100);
               });
               	setTimeout(function(){
				    $("#notification").hide();
				}, 20000);
               	
               	
            });
        }
    }
});