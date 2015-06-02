window.onload= function(){
  
  var outArray = [];
  var outArrayKeys = [];
  var keypressOne= true;
  var timeOne;
  var timeTwo;

  console.log('script running');

  //   Detects and displays time mousepointer remains inside box
  $("#box").on( "mouseenter", function(){
    console.log('mouse in detected');
    timeIn = new Date;
    $("#box").one( "mouseout", function(){
      console.log('mouse out detected');
      var timeOut = new Date;
      var timeDiff = timeOut - timeIn;
      $("#results tr:last").after("<tr><td>measured difference: " + timeDiff +  " ms</td> </tr>");
      $("#outputbox").scrollTop($("#outputbox")[0].scrollHeight);
      outArray.push(timeDiff);
    });
  });

  //   Detects and display time between a pair of keypresses
  $('body').on("keydown", function(){
    if (keypressOne){
      console.log("keypress");
      keypressOne = false;
      $("#keybutton").html("First keystroke detected");
      timeOne = new Date;
    } else {
      console.log("keypresstwo");
      timeTwo = new Date;

      $("#keybutton").html("Second keystroke detected");
      timeDiffKey = timeTwo - timeOne;
      console.log("time between 2 keystrokes was " + timeDiffKey);
      $("#resultskeys tr:last").after("<tr><td>measured difference: " + timeDiffKey +  " ms</td> </tr>");
      $("#outputboxkeys").scrollTop($("#outputboxkeys")[0].scrollHeight);
      outArrayKeys.push(timeDiffKey);
      keypressOne = true;
    };
  });


  //  Display measured results as CSV string
  $("#generate").on("click", function(){
    $("#outcontainer").html("<p>Mousemoves output values as CSV: " + outArray.toString()+ " </p>" + "<p>Keystrokes output values as CSV: " + outArrayKeys.toString()+ " </p>" );
  });

};
