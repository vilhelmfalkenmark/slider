$( document ).ready(function() {
///////////////////////////////////////////////
//////////// GET VALUES FROM FORM
///////////////////////////////////////////////

///////////////////////////////////////////////
//////////// DEFINE VALUES AND GET DOM
///////////////////////////////////////////////
var dragger = $('[data-id="dragger"]');
var line = $('[data-id="line"]');
var sliderContainer = $('[data-id="slider-container"]')
var sum = $('[data-id="sum"]');
var min = 0;

// VALUE FROM HIDDEN FORM
var max = parseInt($('input[data-id="maxvalue"]').val());
var interval = parseInt($('input[data-id="interval"]').val());
var item = $('input[data-id="item"]').val();
var itemprice = parseInt($('input[data-id="itemprice"]').val());

var itemAmount = $('[data-id="itemamount"]'); // HTML OUTPUT FOR HOW MANY ITEMS THE DONATED SUM CAN BUY



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

          //  console.log(offsetLeft);
          //  console.log(draggerPercentage);
           sumValue = offsetLeft+(draggerPercentage/2);


           ///////////////////////////////////////////////
           //////////// CSS AND HTML
           ///////////////////////////////////////////////
           if((offsetLeft + draggerPercentage) >= 99) {
             dragger.css({
               "right":"0",
               "left": ""
             })
             sum.html(max)
             itemAmount.html(max/itemprice+" "+item)
           }
           else if(offsetLeft < 1) {
             dragger.css({
               "right":"",
               "left": "0"
             })
             sum.html(min)
             itemAmount.html(min+" "+item)
           }
           else {
             dragger.css({
               "right":"",
               "left": offsetLeft+"%"
             })

            var outputValue = (sumValue*ratio).toFixed(0);
            if(outputValue % interval == 0 ) {
              sum.html(outputValue)
              itemAmount.html(outputValue/itemprice+" "+item)
            }
           }
      });
  });


  sliderContainer.bind('mouseup',function(){
    console.log("Nu är musen uppe");
      sliderContainer.unbind('mousemove');
  });
});
