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
               	 // $("#undo").removeAttr('data-ng-click');
               	 // $("#undo").attr('data-ng-click',scope.update(attrs.ngNotification));
               // console.log(angular.element($("#notification")).scope());
            });
        }
    }
});