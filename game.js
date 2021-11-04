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

var turnStatus = 0; //1 = mid turn,     0 = between turns,     2 = draft,      3 = winning screen

var turnButtonSize = 150;
var turnButtonSizeY = turnButtonSize / 2;

var castingFieldSize = 200;
var castingFieldSizeY = castingFieldSize * (3/4);

var deckSize = 130;
var deckSizeY = deckSize * Math.sqrt(2);
var deckGap = 5;

var stoneSize = 60;

var draftableCards;

var draftableCardSize = 150;
var draftableCardSizeY = draftableCardSize * Math.sqrt(2);
var draftableCardGap = 15;

var winner, loser;

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

    player1 = new Player("kek", document.getElementById("CharDemonMasterImage"));
    player2 = new Player("lol", document.getElementById("CharMageImage"));

    activePlayer = player1;
    passivePlayer = player2;

    if(turnStatus == 2)
    startDraft();

    //ctx.fillText(player1.hand[0].name, 100, 100)
    //drawCard(player1.hand[0], 0, 500, 130);
    //nextTurn();
    repaint();
    
}


function startDraft(){
    draftableCards = [];
    draftableCards.push(new CardArmoredOgre());
    draftableCards.push(new CardFireGoblin());
    draftableCards.push(new CardGoblin());
    draftableCards.push(new CardGoblin());
    draftableCards.push(new CardGoblin());
}



function castSelected(){
    if(selectedHandCardInt != -1 && activePlayer.fullStones >= activePlayer.hand[selectedHandCardInt].cost){
        activePlayer.fullStones -= activePlayer.hand[selectedHandCardInt].cost;
        activePlayer.hand[selectedHandCardInt].play();
        activePlayer.discardDeck.push(activePlayer.hand[selectedHandCardInt]);
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
    activePlayer.maxStones++;
    activePlayer.fillStones();
}

function checkWin(){
    if(passivePlayer.health <= 0 ){
        winner = activePlayer;
        loser = passivePlayer;
        turnStatus = 3;
    }
}

function repaint(){
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    
    if(turnStatus == 2){ //Draft

        drawDraftableCards();

        ctx.strokeStyle = 'red';
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.moveTo(canvas.width/2 - 3, 0);
        ctx.lineTo(canvas.width/2 - 3, canvas.height);
        ctx.stroke();

        ctx.drawImage(document.getElementById("CastingFieldImage"), canvas.width/2 - castingFieldSize/2, canvas.height/2 - castingFieldSizeY/2, castingFieldSize, castingFieldSizeY);
    }

    if(turnStatus == 1){//Midturn

        //Draw activeplayer with decks
        ctx.drawImage(activePlayer.image, deckGap + deckSize/2, canvas.height - deckSizeY*2 - deckGap*2, deckSize, deckSizeY);

        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.fillStyle = 'white';
        ctx.font = '25px arial';

        ctx.fillText(activePlayer.health, deckGap + deckSize, canvas.height - deckSizeY*2 - deckGap*2 + deckSizeY/32*29);


        if(activePlayer.deck.length > 0){ //draw deck
            ctx.drawImage(document.getElementById("BackSideImage"), deckGap, canvas.height - deckSizeY - deckGap, deckSize, deckSizeY);
        }else{
            ctx.drawImage(document.getElementById("EmptyPlaceImage"), deckGap, canvas.height - deckSizeY - deckGap, deckSize, deckSizeY);
        }

        ctx.font = '30px arial';
        ctx.fillText(activePlayer.deck.length, deckGap + deckSize/2, canvas.height - deckSizeY - deckGap);
        

        if(activePlayer.discardDeck.length > 0){ //draw discarddeck
            drawCard(activePlayer.discardDeck[activePlayer.discardDeck.length - 1], deckGap*2 + deckSize, canvas.height - deckSizeY - deckGap, deckSize);
        }else{
            ctx.drawImage(document.getElementById("EmptyPlaceImage"), deckGap*2 + deckSize, canvas.height - deckSizeY - deckGap, deckSize, deckSizeY);
        }
        
        ctx.fillText(activePlayer.discardDeck.length, deckGap + deckSize/2*3, canvas.height - deckSizeY - deckGap);



        //Draw passiveplayer with decks
        ctx.drawImage(passivePlayer.image, deckGap + deckSize/2, deckGap*2 + deckSizeY, deckSize, deckSizeY);

        ctx.font = '25px arial';

        ctx.fillText(passivePlayer.health, deckGap + deckSize, deckGap*2 + deckSizeY + deckSizeY/32*29);

        if(passivePlayer.deck.length > 0){
            ctx.drawImage(document.getElementById("BackSideImage"), deckGap, deckGap, deckSize, deckSizeY);
        }else{
            ctx.drawImage(document.getElementById("EmptyPlaceImage"), deckGap, deckGap, deckSize, deckSizeY);
        }

        ctx.font = '30px arial';
        ctx.fillText(passivePlayer.deck.length, deckGap + deckSize/2, deckSizeY + deckGap + 35);

        
        
        if(passivePlayer.discardDeck.length > 0){
            drawCard(passivePlayer.discardDeck[passivePlayer.discardDeck.length - 1], deckGap*2 + deckSize, deckGap, deckSize);
        }else{
            ctx.drawImage(document.getElementById("EmptyPlaceImage"), deckGap*2 + deckSize, deckGap, deckSize, deckSizeY);
        }

        ctx.fillText(passivePlayer.discardDeck.length, deckGap + deckSize/2*3, deckSizeY + deckGap + 35);
        



        drawStones();

        drawActiveHand(activePlayer.hand);
        drawPassiveHand(passivePlayer.hand);
        drawActiveCreatures(activePlayer.creatures);
        drawPassiveCreatures(passivePlayer.creatures);
        if(selectedHandCardInt != -1) drawHandCardSelection();
        if(selectedActiveCreatureInt != -1) drawActiveCreatureSelection();

        ctx.drawImage(document.getElementById("CastingFieldImage"), canvas.width/2 - castingFieldSize/2, canvas.height/2 - castingFieldSizeY/2, castingFieldSize, castingFieldSizeY);

        ctx.drawImage(document.getElementById("EndTurnImage"), canvas.width - turnButtonSize, canvas.height / 2 - turnButtonSizeY / 2, turnButtonSize, turnButtonSizeY);
    }

    if(turnStatus == 0){//Between turns

        ctx.drawImage(passivePlayer.image, canvas.width/2 - handCardSize/2, canvas.height/2 - handCardSizeY/2, handCardSize, handCardSizeY);


        ctx.drawImage(document.getElementById("NextTurnImage"), canvas.width - turnButtonSize, canvas.height / 2 - turnButtonSizeY / 2, turnButtonSize, turnButtonSizeY);
    }

    if(turnStatus == 3){ //Winning screen
        ctx.drawImage(winner.image, canvas.width/2 - handCardSize/2, canvas.height/2 - handCardSizeY/2, handCardSize, handCardSizeY);

        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.fillStyle = 'white';
        ctx.font = '35px arial';

        ctx.fillText("won", canvas.width/2 - handCardSize/2, canvas.height/2 - handCardSizeY/2);
    }
    
}

function drawDraftableCards(){
    let l = draftableCards.length;
    for(let i = 0; i < l; i++){
        drawCard(draftableCards[i], (canvas.width/2) - (l * (draftableCardSize + draftableCardGap) / 2) + i * (draftableCardSize + draftableCardGap),
          draftableCardGap, draftableCardSize);
    }
}

function drawStones(){
    let mStones = activePlayer.maxStones;
    let fStones = activePlayer.fullStones;

    for(let i = 0; i < mStones; i++){
        let image;
        if(i < fStones){
            image = document.getElementById("StoneImage");
        }else{
            image = document.getElementById("EmptyStoneImage");
        }

        ctx.drawImage(image,  i * stoneSize, canvas.height/2 - stoneSize/2, stoneSize, stoneSize);
    }
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

    if(turnStatus == 0){
        mouseClickedBetweenTurns(x, y);
    }else if(turnStatus == 1){
        mouseClickedMidTurn(x, y);
    }

    


    repaint();
    console.log("--------------------------------------");
    console.log("selected handcard: " + selectedHandCardInt);
    console.log("selected activeCreature: " + selectedActiveCreatureInt);
    console.log("activePlayer creatures: " + activePlayer.creatures.length);
    console.log("passivePlayer creatures: " + passivePlayer.creatures.length);
    console.log("turnstatus: " + turnStatus);
    //activePlayer.hand.push(new CardGoblin());
}

function mouseClickedBetweenTurns(x, y){

    if((y >= (canvas.height / 2 - turnButtonSizeY / 2)) && (y <= (canvas.height / 2 + turnButtonSizeY / 2)) //turnbutton clicked
    && x > canvas.width - turnButtonSize){ 
        nextTurn();
    }

}

function mouseClickedMidTurn(x, y){

    if((y >= (canvas.height / 2 - turnButtonSizeY / 2)) && (y <= (canvas.height / 2 + turnButtonSizeY / 2)) //turnbutton clicked
    && x > canvas.width - turnButtonSize){ 
        endTurn();
    }

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



    if(y >= (deckGap*2 + deckSizeY) && y <= (deckGap*2 + deckSizeY*2) && // passive player clicked
        x >= deckGap + deckSize/2 && x <= deckGap + deckSize/2 * 3){ 
        if(selectedActiveCreatureInt != -1){
            activePlayer.creatures[selectedActiveCreatureInt].attackPlayer(passivePlayer);
            selectedActiveCreatureInt = -1;
        }
    }


    if((y >= (canvas.height/2 - castingFieldSizeY/2)) && (y <= (canvas.height/2 + castingFieldSizeY/2)) //castingfield clicked
    && (x >= (canvas.width/2 - castingFieldSize/2)) && (x <= (canvas.width/2 + castingFieldSize/2))){
       castSelected();
   }

}

class Card{
    constructor(name, image, cost){
        this.name = name;
        this.image = image;
        this.cost = cost;
        this.cardtext = [];

    }

    play(){

    }
}


class CardSpawnCreature extends Card{

    constructor(name, image, cost){
        super(name, image, cost);
        this.spawnCreatures = [];
    }

    play(){
        this.spawnCreatures.forEach(c => activePlayer.spawnCreature(c));
    }


}


class CardTargetingSpell extends Card{
    constructor(name, image, cost){
        super(name, image, cost);
        
        this.isTargetingPassiveCreatures = false;
        this.isTargetingActiveCreatures = false;
        this.isTargetingPassivePlayer = false;
        this.isTargetingActivePlayer = false;
    }
}





class Creature{
    constructor(name, image, attack, defense){
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

    attackPlayer(attackedPlayer){
        attackedPlayer.takeHit(this.attack);
        this.isReady = false;
    }

    takeHit(hitDamage = 0){
        this.defense -= hitDamage;
    }

}





//----------------------------------------------------------------
//Cards

class CardGoblin extends CardSpawnCreature{
    constructor(){
        super("CardGoblin", document.getElementById("CardGoblinImage"), 2);
        //this.cardtext = [];
        this.cardtext.push("Spawns a");
        this.cardtext.push("1/2 Goblin");
        this.spawnCreatures.push(new CreatureGoblin());
    }
}

class CardFireGoblin extends CardSpawnCreature{
    constructor(){
        super("CardFireGoblin", document.getElementById("CardFireGoblinImage"), 2, "Spawns a\n3/1 FireGoblin");
        this.cardtext.push("Spawns a");
        this.cardtext.push("3/1 Firegoblin");
        this.spawnCreatures.push(new CreatureFireGoblin());
    }
}

class CardArmoredOgre extends CardSpawnCreature{
    constructor(){
        super("CardArmoredOgre", document.getElementById("CardArmoredOgreImage"), 5, "Spawns a 2/5 Armored Ogre");
        this.cardtext.push("Spawns a");
        this.cardtext.push("2/5 Armored Ogre");
        this.spawnCreatures.push(new CreatureArmoredOgre());
    }
}
//----------------------------------------------------------------





//----------------------------------------------------------------
//Creatures

class CreatureGoblin extends Creature{
    constructor(){
        super("Goblin", document.getElementById("CreatureGoblinImage"), 1, 2);
    }
}

class CreatureFireGoblin extends Creature{
    constructor(){
        super("FireGoblin", document.getElementById("CreatureFireGoblinImage"), 3, 1);
    }
}

class CreatureArmoredOgre extends Creature{
    constructor(){
        super("ArmoredOgre", document.getElementById("CreatureArmoredOgreImage"), 2, 5);
    }
}
//----------------------------------------------------------------





//----------------------------------------------------------------
//Player

class Player{
    constructor(name, image){
        this.name = name;
        this.image = image;
        this.hand = [];

        this.health = 30;

        this.maxStones = 0;
        this.fullStones = 0;

        this.deck = [];
        this.deck.push(new CardFireGoblin());
        this.deck.push(new CardGoblin());
        this.deck.push(new CardArmoredOgre());
        this.deck.push(new CardFireGoblin());
        this.deck.push(new CardGoblin());
        this.deck.push(new CardArmoredOgre());

        this.discardDeck = [];

        this.creatures = [];
        this.creatures.push(new CreatureGoblin());
        this.creatures.push(new CreatureGoblin());
    }

    spawnCreature(c){
        this.creatures.push(c);
    }

    fillStones(){
        this.fullStones = this.maxStones;
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

    takeHit(damage){
        this.health -= damage;
        checkWin();
    }

}
//----------------------------------------------------------------