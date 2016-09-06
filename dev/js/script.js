$( document ).ready(function() {
///////////////////////////////////////////////
//////////// DEFINE VALUES AND GET DOM
///////////////////////////////////////////////
var dragger = $('[data-id="dragger"]');
var draggerCircle = $('[data-id="dragger-circle"]');
var line = $('[data-id="line"]');
var sliderContainer = $('[data-id="slider-container"]')
var sum = $('[data-id="sum"]');
var minDonate = 0;
var itemamountHeader = $('[data-id="itemamount-header"]');
var itemAmountItem = $('[data-id="itemamount-item"]');
var donate = $('[data-id="donate"]');
///////////////////////////////////////////////
//////////// GET VALUES FROM FORM
///////////////////////////////////////////////
var maxDonate = parseInt($('input[data-id="maxvalue"]').val());
var priceRatio = maxDonate/100;
var interval = parseInt($('input[data-id="interval"]').val());
var item = $('input[data-id="item"]').val();
var itemprice = parseInt($('input[data-id="itemprice"]').val());
var itemAmount = $('[data-id="itemamount"]'); // HTML OUTPUT FOR HOW MANY ITEMS THE DONATED SUM CAN BUY
  itemamountHeader.html(minDonate);
  itemAmountItem.html(item);
  ///////////////////////////////////////////////
  //////////// MOUSEDOWN
  ///////////////////////////////////////////////
  dragger.bind('mousedown', function(e){
    var draggerWidth = dragger.width()
    var lineWidth = line.width();
    var mouseX = e.pageX - line.offset().left; // THE MOUSE X-VALUE IN RELATION TO THE LINE
    var max = (1-(draggerWidth/lineWidth))*100;
    var draggerPercentage = ((draggerWidth/lineWidth)*100).toFixed(0);
    draggerPercentage = parseInt(draggerPercentage);
    var innerOffset = mouseX - $(this).position().left;
    var sumValue;
      ///////////////////////////////////////////////
      //////////// MOUSEMOVE
      ///////////////////////////////////////////////
      sliderContainer.bind('mousemove', function(e){
           mouseX = e.pageX - line.offset().left;
           var offsetLeft = ((mouseX-innerOffset)/line.width()*100);
           itemAmountItem.html(item)
           sumValue = offsetLeft+(draggerPercentage/2); // How far percentagewise the dragger is on the line

          var donateSum = (sumValue*priceRatio).toFixed(0);
           update(offsetLeft,max,donateSum,"%")
      });
  });
  ///////////////////////////////////////////////
  //////////// UNBIND MOUSEEVENTS
  ///////////////////////////////////////////////
  sliderContainer.bind('mouseup',function(){
      sliderContainer.unbind('mousemove');
  });
  ///////////////////////////////////////////////
  //////////// TABLET + PHONE
  ///////////////////////////////////////////////
  if(screen.width <= 1024) {
    var screenWidth = screen.width;
     lineWidth = line.width();
    draggerWidth = dragger.width();
    // var diff = lineWidth - draggerWidth;
    var max = lineWidth - draggerWidth;
    var percentage;
    var lineLeft = line.offset().left;

    window.addEventListener("orientationchange", updateOrientation);
    function updateOrientation(e) {
      max = line.width() - dragger.width();
      lineLeft = line.offset().left;
    }

    dragger.on('touchmove', $(this), function(e) {
      e.preventDefault();
        var xPos = e.originalEvent.touches[0].pageX;
        var offsetLeft = xPos - 75; // CENTER OF GREEN CIRCLE
        percentage = (($(this).offset().left - lineLeft)/max)*100;
        var donateSum = (percentage*priceRatio).toFixed(0);
        update(offsetLeft,max,donateSum,"px")
      });
  }
  ///////////////////////////////////////////////
  //////////// UPDATE FUNCTION
  ///////////////////////////////////////////////
  var donateRound;
  var update = function (left, max, donateSum, unit) {
    if(donateSum<0) {
      donateSum = 0;
    }
    donateRound = Math.round(donateSum / interval) * interval
    if(left >= max) { // MAX-VALUE ON THE LINE
      itemamountHeader.html(maxDonate/itemprice)
      sum.html(maxDonate)
      donate.val(maxDonate)
      dragger.css({
           "right":"0",
           "left": ""
         })
    }
    else if(left <= 0) { // MIN-VALUE ON THE LINE
      itemamountHeader.html(minDonate)
      sum.html(minDonate)
      donate.val(minDonate)
      dragger.css({
           "right":"",
           "left": 0
         })
    }
    else { // SOMEWHERE BETWEEN MAX AND MIN
      itemamountHeader.html((donateRound/itemprice).toFixed(0));
      sum.html(donateRound)
      donate.val(donateRound)
         dragger.css({
           "right":"",
           "left": left+unit
         })
    }
  }
});
