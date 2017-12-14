window.onload = function() {

var characters = [
  {"name":"Pikachu", "hp":100, "ap":14, "cap":40, "image":"", "bg":"#ffeb3b", "attack":"bolt"},
  {"name":"Squirtle", "hp":120, "ap":12, "cap":25, "image":"", "bg":"#488cc7", "attack":"tint"},
  {"name":"Charmander", "hp":130, "ap":10, "cap":15, "image":"", "bg":"#ff9b00", "attack":"fire"},
  {"name":"Bulbasaur", "hp":150, "ap":8, "cap":10, "image":"", "bg":"#05ab64", "attack":"leaf"}
];
var characterIndex;
var defenderIndex;
var remainingEnemies = characters.length-1;


function click(){
  // pick a character
  if (characterIndex === undefined) {
    characterIndex = $(this).attr('number');
    $("[number='" + characterIndex + "'] .container").css("background-color", characters[characterIndex].bg);

    // Set player character base attack power
    characters[characterIndex].baseAP = characters[characterIndex].ap;

    // Move your character to your character area
    $("[number='" + characterIndex + "']").hide().appendTo("#your-character").fadeIn('slow');
    // Set background color
    $("[number='" + characterIndex + "'] .charimg").html('<img src="assets/images/' + characters[characterIndex].name.toLowerCase() + 'back.gif">');
    // Move ramaining characters to enemies area
    $("#characters").children().hide().appendTo("#enemies").fadeIn('slow');
    // hide characters area 
    $("#characters").animate({
    height: "0",
    opacity: "0",
    marginTop: "0",
    }, 800 );

    $("#notification").html("Choose an opponant");

    // Set unique attack button properties
    var attack = characters[characterIndex].attack

    $("#attack").append("<i></i><p>Attack</>").addClass(attack).click(runAttack);
    $("#attack i").addClass("fas fa-"+attack);
  
  // Pick new defender
  } else if (defenderIndex === undefined) {  

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
}


function runAttack() {
  // hide button
  $("#attack").fadeOut(200);
  // attack
  shake(defenderIndex);
  animateDamage("#opponent-damage", characters[characterIndex].ap);
  // enemy take damage
  characters[defenderIndex].health -= characters[characterIndex].ap; 
  updateLife(defenderIndex);
  battleUpdate(characters[defenderIndex].name + ' took ' +  characters[characterIndex].ap + ' damage');

  // see if enemy was defeated
  if (characters[defenderIndex].health <= 0) {
    setTimeout(function(){
    $("#notification").html("Pick a new enemy to fight!");
    battleUpdate(characters[defenderIndex].name +" was defeated!");
    remainingEnemies--
    // hide attack button
    $("#attack").fadeOut(100);
    // remove defeated enemy
    $("[number='" + defenderIndex + "']").fadeOut(900);
    // set defenderIndex back to undefined
    defenderIndex = undefined;
    // check for win
    }, 800);
    setTimeout(function(){
      if (remainingEnemies === 0) {
        $("#notification").html("You Win!");
        battleUpdate("No enemies left. You Win!");
        $("#attack").fadeOut(200); 
      };
    }, 1600);
  } else {
    // counter attack
    setTimeout(function(){
      shake(characterIndex);
      animateDamage("#my-damage", characters[defenderIndex].cap);
      // take damage
      characters[characterIndex].health -= characters[defenderIndex].cap;
      updateLife(characterIndex); 
      battleUpdate(characters[characterIndex].name + ' took ' +  characters[defenderIndex].cap + ' damage');

      // check for defeat
      if (characters[characterIndex].health <= 0) {
        $("#notification").html("You have been defeated!!");
        battleUpdate(characters[characterIndex].name +" was defeated!");
        $("#attack").fadeOut(200);
        $("[number='" + characterIndex + "']").fadeOut(900);
      } else {
        setTimeout(function(){
          // raise character attack by base attack power
          characters[characterIndex].ap += characters[characterIndex].baseAP
          battleUpdate(characters[characterIndex].name + "'s AP rose to "  + characters[characterIndex].ap)
          animateAPrise(characters[characterIndex].baseAP);
          $("#attack").fadeIn(200);
        }, 800);
      }
    }, 800);
  }
}



function battleUpdate(message){
  $('<li style="display: none;">'+message+'</li>').prependTo($("#battle-log")).slideDown(500);
}

function shake(charnumber) {
  $("[number='" + charnumber + "'] .charimg").effect( "shake", {times:2, distance: 2}, 400 );
}

function animateDamage(id, amount){
  $(id).css('color','#ca0404');
  $(id).show().html("-" + amount).animate({
    opacity: .2,
    marginTop: "30px"
  }, 1400, function () { $(this).removeAttr('style').hide(); });
}

function animateAPrise(amount){
  console.log("worked");
  $("#my-ap").css('color','#76bfff');
  $("#my-ap").show().html("+" + amount).animate({
    opacity: .2,
    marginTop: "30px"
  }, 1400, function () { $(this).removeAttr('style').hide(); });
}

function updateLife(number) {
  // update HP number under character
  $("[number='" + number + "'] .hp-area").html("HP:" + characters[number].health +"/"+characters[number].hp);
  // find character health percent
  var percentHealth = characters[number].health/characters[number].hp*100;
  // find character life-bar element
  var $element = $("[number='" + number + "'] .life-bar");
  // set width of life-bar element
  $element.find('div').animate({ width: (percentHealth * $element.width()/100) }, 300);
  // set life-bar color function
  function bgColor(color) {
    $element.find('div').css("background-color", color);
  }
  // color range
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


$("#notification").html("Choose a character");
$("#attack").hide();

// create character divs
$.each( characters, function( key, value ) {
  value.health = value.hp; // set characters health equal to total hp
  // add characters to html
  var $div = $("<div>", {"number": key, "class": "character"}).click(click);
  $div.html('<h3>' + characters[key].name + '</h3>');
  $div.append('<div class="container"><div class="charimg"><img src="assets/images/' + characters[key].name.toLowerCase() + '.gif"></div></div>');
  $div.append('<div class="hp-area"></div><div class="life-bar"><div></div></div>');
  $("#characters").append($div);
  // update life bar
  updateLife(key);
});



} // window.onload

