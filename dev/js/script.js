$( document ).ready(function() {
///////////////////////////////////////////////
//////////// DEFINE VALUES AND GET DOM
///////////////////////////////////////////////
var dragger = $('[data-id="dragger"]');
var line = $('[data-id="line"]');
var sliderContainer = $('[data-id="slider-container"]')
var sum = $('[data-id="sum"]');
var minDonate = 0;
var itemamountHeader = $('[data-id="itemamount-header"]');
var itemAmountItem = $('[data-id="itemamount-item"]');
var donate = $('[data-id="donate"]');
var initialDonate = parseInt(donate.val());
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
/////////////////////////////////////////////////////////
//////////// GLOBAL VARIABLES MANIPULATED ON INTERACTION
////////////////////////////////////////////////////////
var screenWidth = screen.width;
var invers, max, offsetLeft, donateSum, xPos, lineLeft;
var draggerWidth = dragger.width()
var lineWidth = line.width();
  ///////////////////////////////////////////////
  //////////// MOUSEDOWN
  ///////////////////////////////////////////////
  dragger.bind('mousedown', function(e){
    draggerWidth = dragger.width()
    lineWidth = line.width();
    var mouseX = e.pageX - line.offset().left; // THE MOUSE X-VALUE IN RELATION TO THE LINE
    console.log(e.pageX);
    max = (1-(draggerWidth/lineWidth))*100;
    var innerOffset = mouseX - $(this).position().left;
    var sumValue;
    //=======================================
    // ÄNDRAT
    invers = 1/(1-((draggerWidth/lineWidth)));
    itemAmountItem.html(item)
    //=========================================
      ///////////////////////////////////////////////
      //////////// MOUSEMOVE
      ///////////////////////////////////////////////
      sliderContainer.bind('mousemove', function(e){
        //=======================================
        //      ÄNDRAT
           mouseX = e.pageX - line.offset().left;
           offsetLeft = ((mouseX-innerOffset)/line.width()*100);
           donateSum = (invers * offsetLeft * priceRatio).toFixed(0);
           update(offsetLeft,max,donateSum)
        //=========================================
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
  if(screenWidth <= 1024) {
    max = (1-(draggerWidth/lineWidth))*100;
    lineLeft = line.offset().left;
    invers = 1/(1-((draggerWidth/lineWidth)));
    window.addEventListener("orientationchange", updateOrientation);
    function updateOrientation(e) {
      max = line.width() - dragger.width();
      lineLeft = line.offset().left;
    }
    dragger.on('touchmove', $(this), function(e) {
      e.preventDefault();
        xPos = e.originalEvent.touches[0].pageX - lineLeft - (draggerWidth/2);
        offsetLeft = ((xPos)/lineWidth*100);
        donateSum = (invers * offsetLeft * priceRatio).toFixed(0);
        update(offsetLeft,max,donateSum)
      });
  }
  ///////////////////////////////////////////////
  //////////// INITIAL DONATION
  ///////////////////////////////////////////////
  var z = draggerWidth/lineWidth;
  var x = (initialDonate/maxDonate)*100;
  var y = x * (1-z);
  update(y,((1-(z))*100),initialDonate)
  ///////////////////////////////////////////////
  //////////// UPDATE FUNCTION
  ///////////////////////////////////////////////
  var donateRound;
  function update(left, max, donateSum) {
    donateRound = Math.floor(donateSum / interval) * interval
    if(left >= max) { // MAX-VALUE ON THE LINE
      itemamountHeader.html(maxDonate/itemprice)
      sum.html(maxDonate)
      donate.val(maxDonate)
      dragger.css({
           "right":"0",
           "left": ""
         })
    }
    else if(left < 0) { // MIN-VALUE ON THE LINE
      itemamountHeader.html(minDonate)
      sum.html(minDonate)
      donate.val(minDonate)
      dragger.css({
           "right":"",
           "left": 0
         })
    }
    else { // SOMEWHERE BETWEEN MAX AND MIN
      itemamountHeader.html(Math.floor(donateRound/itemprice));
      sum.html(donateRound)
      donate.val(donateRound)
         dragger.css({
           "right":"",
           "left": left+"%"
         })
    }
  }
///////////////////////////////////////////////
/////// SUFFICIENCE
///////////////////////////////////////////////
// VALUES FROM FORM
var sDonate = $('[data-id="sufficience-donate"]');
var sLeftValue = $('[data-id="sufficience-left-value"]').val();
var sLeftString = $('[data-id="sufficience-left-string"]').val();
var sRightValue = $('[data-id="sufficience-right-value"]').val();
var sRightString = $('[data-id="sufficience-right-string"]').val();
// DOM
var sExampleLeftValue = $('[data-id="sufficience-example-left-value"]');
var sExampleLeftString = $('[data-id="sufficience-example-left-string"]');
var sExampleRightValue = $('[data-id="sufficience-example-right-value"]');
var sExampleRightString = $('[data-id="sufficience-example-right-string"]');

sExampleLeftString.html(sLeftString)
sExampleRightString.html(sRightString)

var number;
sDonate.on("input",function(e) {
number = e.target.value;
updateSufficience(number)
});
function updateSufficience(sum) {
sExampleLeftValue.html(Math.floor(sum/sLeftValue));
sExampleRightValue.html(Math.floor(sum/sRightValue));
}
updateSufficience(sDonate.val());
});
