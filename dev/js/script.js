$( document ).ready(function() {
///////////////////////////////////////////////
//////////// DEFINE VALUES AND GET DOM
///////////////////////////////////////////////
var dragger = $('[data-id="dragger"]');
var draggerCircle = $('[data-id="dragger-circle"]');
var line = $('[data-id="line"]');
var sliderContainer = $('[data-id="slider-container"]')
var sum = $('[data-id="sum"]');
var min = 0;
var itemamountHeader = $('[data-id="itemamount-header"]');
var itemAmountItem = $('[data-id="itemamount-item"]');
var donate = $('[data-id="donate"]');
///////////////////////////////////////////////
//////////// GET VALUES FROM FORM
///////////////////////////////////////////////
var max = parseInt($('input[data-id="maxvalue"]').val());
var interval = parseInt($('input[data-id="interval"]').val());
var item = $('input[data-id="item"]').val();
var itemprice = parseInt($('input[data-id="itemprice"]').val());
var itemAmount = $('[data-id="itemamount"]'); // HTML OUTPUT FOR HOW MANY ITEMS THE DONATED SUM CAN BUY
  itemamountHeader.html(min);
  itemAmountItem.html(item);
  ///////////////////////////////////////////////
  //////////// MOUSEDOWN
  ///////////////////////////////////////////////
  dragger.bind('mousedown', function(e){
    var draggerWidth = dragger.width()
    var lineWidth = line.width();
    var mouseX = e.pageX - line.offset().left; // MUSENS X VÄRDE I FÖRHÅLLANDE TILL LINJEN
    var draggerPercentage = ((draggerWidth/lineWidth)*100).toFixed(0);
    draggerPercentage = parseInt(draggerPercentage);
    var innerOffset = mouseX - $(this).position().left;
    var ratio = max/100;
    var sumValue;
      ///////////////////////////////////////////////
      //////////// MOUSEMOVE
      ///////////////////////////////////////////////
      sliderContainer.bind('mousemove', function(e){
           mouseX = e.pageX - line.offset().left;
           var offsetLeft = ((mouseX-innerOffset)/line.width()*100);
           itemAmountItem.html(item)
           sumValue = offsetLeft+(draggerPercentage/2);
           ///////////////////////////////////////////////
           //////////// CSS AND HTML
           ///////////////////////////////////////////////
           if((offsetLeft + draggerPercentage) >= 99) {
             dragger.css({
               "right":"0",
               "left": ""
             })
             itemamountHeader.html(max/itemprice)
             sum.html(max)
             donate.val(max)
           }
           else if(offsetLeft < 1) {
             dragger.css({
               "right":"",
               "left": "0"
             })
             itemamountHeader.html(min)
             sum.html(min)
             donate.val(min)
           }
           else {
             dragger.css({
               "right":"",
               "left": offsetLeft+"%"
             })
            var outputValue = (sumValue*ratio).toFixed(0);
            if(outputValue % interval < 2) {
              itemamountHeader.html(outputValue/itemprice)
              sum.html(outputValue)
              donate.val(outputValue)
            }
           }
      });
  });
  ///////////////////////////////////////////////
  //////////// UNBIND MOUSEEVENTS
  ///////////////////////////////////////////////
  sliderContainer.bind('mouseup',function(){
      sliderContainer.unbind('mousemove');
  });
});
