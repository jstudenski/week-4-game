window.onload = function() {


var characters = [    
  {"name":"character1", "hp":110, "ap":40, "cap":31, "image":""},    
  {"name":"character2", "hp":120, "ap":30, "cap":32, "image":""},  
  {"name":"character3", "hp":130, "ap":20, "cap":33, "image":""},    
  {"name":"character4", "hp":140, "ap":10, "cap":34, "image":""}
];
var characterIndex;
var enemyIndex;


// console.log(characters[0].hp);
// console.log(characters[0].name);

$.each( characters, function( key, value ) {
  console.log(characters[key].name);
  var $div = $("<div>", {id: characters[key].name, "class": "character"});
  $div.html(characters[key].name);

  $div.append("<br>HP: " + characters[key].hp);

  $div.append('<div class="life-bar" id="' +characters[key].name+ 'life"><div></div></div>');

 // console.log(characters[key].ap);

  $div.click(function(){ 
    selectedCharacter = key;
    chooseCharacter(this);
  });

  $("#characters").append($div);
});


progress(100, $('#character1life'));
progress(90, $('#character2life'));
progress(80, $('#character3life'));
progress(70, $('#character4life'));







// stage 1 - Pick Your Character
function chooseCharacter(selected) {
  $(selected).appendTo("#your-character");


  // Move ramaining characters to enemies
  var enemies = $("#characters").children();

  // stage 2 - Pick Your Enemy 
  enemies.click(function(){ 
    // console.log(this);
    
    console.log("**" + this.id);

    $(this).appendTo("#defender");


    $("#attack-button").html("Attack!");
    $("#attack-button").css("background-color","#000");
    $("#attack-button").css("color","#fff"); 
    $("#attack-button").css("width","100px"); 
    $("#attack-button").css("height","30px"); 

  });

  enemies.appendTo("#enemies");
}


$( "#attack-button" ).click(function() {
  console.log("Handler for .click() called.");
  $("#your-character");

});










// // console.log(object.hp);
// var health = 100;
// // console.log(health);
// progress(health, $('#lifeBar'));

//   $("#plus").on("click", function() {
//       if (health < 100) {
//         health+=10
//         console.log(health);  
//         progress(health, $('#lifeBar'));    
//       }

//   });

//   $("#minus").on("click", function() {
//       if (health > 0) {
//         health-=10
//         console.log(health); 
//         progress(health, $('#lifeBar'));
//       }
//   });


function progress(percent, $element) {

    console.log("worked", percent, $element);


    var progressBarWidth = percent * $element.width() / 100;
    $element.find('div').animate({ width: progressBarWidth }, 300);  //.html(percent + "% ")
    
   // $("#notification").html(percent);

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

