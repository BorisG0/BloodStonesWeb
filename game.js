var handCardSize = 150;
var handCardSizeY = handCardSize * Math.sqrt(2);
var handCardGap = 10;
var creatureSize = 110;
var creatureSizeY = creatureSize * Math.sqrt(2);
var creatureGap = 5;
var player1, player2;
var activePlayer, passivePlayer;
var canvas, ctx;
var selectedHandCardInt = -1;
var selectedActiveCreatureInt = -1;
var turnStatus = 1; //1 = mid turn,   0 = between turns
var turnButtonSize = 150;
var turnButtonSizeY = turnButtonSize / 2;
var castingFieldSize = 200;
var castingFieldSizeY = castingFieldSize * (3/4);


function startGame(){
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");

    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;


    var imgLogo = document.getElementById("KidneyStoneLogoImage");
    var logoSizeX = 1536/2;
    var logoSizeY = 724/2;
    ctx.drawImage(imgLogo, (canvas.width / 2) - (logoSizeX / 2), 10, logoSizeX, logoSizeY);
    
    //ctx.font = '50px serif';

    //drawCard(goblinCard,10,10,130);

    player1 = new Player("kek");
    player2 = new Player("lol");

    activePlayer = player1;
    passivePlayer = player2;

    //ctx.fillText(player1.hand[0].name, 100, 100)
    //drawCard(player1.hand[0], 0, 500, 130);
    nextTurn();
    repaint();
    
}

function castSelected(){
    if(selectedHandCardInt != -1){
        activePlayer.hand[selectedHandCardInt].play();
        activePlayer.hand.splice(selectedHandCardInt, 1);
        selectedHandCardInt = -1;
    }
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
    activePlayer.drawCard();
    activePlayer.readyAllCreatures();
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

        ctx.drawImage(document.getElementById("CastingFieldImage"), canvas.width/2 - castingFieldSize/2, canvas.height/2 - castingFieldSizeY/2, castingFieldSize, castingFieldSizeY);

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
    ctx.drawImage(document.getElementById("SelectedImage"), 
        (canvas.width/2) - (activePlayer.hand.length * (handCardSize + handCardGap) / 2) + selectedHandCardInt * (handCardSize + handCardGap),
        canvas.height - handCardSizeY - handCardGap, handCardSize, handCardSizeY);
}

function drawActiveCreatureSelection(){
    ctx.drawImage(document.getElementById("SelectedImage"), 
        (canvas.width/2) - (activePlayer.creatures.length * (creatureSize + creatureGap) / 2) + selectedActiveCreatureInt * (creatureSize + creatureGap),
        canvas.height - handCardSizeY - handCardGap - creatureSizeY - creatureGap, creatureSize, creatureSizeY);
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
        drawCreature(creatures[i], (canvas.width/2) - (creatures.length * (creatureSize + creatureGap) / 2) + i * (creatureSize + creatureGap),
        canvas.height - handCardSizeY - handCardGap - creatureSizeY - creatureGap, creatureSize);
    }
}

function drawPassiveCreatures(creatures){

    for(let i = 0; i < creatures.length; i++){
        drawCreature(creatures[i], (canvas.width/2) - (creatures.length * (creatureSize + creatureGap) / 2) + i * (creatureSize + creatureGap),
        handCardSizeY + handCardGap + creatureGap, creatureSize);
    }
}

function drawCard(card, x, y, size){
    ctx.drawImage(card.image, x, y, size, size * Math.sqrt(2));

    ctx.font = '13px arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillStyle = 'white';

    for(let i = 0; i < card.cardtext.length; i++){
        ctx.fillText(card.cardtext[i], x + size / 2, y + size / 16 * (10 + i * 1.5) * Math.sqrt(2));
    }

    ctx.font = '30px arial';

    ctx.fillText(card.cost, x + size * 27 / 32, y + size * Math.sqrt(2) * 31 / 32);
}

function drawCreature(creature, x, y, size){
    ctx.drawImage(creature.image, x, y, size, size * Math.sqrt(2));


    ctx.font = '25px arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillStyle = 'white';
    ctx.fillText(creature.attack, x + size / 8, y + size * Math.sqrt(2) , 100);
    ctx.fillText(creature.defense, x + size / 8 * 7, y + size * Math.sqrt(2), 100);


    if(!creature.isReady){
        ctx.drawImage(document.getElementById("NotReadyImage"), x, y, size, size * Math.sqrt(2));
    }
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
        if((x >= canvas.width/2 - activePlayer.creatures.length * (creatureSize + creatureGap) / 2) 
            && (x <= canvas.width/2 + activePlayer.creatures.length * (creatureSize + creatureGap)/2)){

                
            var selectedActiveCreatureIntTemp = Math.trunc((x - (canvas.width/2 - activePlayer.creatures.length * (creatureSize + creatureGap)/2 )) / (creatureSize + creatureGap) );

            if(!(selectedActiveCreatureIntTemp > activePlayer.creatures.length - 1)){
                    if(selectedActiveCreatureInt == selectedActiveCreatureIntTemp){
                        selectedActiveCreatureInt = -1;
                    }else{
                        if(activePlayer.creatures[selectedActiveCreatureIntTemp].isReady){
                            selectedActiveCreatureInt = selectedActiveCreatureIntTemp;
                            selectedHandCardInt = -1;
                        }
                        
                    }
                } 
        }
    }


    if((y >= (handCardSizeY + handCardGap + creatureGap)) && y <= handCardSizeY + handCardGap + creatureGap + creatureSizeY){ //passive creatures clicked
        if((x >= canvas.width/2 - passivePlayer.creatures.length * (creatureSize + creatureGap) / 2) 
            && (x <= canvas.width/2 + passivePlayer.creatures.length * (creatureSize + creatureGap)/2)){

                
            var selectedPassiveCreatureIntTemp = Math.trunc((x - (canvas.width/2 - passivePlayer.creatures.length * (creatureSize + creatureGap)/2 )) / (creatureSize + creatureGap) );


            

            if(selectedActiveCreatureInt != -1 && selectedPassiveCreatureIntTemp < passivePlayer.creatures.length){
                activePlayer.creatures[selectedActiveCreatureInt].attackCreature(passivePlayer.creatures[selectedPassiveCreatureIntTemp]);
                activePlayer.checkDeaths();
                passivePlayer.checkDeaths();
                selectedActiveCreatureInt = -1;
            }
        }
    }


    if((y >= (canvas.height / 2 - turnButtonSizeY / 2)) && (y <= (canvas.height / 2 + turnButtonSizeY / 2)) //turnbutton clicked
    && x > canvas.width - turnButtonSize){ 
        if(turnStatus == 1) endTurn();
        else nextTurn();
    }

    if((y >= (canvas.height/2 - castingFieldSizeY/2)) && (y <= (canvas.height/2 + castingFieldSizeY/2))
     && (x >= (canvas.width/2 - castingFieldSize/2)) && (x <= (canvas.width/2 + castingFieldSize/2))){
        castSelected();
    }


    repaint();
    console.log("--------------------------------------");
    console.log("selected handcard: " + selectedHandCardInt);
    console.log("selected activeCreature: " + selectedActiveCreatureInt);
    console.log("activePlayer creatures: " + activePlayer.creatures.length);
    console.log("passivePlayer creatures: " + passivePlayer.creatures.length);
    //activePlayer.hand.push(new CardGoblin());
}

class Card{
    constructor(name, image, cost, cardtext){
        this.name = name;
        this.image = image;
        this.cost = cost;
        this.cardtext = cardtext;

    }

    play(){

    }
}

class Creature{
    constructor(owner, name, image, attack, defense){
        this.owner = owner;
        this.name = name;
        this.image = image;
        this.attack = attack;
        this.defense = defense;
        this.isReady = false;
    }

    attackCreature(attackedCreature){
        attackedCreature.takeHit(this.attack);
        this.takeHit(attackedCreature.attack);
        this.isReady = false;
        
    }

    takeHit(hitDamage = 0){
        this.defense -= hitDamage;
        //this.owner.checkDeaths();
    }

}


//Cards

class CardGoblin extends Card{
    constructor(){
        super("CardGoblin", document.getElementById("CardGoblinImage"), 2, "Spawns a 1/2 Goblin");
        this.cardtext = [];
        this.cardtext.push("Spawns a 1/2 Goblin");
    }

    play(){
        activePlayer.creatures.push(new CreatureGoblin(activePlayer));
    }
}

class CardFireGoblin extends Card{
    constructor(){
        super("CardFireGoblin", document.getElementById("CardFireGoblinImage"), 2, "Spawns a\n3/1 FireGoblin");
        this.cardtext = [];
        this.cardtext.push("Spawns a");
        this.cardtext.push("3/1 Firegoblin")
    }

    play(){
        activePlayer.creatures.push(new CreatureFireGoblin(activePlayer));
    }
}

class CardArmoredOgre extends Card{
    constructor(){
        super("CardArmoredOgre", document.getElementById("CardArmoredOgreImage"), 2, "Spawns a 2/5 Armored Ogre");
        this.cardtext = [];
        this.cardtext.push("Spawns a");
        this.cardtext.push("2/5 Armored Ogre")
    }

    play(){
        activePlayer.creatures.push(new CreatureArmoredOgre(activePlayer));
    }
}


//Creatures

class CreatureGoblin extends Creature{
    constructor(owner){
        super("Goblin",owner, document.getElementById("CreatureGoblinImage"), 1, 2);
    }
}

class CreatureFireGoblin extends Creature{
    constructor(owner){
        super("FireGoblin",owner, document.getElementById("CreatureFireGoblinImage"), 3, 1);
    }
}

class CreatureArmoredOgre extends Creature{
    constructor(owner){
        super("ArmoredOgre",owner, document.getElementById("CreatureArmoredOgreImage"), 2, 5);
    }
}

class Player{
    constructor(name){
        this.name = name;
        this.hand = [];

        this.deck = [];
        this.deck.push(new CardFireGoblin());
        this.deck.push(new CardGoblin());
        this.deck.push(new CardArmoredOgre());
        this.deck.push(new CardFireGoblin());
        this.deck.push(new CardGoblin());
        this.deck.push(new CardArmoredOgre());

        this.creatures = [];
        this.creatures.push(new CreatureGoblin(this));
        this.creatures.push(new CreatureGoblin(this));
    }

    drawCard(){
        if(this.deck.length > 0){
            this.hand.push(this.deck.pop());
        }
        
    }

    checkDeaths(){
        //selectedHandCardInt = 1;
        for(let i = 0; i < this.creatures.length; i++){
            if(this.creatures[i].defense <= 0){
                this.creatures.splice(i, 1);
            }
        }
    }

    readyAllCreatures(){
        for(let i = 0; i < this.creatures.length; i++){
            this.creatures[i].isReady = true;
        }
    }

}