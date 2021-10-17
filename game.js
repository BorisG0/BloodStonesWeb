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

    drawCard(goblinCard,10,10,130);

    const player1 = new Player("kek");

    //drawCard(player1.card1, 200, 10 , 130);
    

    drawActiveHand();
    
}


function drawActiveHand(){

    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

    var imgCreatureGoblin = document.getElementById("CreatureGoblinImage");
    var handCardSizeX = 130;
    var handCardSizeY = handCardSizeX * Math.sqrt(2);


    ctx.drawImage(goblinCard.image, 0, canvas.height-handCardSizeY,handCardSizeX, handCardSizeY);
    ctx.fillText("goblinCard.name", 0 ,0 ,100 ,100 );

    drawCard(goblinCard, 0, canvas.height-handCardSizeY,handCardSizeX);
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
    }

}