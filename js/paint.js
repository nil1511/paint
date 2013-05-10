$(function(){
var x1,y1,x2,y2l;
    var can = $("canvas")[0].getContext("2d");
$("#paint").mousedown(function(e){
can.beginPath();
x1=e.clientX;
y1=e.clientY;
can.moveTo(x1, y1);

});
$("#paint").mouseup(function(e){
x2=e.clientX;
y2=e.clientY;
can.lineTo(x2, y2);

can.stroke();
});

});