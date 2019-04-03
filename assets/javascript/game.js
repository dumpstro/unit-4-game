class Character  {
    constructor(hp, atk, ctr, bonus, id) {
        this.hp = hp;
        this.atk = atk
        this.ctr = ctr;
        this.bonus = bonus;
        this.id = id;
    };
};

var characters = {
    "boba": new Character(150, 25, 20, 10, "boba"),
    "bossk": new Character(180, 10, 20, 20, "bossk"),
    "dengar": new Character(135, 35, 10, 5, "dengar"),
    "ig88": new Character(145, 20, 15, 15, "ig88"),
};

var player = null;
var opponent = null;
var defeats = 0

function initialize() {

    player = null;
    opponent = null;

    console.log("here");
    characters = {
    "boba": new Character(150, 25, 20, 10, "boba"),
    "bossk": new Character(180, 10, 20, 20, "bossk"),
    "dengar": new Character(135, 35, 10, 5, "dengar"),
    "ig88": new Character(145, 20, 15, 15, "ig88"),
    };

    //$("<div class=\"wrapper\">").insertAfter(".characterSelection");
    var characterGroup = document.getElementsByClassName("character");

    $("#characterSelection").show();
    $(characterGroup).appendTo(".container")
    $(characterGroup).show();
    
    $("#playerText").empty()
    $("#opponentText").empty()

    $("#hp1").text(characters["boba"].hp);
    $("#hp2").text(characters["bossk"].hp);
    $("#hp3").text(characters["dengar"].hp);
    $("#hp4").text(characters["ig88"].hp);

};



$(document).ready(function() {
    $("#hp1").append(characters["boba"].hp);
    $("#hp2").append(characters["bossk"].hp);
    $("#hp3").append(characters["dengar"].hp);
    $("#hp4").append(characters["ig88"].hp);
});


function movePlayer() {
    var group = document.getElementsByClassName("wrapper");
    $(player).appendTo("#arena");

    /**var group = document.getElementsByClassName("character");
    for (var i=0; i<3; i++) {
        if(group[i].id !== player.id) {
            $(group[i]).appendTo("#enemyArena");
        }
    }**/

    $(group).appendTo("#enemyArena");
               
    $("#characterSelection").hide();
    $(".character").css("background-color", "red");
    $(player).css("background-color", "slategray");
}

function moveOpponent() {
    $(opponent).appendTo("#opponentArena");
    $(opponent).css({
        "background-color": "black",
        "color": "#ffff00"
    });
};

function attack() {
    var arenaPlayer = characters[player.id];
    var arenaOpponent = characters[opponent.id];

    arenaOpponent.hp = arenaOpponent.hp - arenaPlayer.atk;
    arenaPlayer.hp = arenaPlayer.hp - arenaOpponent.ctr;

    $("#playerText").text(arenaPlayer.id +" attacked " + arenaOpponent.id +" for " + arenaPlayer.atk + " damage!");
    $("#opponentText").text(arenaOpponent.id + " countered for " + arenaOpponent.ctr + " damage!");

    arenaPlayer.atk = arenaPlayer.atk + arenaPlayer.bonus;
    arenaOpponent.atk = arenaOpponent.atk + arenaOpponent.bonus;

    characters[player.id] = arenaPlayer;
    characters[opponent.id] = arenaOpponent;
   

    if (characters[opponent.id].hp <= 0) {
        $(opponent).hide();
        $("#opponentText").text(arenaPlayer.id + " defeated " + arenaOpponent.id + "!");
        opponent = null;
        defeats++
    };

    if (defeats === 3) {
        confirm("You defeated the scum!" + "\n"  + "Click OK to get hit with a thermal detonator again.");
        initialize();
    };


    if (characters[player.id].hp <= 0) {
        $("#playerText").text(arenaOpponent.id + " defeated " + arenaPlayer.id + "!");
        $("#opponentText").text("Game Over!");
        var gameOver = confirm("Game Over Nerf Herder" + "\n" +"Click OK to get hit with a thermal detonator again.");
        console.log("Game Over" + gameOver);
        if (gameOver === true) {
            initialize();
        };
    };

};




$("button").on("click", function() {
    if(player === null) {
        player = this;
        movePlayer();
    } else if (opponent === null) {
        opponent = this;
        moveOpponent();
    };
});

$("#atkBtn").on("click", function() {
    attack();
    $("#hp1").text(characters["boba"].hp);
    $("#hp2").text(characters["bossk"].hp);
    $("#hp3").text(characters["dengar"].hp);
    $("#hp4").text(characters["ig88"].hp);
});


