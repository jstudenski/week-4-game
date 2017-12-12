window.onload = function() {


var characters = [
  {"name":"Pikachu", "hp":100, "ap":10, "cap":50, "image":"", "bg":"#ffeb3b", "attack":"bolt"},
  {"name":"Squirtle", "hp":120, "ap":8, "cap":25, "image":"", "bg":"#488cc7", "attack":"tint"},
  {"name":"Charmander", "hp":130, "ap":7, "cap":20, "image":"", "bg":"#ff9b00", "attack":"fire"},
  {"name":"Bulbasaur", "hp":150, "ap":5, "cap":10, "image":"", "bg":"#05ab64", "attack":"leaf"}
];
var characterIndex;
var defenderIndex;

$("#notification").html("Choose a character");
$("#attack").hide();

$.each( characters, function( key, value ) {
  value.health = value.hp; // set characters health equal to total hp
  // add characters to html
  var $div = $("<div>", {"number": key, "class": "character"});
  $div.html('<h3>' + characters[key].name + '</h3>');
  $div.append('<div class="container"><div class="charimg"><img src="assets/images/' + characters[key].name + '.gif"></div></div>');
  $div.append('<div class="hp-area"></div>');
  $div.append('<div class="life-bar"><div></div></div>');
  $("#characters").append($div);
   // update life bar
  updateLife(key);
});





$(".character").click(function() {

  // pick a character
  if (characterIndex === undefined) {
    characterIndex = $(this).attr('number');
    $("[number='" + characterIndex + "'] .container").css("background-color", characters[characterIndex].bg);

    // Set player character base attack power
    characters[characterIndex].baseAP = characters[characterIndex].ap;

    // Move your character to your character area
    $("[number='" + characterIndex + "']").hide().appendTo("#your-character").fadeIn('slow');
    // Set background color
    $("[number='" + characterIndex + "'] .charimg").html('<img src="assets/images/' + characters[characterIndex].name + 'back.gif">');


    // Move ramaining characters to enemies area
    $("#characters").children().hide().appendTo("#enemies").fadeIn('slow');

    // hide characters area 
    $("#characters").animate({
    height: "0",
    margin: "0",
    opacity: "0"
    }, 800 );

    $("#notification").html("Choose an opponant");

    // Set unique attack button properties
    var attack = characters[characterIndex].attack
    $("#attack").addClass(attack);
    $("#attack").append("<i></i>");
    $("#attack i").addClass("fas fa-"+attack);
    $("#attack").append("<p>Attack</>");
  

  } else if (defenderIndex === undefined) {  // Pick new defender

    if (characterIndex === $(this).attr('number')) {
      $("#notification").html("Choose opponant from enemies");
      return
    }
    defenderIndex = $(this).attr('number');
    $("[number='" + defenderIndex + "'] .container").css("background-color", characters[defenderIndex].bg);

    $(this).hide().appendTo("#defender").fadeIn('slow');
    $("#notification").html("Click attack to fight!");
    $("#battle-update h4").html(characters[characterIndex].name + " -vs- " + characters[defenderIndex].name);
    $("#attack").fadeIn(300);

  }

});




$("#attack").click(function() {
 
  console.log(characters);
  console.log("Attack: "+characters[characterIndex].ap);
  console.log("Enemy Attack: "+characters[defenderIndex].cap);

  // attack defender
  characters[defenderIndex].health -= characters[characterIndex].ap; 
  updateLife(defenderIndex);

  // see if defender was defeated
  if (characters[defenderIndex].health <= 0) {
    $("#notification").html(characters[defenderIndex].name +" was defeated. Pick a new enemy to fight!");
    // hide attack button

    $("#attack").fadeOut(200);
    // remove character
    $("[number='" + defenderIndex + "']").fadeOut(900);
    // set defenderIndex back to undefined
    defenderIndex = undefined;
    
    // check for win
    if ($("#enemies").is(':empty')) {
      $("#notification").html("YOU WIN!!!");
      $("#attack").fadeOut(200);
    }

    return;

  } 
  // shake if hit
  $("[number='" + characterIndex + "'] .charimg").effect( "shake", {times:2, distance: 2}, 400 );
  $("[number='" + defenderIndex + "'] .charimg").effect( "shake", {times:2, distance: 2}, 400 );

  // take counter attack
  characters[characterIndex].health -= characters[defenderIndex].cap;
  updateLife(characterIndex); 
  // raise character attack by base attack power
  characters[characterIndex].ap += characters[characterIndex].baseAP

  // check for defeat
  if (characters[characterIndex].health <= 0) {
    $("#notification").html("You have been defeated!!");
    $("#attack").fadeOut(200);
    $("[number='" + characterIndex + "']").fadeOut(900);
  }



});





function updateLife(number) {


  $("[number='" + number + "'] .hp-area").html("HP:" + characters[number].health +"/"+characters[number].hp);

  // find character health
  var percentHealth = characters[number].health/characters[number].hp*100;
  // identify character life-bar
  var $element = $("[number='" + number + "'] .life-bar");
  // set width of life-bar
  var progressBarWidth = percentHealth * $element.width()/100;

  $element.find('div').animate({ width: progressBarWidth }, 300);
  
  function bgColor(color) {
    $element.find('div').css("background-color", color); // green
  }

  // color accordingly
  if (percentHealth === 100) {
    bgColor("#4caf50"); // green
  } else if (percentHealth > 60) {
    bgColor("#8bc34a"); // lime
  } else if (percentHealth > 40) {
    bgColor("#ffeb3b"); // yellow
  } else if (percentHealth > 30) {
    bgColor("#ffc107"); // light orange
  } else if (percentHealth > 20) {
    bgColor("#ff9800"); // orange
  } else if (percentHealth > 10) {
    bgColor("#ff5722"); // tomato
  } else {
    bgColor("#f44336"); // red
  }




}





} // window.onload

