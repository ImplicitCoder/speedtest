window.onload= function(){
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame =
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame;
  }

      var count=0;
      var sampleArray = [];

      function animate(now) {
        var nowRound = Math.round(now);
        sampleArray.push(nowRound);
        if (count < 100){
          window.requestAnimationFrame(animate);
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

  window.requestAnimationFrame(animate);

  $("#requestpaint").on("click", function(){
    console.log("repaint requested")
    });
};
