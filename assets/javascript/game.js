window.onload = function() {


var characters = [    
  {"name":"Pikachu", "hp":110, "ap":40, "cap":31, "image":"", "attack":"bolt"},    
  {"name":"Squirtle", "hp":120, "ap":30, "cap":32, "image":"", "attack":"tint"},  
  {"name":"Charmander", "hp":130, "ap":20, "cap":33, "image":"", "attack":"fire"},    
  {"name":"Bulbasaur", "hp":140, "ap":10, "cap":34, "image":"", "attack":"leaf"}
];
var characterIndex;
var defenderIndex;



// console.log(characters[0].hp);
// console.log(characters[0].name);

$.each( characters, function( key, value ) {
  // set characters health equal to total hp
  value.health=value.hp;

  // add characters to html
  var $div = $("<div>", {"number": key, "class": "character"});
  $div.html(characters[key].name);
  $div.append("<br>HP: " + characters[key].hp);
  $div.append('<div class="life-bar"><div></div></div>');

  $("#characters").append($div);
});




$("#notification").html("choose a character");

$(".character").click(function() {

  // pick a character
  if (characterIndex === undefined) {
    characterIndex = $(this).attr('number');
    console.log(characterIndex);
    // Move your character to your character area
    $("[number='" + characterIndex + "']").appendTo("#your-character");
    // Move ramaining characters to enemies area
    $("#characters").children().appendTo("#enemies");
    $("#notification").html("pick an opponant");
  } else if (defenderIndex === undefined) {  // pick defender

    if (characterIndex === $(this).attr('number')) {
      $("#notification").html("pick opponant from enemies");
      return
    }
    defenderIndex = $(this).attr('number');
    $(this).appendTo("#defender");
    $("#notification").html(characters[characterIndex].name + " -vs- " + characters[defenderIndex].name + " .. click attack to fight!");

    // set unique attack button
    var attack = characters[characterIndex].attack
    $("#attack").addClass(attack);
    $("#attack").append("<i></i>");
    $("#attack i").addClass("fas fa-"+attack);
    $("#attack").append("<p>Attack</>");
    
  }

});

$("#attack-button").click(function() {
  console.log(characters[characterIndex].name + " -vs- " + characters[defenderIndex].name);
});









// characters[0].health = 100;
// characters[1].health = 50;
// characters[2].health = 50;
// characters[3].health = 50;


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

