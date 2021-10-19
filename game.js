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
    
}

var handCardSize = 130;
var handCardGap = 5;
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

function drawCard(card, x, y, size){
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

    ctx.drawImage(card.image, x, y, size, size * Math.sqrt(2));
}


class Card{
    constructor(name, image, cost){
        this.name = name;
        this.image = image;
        this.cost = cost;

    }
}

class CardGoblin extends Card{
    constructor(){
        super("goblin", document.getElementById("CardGoblinImage"), 2);
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
    }

}