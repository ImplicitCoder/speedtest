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
      var animRunning = true;
      var flashCount = 0;

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
          $('#refresh').html("Measured time between refreshes (ms): " + dispArray.toString() + "<p> Average period: " + avgPeriod +" ms.<p>Measured refresh frequency: " + Math.round(1000/avgPeriod) +" Hz.");
        }
      };

   window.requestAnimationFrame(testAnimation);
 

  function animateBox(now){
    var color = colorArray[colorValue%4]; 
    $('#box').css("background-color", color);

    if (countFrames > reqFrames){
  
    colorValue += 1;
    countFrames = 0;
    }
    countFrames +=1;
    if (animRunning) {
      window.requestAnimationFrame(animateBox);
    }
  };

  function flash(now){
    $('#box-two').css("background-color", "black");
    if (flashCount < flashDuration){
      window.requestAnimationFrame(flash)
      flashCount += 1;
      console.log(flashCount);
    }
    else if (flashCount = flashDuration){
      $('#box-two').css("background-color", "lightblue");
    }
  };

  $("#start").on("click", function(){
      reqFrames = $("#numberframes").val();
      animRunning = true;
      window.requestAnimationFrame(animateBox);
  });
  
  $("#stop").on("click", function(){
    animRunning = false;
  });

  $("#flash").on("click", function(){
      flashCount = 0;
      flashDuration = $("#numberflash").val();
      window.requestAnimationFrame(flash);
  });
};
