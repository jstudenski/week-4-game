window.onload = function() {


var characters = [    
  {"name":"character1", "hp":110, "ap":40, "cap":31, "image":""},    
  {"name":"character2", "hp":120, "ap":30, "cap":32, "image":""},  
  {"name":"character3", "hp":130, "ap":20, "cap":33, "image":""},    
  {"name":"character4", "hp":140, "ap":10, "cap":34, "image":""}
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


  // $div.click(function(){ 
  //   characterIndex = key;
  //   chooseCharacter(this);
  // });

  $("#characters").append($div);
});



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


$("#attack-button").click(function() {
  console.log("Handler for .click() called.");
 //  $("#your-character");
  console.log("characterIndex: "+characterIndex);
  console.log("character name: "+characters[characterIndex].name); 
});





$(".character").click(function() {

  // pick a character
  if (characterIndex === undefined) {
    characterIndex = $(this).attr('number')
    console.log(characterIndex);
    // Move your character to your character area
    $("[number='" + characterIndex + "']").appendTo("#your-character");
    // Move ramaining characters to enemies area
    $("#characters").children().appendTo("#enemies");
  } else if (defenderIndex === undefined) {
    
    $(this).appendTo("#defender");
  }



  // pick an enemy


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

