function startGame(){
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;


    var imgLogo = document.getElementById("KidneyStoneLogoImage");
    var logoSizeX = 1536/2;
    var logoSizeY = 724/2;
    ctx.drawImage(imgLogo, (canvas.width / 2) - (logoSizeX / 2), 10, logoSizeX, logoSizeY);
    
    ctx.font = '50px serif';

    //drawCard(goblinCard,10,10,130);

    player1 = new Player("kek");
    player2 = new Player("lol");

    //ctx.fillText(player1.hand[0].name, 100, 100)
    //drawCard(player1.hand[0], 0, 500, 130);

    drawActiveHand(player1.hand);
    drawPassiveHand(player2.hand);
    drawActiveCreatures(player1.creatures);
    drawPassiveCreatures(player2.creatures);
    
}

var handCardSize = 140;
var handCardGap = 5;
var creatureSize = 110;
var creatureGap = 10;
var player1, player2;

function drawActiveHand(hand){

    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

    for(let i = 0; i < hand.length; i++){
        drawCard(hand[i], (handCardSize + handCardGap ) * i + handCardGap, canvas.height - handCardSize * Math.sqrt(2) - handCardGap, handCardSize);
    }
}

function drawPassiveHand(hand){

    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

    for(let i = 0; i < hand.length; i++){
        //drawCard(hand[i], (handCardSize + handCardGap ) * i + handCardGap, canvas.height - handCardSize * Math.sqrt(2) - handCardGap, handCardSize);
        ctx.drawImage(document.getElementById("BackSideImage"), (handCardSize + handCardGap ) * i + handCardGap, handCardGap, handCardSize, handCardSize * Math.sqrt(2));
    }
}

function drawActiveCreatures(creatures){

    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

    for(let i = 0; i < creatures.length; i++){
        drawCard(creatures[i], (creatureSize + creatureGap ) * i + creatureGap, canvas.height - handCardSize * Math.sqrt(2) - handCardGap - creatureSize * Math.sqrt(2) - creatureGap, creatureSize);
    }
}

function drawPassiveCreatures(creatures){

    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

    for(let i = 0; i < creatures.length; i++){
        drawCard(creatures[i], (creatureSize + creatureGap ) * i + creatureGap, handCardSize * Math.sqrt(2) + handCardGap + creatureGap, creatureSize);
    }
}

function drawCard(card, x, y, size){
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

    ctx.drawImage(card.image, x, y, size, size * Math.sqrt(2));
}

function drawCreature(creature, x, y, size){
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

    ctx.drawImage(creature.image, x, y, size, size * Math.sqrt(2));
}

function mouseClicked(event){
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

    

    var x = event.clientX;     // Get the horizontal coordinate
    var y = event.clientY;     // Get the vertical coordinate

    ctx.drawImage(document.getElementById("CardGoblinImage"), x, y, 200, 200 * Math.sqrt(2));
}

class Card{
    constructor(name, image, cost){
        this.name = name;
        this.image = image;
        this.cost = cost;

    }
}

class Creature{
    constructor(name, image, attack, defense){
        this.name = name;
        this.image = image;
        this.attack = attack;
        this.defense = defense;
    }
}

class CardGoblin extends Card{
    constructor(){
        super("CardGoblin", document.getElementById("CardGoblinImage"), 2);
    }
}

class CreatureGoblin extends Creature{
    constructor(){
        super("Goblin", document.getElementById("CreatureGoblinImage"), 1, 2);
    }
}

class Player{
    constructor(name){
        this.name = name;
        this.hand = [];
        this.hand.push(new CardGoblin());
        this.hand.push(new CardGoblin());
        this.hand.push(new CardGoblin());

        this.creatures = [];
        this.creatures.push(new CreatureGoblin());
        this.creatures.push(new CreatureGoblin());
    }

}