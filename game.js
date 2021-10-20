var handCardSize = 160;
var handCardSizeY = handCardSize * Math.sqrt(2);
var handCardGap = 5;
var creatureSize = 140;
var creatureSizeY = creatureSize * Math.sqrt(2);
var creatureGap = 10;
var player1, player2;
var activePlayer, passivePlayer;
var canvas, ctx;
var selectedHandCardInt = -1;
var selectedActiveCreatureInt = -1;
var turnStatus = 1; //1 = mid turn,   0 = between turns
var turnButtonSize = 150;
var turnButtonSizeY = turnButtonSize / 2;


function startGame(){
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");

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

    activePlayer = player1;
    passivePlayer = player2;

    //ctx.fillText(player1.hand[0].name, 100, 100)
    //drawCard(player1.hand[0], 0, 500, 130);
    repaint();
    
}


function endTurn(){
    turnStatus = 0;
    selectedHandCardInt = -1;
    selectedActiveCreatureInt = -1;
}

function nextTurn(){
    turnStatus = 1;
    var p = activePlayer;
    activePlayer = passivePlayer;
    passivePlayer = p;
}


function repaint(){
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    

    if(turnStatus == 1){

        drawActiveHand(activePlayer.hand);
        drawPassiveHand(passivePlayer.hand);
        drawActiveCreatures(activePlayer.creatures);
        drawPassiveCreatures(passivePlayer.creatures);
        if(selectedHandCardInt != -1) drawHandCardSelection();
        if(selectedActiveCreatureInt != -1) drawActiveCreatureSelection();

        ctx.drawImage(document.getElementById("EndTurnImage"), canvas.width - turnButtonSize, canvas.height / 2 - turnButtonSizeY / 2, turnButtonSize, turnButtonSizeY);
    }

    if(turnStatus == 0){
        ctx.drawImage(document.getElementById("NextTurnImage"), canvas.width - turnButtonSize, canvas.height / 2 - turnButtonSizeY / 2, turnButtonSize, turnButtonSizeY);
    }

    // ctx.strokeStyle = 'red';
    // ctx.lineWidth = 6;
    // ctx.beginPath();
    // ctx.moveTo(canvas.width/2 - 3, 0);
    // ctx.lineTo(canvas.width/2 - 3, canvas.height);
    // ctx.stroke();
}

function drawHandCardSelection(){
    ctx.drawImage(document.getElementById("SelectedImage"), (canvas.width/2) - (activePlayer.hand.length * (handCardSize + handCardGap) / 2) + selectedHandCardInt * (handCardSize + handCardGap),
     canvas.height - handCardSizeY - handCardGap, handCardSize, handCardSizeY);
}

function drawActiveCreatureSelection(){
    ctx.drawImage(document.getElementById("SelectedImage"), creatureGap + selectedActiveCreatureInt * (creatureSize + creatureGap),
     canvas.height - handCardSizeY - handCardGap - creatureSizeY - creatureGap,
      creatureSize, creatureSizeY);
}


function drawActiveHand(hand){


    for(let i = 0; i < hand.length; i++){
        drawCard(hand[i], (canvas.width/2) - (hand.length * (handCardSize + handCardGap) / 2) + i * (handCardSize + handCardGap),
          canvas.height - handCardSizeY - handCardGap, handCardSize);
    }

    // for(let i = 0; i < hand.length; i++){
    //     drawCard(hand[i], (handCardSize + handCardGap ) * i + handCardGap, canvas.height - handCardSizeY - handCardGap, handCardSize);
    // }
}

function drawPassiveHand(hand){

    for(let i = 0; i < hand.length; i++){
        //drawCard(hand[i], (handCardSize + handCardGap ) * i + handCardGap, canvas.height - handCardSize * Math.sqrt(2) - handCardGap, handCardSize);
        ctx.drawImage(document.getElementById("BackSideImage"), (canvas.width/2) - (hand.length * (handCardSize + handCardGap) / 2) + i * (handCardSize + handCardGap),
        handCardGap, handCardSize, handCardSizeY);
    }
}

function drawActiveCreatures(creatures){

    for(let i = 0; i < creatures.length; i++){
        drawCard(creatures[i], (creatureSize + creatureGap ) * i + creatureGap, canvas.height - handCardSizeY - handCardGap - creatureSizeY - creatureGap, creatureSize);
    }
}

function drawPassiveCreatures(creatures){

    for(let i = 0; i < creatures.length; i++){
        drawCard(creatures[i], (creatureSize + creatureGap ) * i + creatureGap, handCardSizeY + handCardGap + creatureGap, creatureSize);
    }
}

function drawCard(card, x, y, size){
    ctx.drawImage(card.image, x, y, size, size * Math.sqrt(2));
}

function drawCreature(creature, x, y, size){
    ctx.drawImage(creature.image, x, y, size, size * Math.sqrt(2));
}

function mouseClicked(event){
    var x = event.clientX;     // Get the horizontal coordinate
    var y = event.clientY;     // Get the vertical coordinate

    

    if(y >= (canvas.height - handCardSizeY - handCardGap)){ //handcards clicked
        if((x >= canvas.width/2 - activePlayer.hand.length * (handCardSize + handCardGap) / 2) 
            && (x <= canvas.width/2 + activePlayer.hand.length * (handCardSize + handCardGap)/2)){

                
            var selectedHandCardIntTemp = Math.trunc((x - (canvas.width/2 - activePlayer.hand.length * (handCardSize + handCardGap)/2 )) / (handCardSize + handCardGap) );

            if(!(selectedHandCardIntTemp > activePlayer.hand.length - 1)){
                if(selectedHandCardInt == selectedHandCardIntTemp){
                    selectedHandCardInt = -1;
                }else{
                    selectedHandCardInt = selectedHandCardIntTemp;
                    selectedActiveCreatureInt = -1;
                }
            }
        }
        
        
    }

    if((y >= (canvas.height - handCardSizeY - handCardGap - creatureSizeY - creatureGap)) && y <= canvas.height - handCardSizeY - handCardGap){ //active creatures clicked
        var selectedActiveCreatureIntTemp = Math.trunc(x / (creatureSize + creatureGap));
        if(!(selectedActiveCreatureIntTemp > activePlayer.creatures.length - 1)){
            if(selectedActiveCreatureInt == selectedActiveCreatureIntTemp){
                selectedActiveCreatureInt = -1;
            }else{
                selectedActiveCreatureInt = selectedActiveCreatureIntTemp;
                selectedHandCardInt = -1;
            }
        } 
    }


    if((y >= (canvas.height / 2 - turnButtonSizeY / 2)) && (y <= (canvas.height / 2 + turnButtonSizeY / 2)) && x > canvas.width - turnButtonSize){ //turnbutton clicked
        if(turnStatus == 1) endTurn();
        else nextTurn();
    }


    repaint();
    //activePlayer.hand.push(new CardGoblin());
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