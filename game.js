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

    const goblinCard = new Card("goblin", document.getElementById("CreatureGoblinImage"));

    //drawCard(goblinCard,10,10,130);

    const player1 = new Player("kek");

    //ctx.fillText(player1.hand[0].name, 100, 100)
    //drawCard(player1.hand[0], 0, 500, 130);

    var pHand = player1.hand;

    drawActiveHand(player1.hand);
    
}

var handCardSize = 130;

function drawActiveHand(hand){

    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

    ctx.font = '50px serif';

    for(let i = 0; i < hand.length; i++){
        drawCard(hand[i], handCardSize * i, 500, handCardSize);
    }

    

}

function drawCard(card, x, y, size){
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

    ctx.drawImage(card.image, x, y, size, size * Math.sqrt(2));
}


class Card{
    constructor(name, image){
        this.name = name;
        this.image = image;
        

    }
}

class Player{
    constructor(name){
        this.name = name;
        this.hand = [];
        this.hand.push(new Card("goblin2", document.getElementById("CreatureGoblinImage")));
        this.hand.push(new Card("goblin3", document.getElementById("CreatureGoblinImage")));
        this.hand.push(new Card("goblin4", document.getElementById("CreatureGoblinImage")));
        this.hand.push(new Card("goblin5", document.getElementById("CreatureGoblinImage")));
    }

}