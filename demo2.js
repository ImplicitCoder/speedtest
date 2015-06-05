window.onload= function(){
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame =
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame;
  }

      var count=0;
      var sampleArray = [];
      var reqPaintTime;
      var colorValue = 0;
      var countFrames = 0;
      var reqFrames = 10;
      var colorArray = ["blue", "green", "red", "yellow"];


      function testAnimation(now) {
        var nowRound = Math.round(now);
        sampleArray.push(nowRound);
        if (count < 100){
          window.requestAnimationFrame(testAnimation);
          count += 1;
        } else if (count = 100) {
          sampleArray.shift();  // First measurement is incorrect ??
          diffArray=_.map(sampleArray, function(value, key, list){
                if (key < (list.length - 1)) {
                    return list[key+1] - value;
                } else { return 0 }
              });
          diffArray.pop();
          avgPeriod=diffArray.reduce(function(previousValue, currentValue ) {
                return previousValue + currentValue;
              }) / diffArray.length;
          dispArray=_.map(diffArray, function(value){
                    return " "+value;
                  });
          $('#refresh').html("Mesured time between refreshes (ms): " + dispArray.toString() + "<p> Average period: " + avgPeriod +" ms.<p>Measured refresh frequency: " + Math.round(1000/avgPeriod) +" Hz.");
        }
      };

   window.requestAnimationFrame(testAnimation);
 function animate(now){
      console.log("animation executed at " + now);
      animateDelay = now - reqPaintTime;
      console.log("the animation executed " +animateDelay +" ms after it was requested");
      $('#animation').html("animated!" + Math.random());
         };

  $("#requestpaint").on("click", function(){
    reqPaintTime =performance.now();
    console.log("repaint requested at " + reqPaintTime);
    window.requestAnimationFrame(animate);
    });

  function animateBox(now){
    var color = colorArray[colorValue%4]; 
    $('#box').css("background-color", color);

    if (countFrames > reqFrames){
  
    colorValue += 1;
    countFrames = 0;
    }
    countFrames +=1;
  window.requestAnimationFrame(animateBox);
  }
  window.requestAnimationFrame(animateBox);


};
