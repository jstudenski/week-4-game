window.onload = function() {

var health = 100;


console.log(health);
progress(health, $('#lifeBar'));

  $("#plus").on("click", function() {

      if (health < 100) {
        health+=10
        console.log(health);  
        progress(health, $('#lifeBar'));    
      }

  });

  $("#minus").on("click", function() {
      if (health > 0) {
        health-=10
        console.log(health); 
        progress(health, $('#lifeBar'));
      }
  });





function progress(percent, $element) {
    var progressBarWidth = percent * $element.width() / 100;
    $element.find('div').animate({ width: progressBarWidth }, 300);  //.html(percent + "% ")

    if (percent === 100) {
      $element.find('div').css("background-color", "#4caf50"); // green
    } else if (percent > 60) {
      $element.find('div').css("background-color", "#8bc34a"); // lime
    } else if (percent > 40) {
      $element.find('div').css("background-color", "#ffeb3b"); // yellow
    } else if (percent > 30) {
      $element.find('div').css("background-color", "#ffc107"); // light orange
    } else if (percent > 20) {
      $element.find('div').css("background-color", "#ff9800"); // orange
    } else if (percent > 10) {
      $element.find('div').css("background-color", "#ff5722"); // tomato
    } else {
      $element.find('div').css("background-color", "#f44336"); // red
    }
}





} // window.onload

