
$( document ).ready(function() {

  var dragger = $("#dragger");
  var line = $("#line");
  var sliderContainer = $("#sliderContainer")




  dragger.bind('mousedown', function(e){

    var mouseX = e.pageX - line.offset().left; // MUSENS X VÄRDE I FÖRHÅLLANDE TILL LINJEN
    var innerOffset = mouseX - $(this).position().left;

      dragger.bind('mousemove', function(e){

        console.log("hejsan!");

           mouseX = e.pageX - line.offset().left; // MUSENS X VÄRDE I FÖRHÅLLANDE TILL LINJEN
          // $(this).css("left",mouseX-innerOffset+"px")
          dragger.css("left",mouseX-innerOffset+"px")



      });


  });
  sliderContainer.bind('mouseup',function(){
    console.log("Nu är musen uppe");
      sliderContainer.unbind('mousemove');
  });
});
