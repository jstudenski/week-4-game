window.onload = function() {


var characters = [    
  {"name":"Pikachu", "hp":100, "ap":10, "cap":50, "image":"", "attack":"bolt"},    
  {"name":"Squirtle", "hp":120, "ap":8, "cap":25, "image":"", "attack":"tint"},  
  {"name":"Charmander", "hp":130, "ap":7, "cap":20, "image":"", "attack":"fire"},    
  {"name":"Bulbasaur", "hp":150, "ap":5, "cap":10, "image":"", "attack":"leaf"}
];
var characterIndex;
var defenderIndex;




$.each( characters, function( key, value ) {
  // set characters health equal to total hp
  value.health=value.hp;

  // add characters to html
  var $div = $("<div>", {"number": key, "class": "character"});
  $div.html(characters[key].name);
  $div.append('<br><div class="charimg"><img src="assets/images/' + characters[key].name + '.gif"></div>');
  $div.append("HP: " + characters[key].hp);
  $div.append('<div class="life-bar"><div></div></div>');

  $("#characters").append($div);
});

$("#attack").hide();

$("#notification").html("Choose a character");

$(".character").click(function() {

  // pick a character
  if (characterIndex === undefined) {
    characterIndex = $(this).attr('number');
    // Set player character base attack power
    characters[characterIndex].baseAP = characters[characterIndex].ap;

    // Move your character to your character area
    $("[number='" + characterIndex + "']").appendTo("#your-character");
    $("[number='" + characterIndex + "'] .charimg").html('<img src="assets/images/' + characters[characterIndex].name + 'back.gif">');


    // Move ramaining characters to enemies area
    $("#characters").children().appendTo("#enemies");
    $("#characters").hide();

    $("#notification").html("Choose an opponant");

    // Set unique attack button properties
    var attack = characters[characterIndex].attack
    $("#attack").addClass(attack);
    $("#attack").append("<i></i>");
    $("#attack i").addClass("fas fa-"+attack);
    $("#attack").append("<p>Attack</>");
  

  } else if (defenderIndex === undefined) {  // pick defender

    if (characterIndex === $(this).attr('number')) {
      $("#notification").html("Choose opponant from enemies");
      return
    }
    defenderIndex = $(this).attr('number');
    $(this).appendTo("#defender");
    $("#notification").html(characters[characterIndex].name + " -vs- " + characters[defenderIndex].name + " .. click attack to fight!");

    $("#attack").show();


    

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
    $("#attack").hide();
    // remove character
    $("[number='" + defenderIndex + "']").remove();
    // set defenderIndex back to undefined
    defenderIndex = undefined;
    
    // check for win
    if ($("#enemies").is(':empty')) {
      alert("YOU WIN!!!");
    }

    return;

  } 

  // take counter attack
  characters[characterIndex].health -= characters[defenderIndex].cap;
  updateLife(characterIndex); 
  // raise character attack by base attack power
  characters[characterIndex].ap += characters[characterIndex].baseAP

  // check for defeat
  if (characters[characterIndex].health <= 0) {
    alert("you have been defeated!!");
  }




});



updateLife(0);
updateLife(1);
updateLife(2);
updateLife(3);

function updateLife(number) {
  // find character health
  var percentHealth = characters[number].health/characters[number].hp*100;
  // identify character life-bar
  var $element = $("[number='" + number + "'] .life-bar");
  // set width of life-bar
  var progressBarWidth = percentHealth * $element.width()/100;
  $element.find('div').animate({ width: progressBarWidth }, 300);
  // color accordingly
  if (percentHealth === 100) {
    $element.find('div').css("background-color", "#4caf50"); // green
  } else if (percentHealth > 60) {
    $element.find('div').css("background-color", "#8bc34a"); // lime
  } else if (percentHealth > 40) {
    $element.find('div').css("background-color", "#ffeb3b"); // yellow
  } else if (percentHealth > 30) {
    $element.find('div').css("background-color", "#ffc107"); // light orange
  } else if (percentHealth > 20) {
    $element.find('div').css("background-color", "#ff9800"); // orange
  } else if (percentHealth > 10) {
    $element.find('div').css("background-color", "#ff5722"); // tomato
  } else {
    $element.find('div').css("background-color", "#f44336"); // red
  }
}





} // window.onload

