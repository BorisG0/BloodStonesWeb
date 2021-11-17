//----------------------------------------------------------------------------------------------
//size settings
var sizeMultiplier = 1;

var gameFont = 'arial';

var logoSize, logoSizeY;

var handCardSize = 150 * sizeMultiplier;
var handCardSizeY = handCardSize * Math.sqrt(2);
var handCardGap = 10 * sizeMultiplier;
var handCardFontSize = 13;
var handCardFont = '13px arial';
var handCardCostFontSize = 30;
var handCardCostFont = '30px arial';

var creatureSize = 110 * sizeMultiplier;
var creatureSizeY = creatureSize * Math.sqrt(2);
var creatureGap = 5 * sizeMultiplier;
var creatureFontSize = 25;
var creatureFont = '25px arial';

var turnButtonSize = 150 * sizeMultiplier;
var turnButtonSizeY = turnButtonSize / 2;

var castingFieldSize = 200 * sizeMultiplier;
var castingFieldSizeY = castingFieldSize * (3 / 4);

var deckSize = 130 * sizeMultiplier;
var deckSizeY = deckSize * Math.sqrt(2);
var deckGap = 5 * sizeMultiplier;

var draftableCardSize = 150 * sizeMultiplier;
var draftableCardSizeY = draftableCardSize * Math.sqrt(2);
var draftableCardGap = 15 * sizeMultiplier;

var stoneSize = 60 * sizeMultiplier;

function setSizes(){
    sizeMultiplier = canvas.width/1920;

    logoSize = 1000 * sizeMultiplier;
    logoSizeY = logoSize /20 * 8;

    handCardSize = 150 * sizeMultiplier;
    handCardSizeY = handCardSize * Math.sqrt(2);
    handCardGap = 10 * sizeMultiplier;
    handCardFontSize = 13 * sizeMultiplier;
    handCardFont = handCardFontSize + 'px ' + gameFont;
    handCardCostFontSize = 30 * sizeMultiplier;
    handCardCostFont = handCardCostFontSize + 'px ' + gameFont;

    creatureSize = 110 * sizeMultiplier;
    creatureSizeY = creatureSize * Math.sqrt(2);
    creatureGap = 5 * sizeMultiplier;
    creatureFontSize = 25 * sizeMultiplier;
    creatureFont = creatureFontSize + 'px ' + gameFont;

    turnButtonSize = 150 * sizeMultiplier;
    turnButtonSizeY = turnButtonSize / 2;

    castingFieldSize = 200 * sizeMultiplier;
    castingFieldSizeY = castingFieldSize * (3 / 4);

    deckSize = 130 * sizeMultiplier;
    deckSizeY = deckSize * Math.sqrt(2);
    deckGap = 5 * sizeMultiplier;

    draftableCardSize = handCardSize;
    draftableCardSizeY = handCardSizeY;
    draftableCardGap = 15 * sizeMultiplier;

    stoneSize = 60 * sizeMultiplier;
}
//----------------------------------------------------------------------------------------------


var canvas, ctx;

var player1, player2;
var activePlayer, passivePlayer;

var selectedHandCardInt = -1;
var selectedActiveCreatureInt = -1;

var turnStatus = -1; //1 = mid turn,     0 = between turns,     2 = draft,      3 = winning screen,      4 = between drafts,     -1 = starting screen

var winner, loser;



//----------------------------------------------------------------------------------------------
//draft
var draftableCards;

var selectedDraftableCardInt = -1;

var draftTurn = 0;
var maxDeckSize = 30;
//----------------------------------------------------------------------------------------------



//----------------------------------------------------------------------------------------------
//Targeting for spells
var isTargetingMode = false;

var isValidPassiveCreatures = false;
var isValidActiveCreatures = false;
var isValidPassivePlayer = false;
var isValidActivePlayer = false;
var currentTargetingSpell;
//----------------------------------------------------------------------------------------------


function start() {
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");

    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    setSizes();


    var imgLogo = document.getElementById("KidneyStoneLogoImage");
    var logoSizeX = 1536 / 2;
    var logoSizeY = 724 / 2;
    ctx.drawImage(imgLogo, (canvas.width / 2) - (logoSizeX / 2), 10, logoSizeX, logoSizeY);

    //ctx.font = '50px serif';

    //drawCard(goblinCard,10,10,130);

    player1 = new Player("kek", document.getElementById("CharDemonMasterImage"));
    player2 = new Player("lol", document.getElementById("CharMageImage"));

    activePlayer = player1;
    passivePlayer = player2;

    if (turnStatus == 2)
        startDraft();

    //ctx.fillText(player1.hand[0].name, 100, 100)
    //drawCard(player1.hand[0], 0, 500, 130);
    //nextTurn();
    repaint();

}


function startDraft() {
    draftableCards = [];
    fillDraftableCards();
    turnStatus = 2;

}

function startGame(){
    turnStatus = 0;
    shuffle(activePlayer.deck);
    shuffle(passivePlayer.deck);

    for(let i = 0; i < 4; i++){
        activePlayer.drawCard();
        passivePlayer.drawCard();
    }
}

function fillDraftableCards(){

    let allIndex = getRarityOfCards();

    let commonIndex = allIndex[0];
    let rareIndex = allIndex[1];
    let legendaryIndex = allIndex[2];

    let dfc = []; //draftable Cards
    let card;

    for(let i = 0; i < 30; i++){
        dfc = [];
        for(let j = 0; j < 5; j++){

            if((i + 1) % 10 == 0){
                card = cardByInt(legendaryIndex[Math.floor(Math.random() * legendaryIndex.length)]);
            }else if((i + 1) % 3 == 0){
                card = cardByInt(rareIndex[Math.floor(Math.random() * rareIndex.length)]);
            }else{
                card = cardByInt(commonIndex[Math.floor(Math.random() * commonIndex.length)]);
            }
            


            dfc.push(card);
        }
        draftableCards.push(dfc);
    }
}

function getRarityOfCards(){
    let allRarityIndexes = []; // 0 = common, 1 = rare, 2 = legendary

    let common = [];
    common.push(0);
    common.push(1);
    common.push(2);
    common.push(4);
    common.push(9);
    common.push(13);
    common.push(18);
    common.push(20);
    
    

    let rare = [];
    rare.push(3);
    rare.push(5);
    rare.push(6);
    rare.push(7);
    rare.push(8);
    rare.push(11);
    rare.push(12);
    rare.push(15);
    rare.push(19);

    let legendary = [];
    legendary.push(10);
    legendary.push(14);
    legendary.push(16);
    legendary.push(17);
    legendary.push(21);


    allRarityIndexes.push(common);
    allRarityIndexes.push(rare);
    allRarityIndexes.push(legendary);

    return allRarityIndexes;
}

function cardByInt(n){
    let card;

    switch(n){
        case 0: 
            card = new CardGoblin(); // common
            break;
        case 1:
            card = new CardFireGoblin(); // common
            break;
        case 2:
            card = new CardArmoredOgre(); // common
            break;
        case 3:
            card = new CardCrocodile(); // rare
            break;
        case 4:
            card = new CardFireBall(); // common
            break;
        case 5:
            card = new CardShieldedKnight(); // rare
            break;
        case 6:
            card = new CardUndeadKnight(); // rare
            break;
        case 7:
            card = new CardBook(); // rare
            break;
        case 8:
            card = new CardShield(); // rare
            break;
        case 9:
            card = new CardBat(); // common
            break;
        case 10:
            card = new CardDragon(); // legendary
            break;
        case 11:
            card = new CardLegionnaire(); // rare
            break;
        case 12:
            card = new CardGolem(); // rare
            break;
        case 13:
            card = new CardGolemite(); // common
            break;
        case 14:
            card = new CardBloodStoneGolem(); // legendary
            break;
        case 15:
            card = new CardBloodSacrifice(); // rare
            break;
        case 16:
            card = new CardBloodRush(); // legendary
            break;
        case 17:
            card = new CardBloodDrone(); //legendary
            break;
        case 18:
            card = new CardCrab(); //common
            break;
        case 19:
            card = new CardFlame(); //rare
            break;
        case 20:
            card = new CardMadKnight(); //common
            break;
        case 21:
            card = new CardDragonKnight(); //legendary
            break;
        default:
            card = new CardGoblin();
    }

    return card;
}


function castSelected() {

    if(isTargetingMode){
        currentTargetingSpell.returnToHand();
        
        isTargetingMode = false;
        activePlayer.fullStones += currentTargetingSpell.cost;
        return;

    }


    if (selectedHandCardInt != -1 && activePlayer.fullStones >= activePlayer.hand[selectedHandCardInt].cost) {
        activePlayer.fullStones -= activePlayer.hand[selectedHandCardInt].cost;

        let card = activePlayer.hand[selectedHandCardInt];
        activePlayer.hand.splice(selectedHandCardInt, 1);

        if (card instanceof CardTargetingSpell) {

            enterSpellTargetingMode(card);

        } else {
            card.play();
            activePlayer.discardDeck.push(card);
        }

        
        
        selectedHandCardInt = -1;
    }
}


function enterSpellTargetingMode(spell){
    currentTargetingSpell = spell;

    isTargetingMode = true;

    isValidPassiveCreatures = currentTargetingSpell.isTargetingPassiveCreatures;
    isValidActiveCreatures = currentTargetingSpell.isTargetingActiveCreatures;
    isValidPassivePlayer = currentTargetingSpell.isTargetingPassivePlayer;
    isValidActivePlayer = currentTargetingSpell.isTargetingActivePlayer;
}


function endTurn() {
    turnStatus = 0;
    selectedHandCardInt = -1;
    selectedActiveCreatureInt = -1;
}

function nextTurn() {
    turnStatus = 1;

    var p = activePlayer;
    activePlayer = passivePlayer;
    passivePlayer = p;


    activePlayer.drawCard();

    
    activePlayer.readyAllCreatures();
    if(activePlayer.maxStones < 12){
        activePlayer.maxStones++;
    }
    
    activePlayer.fillStones();
}

function checkWin() {
    if (passivePlayer.health <= 0) {
        winner = activePlayer;
        loser = passivePlayer;
        turnStatus = 3;
    }
}

function repaint() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    if(turnStatus == -1){ //startscreen
        ctx.drawImage(document.getElementById("BloodStonesLogoImage"), canvas.width/2 - logoSize/2, 0, logoSize, logoSizeY);
        ctx.drawImage(document.getElementById("StartImage"), canvas.width - turnButtonSize, canvas.height / 2 - turnButtonSizeY / 2, turnButtonSize, turnButtonSizeY);
    }


    if (turnStatus == 2) { //Draft

        if(draftTurn < draftableCards.length)
        drawDraftableCards();

        // ctx.strokeStyle = 'red';
        // ctx.lineWidth = 6;
        // ctx.beginPath();
        // ctx.moveTo(canvas.width / 2 - 3, 0);
        // ctx.lineTo(canvas.width / 2 - 3, canvas.height);
        // ctx.stroke();

        if(selectedDraftableCardInt != -1){
            drawDraftableCardSelection();
        }

        //ctx.drawImage(document.getElementById("CastingFieldImage"), canvas.width / 2 - castingFieldSize / 2, canvas.height / 2 - castingFieldSizeY / 2, castingFieldSize, castingFieldSizeY);

        ctx.drawImage(activePlayer.image, 0, 0, handCardSize, handCardSizeY);

        //ctx.drawImage(activePlayer.image, canvas.width / 2 - handCardSize / 2, canvas.height / 2 + castingFieldSizeY, handCardSize, handCardSizeY);

        drawDraftedDeck();

        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.fillStyle = 'white';
        ctx.font = '25px arial';

        ctx.fillText(activePlayer.deck.length + "/" + maxDeckSize, canvas.width/2, canvas.height / 2 + castingFieldSizeY);

        ctx.drawImage(document.getElementById("FillRandomImage"), canvas.width - turnButtonSize, canvas.height / 2 - turnButtonSizeY / 2, turnButtonSize, turnButtonSizeY);

    }

    if (turnStatus == 1) {//Midturn

        //Draw activeplayer with decks
        ctx.drawImage(activePlayer.image, deckGap + deckSize / 2, canvas.height - deckSizeY * 2 - deckGap * 2, deckSize, deckSizeY);

        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.fillStyle = 'white';
        ctx.font = creatureFont;

        ctx.fillText(activePlayer.health, deckGap + deckSize, canvas.height - deckSizeY * 2 - deckGap * 2 + deckSizeY / 32 * 29);


        if (activePlayer.deck.length > 0) { //draw deck
            ctx.drawImage(document.getElementById("BackSideImage"), deckGap, canvas.height - deckSizeY - deckGap, deckSize, deckSizeY);
        } else {
            ctx.drawImage(document.getElementById("EmptyPlaceImage"), deckGap, canvas.height - deckSizeY - deckGap, deckSize, deckSizeY);
        }

        ctx.font = handCardCostFont;
        ctx.fillText(activePlayer.deck.length, deckGap + deckSize / 2, canvas.height - deckSizeY - deckGap);


        if (activePlayer.discardDeck.length > 0) { //draw discarddeck
            drawCard(activePlayer.discardDeck[activePlayer.discardDeck.length - 1], deckGap * 2 + deckSize, canvas.height - deckSizeY - deckGap, deckSize);
        } else {
            ctx.drawImage(document.getElementById("EmptyPlaceImage"), deckGap * 2 + deckSize, canvas.height - deckSizeY - deckGap, deckSize, deckSizeY);
        }

        ctx.fillText(activePlayer.discardDeck.length, deckGap + deckSize / 2 * 3, canvas.height - deckSizeY - deckGap);



        //Draw passiveplayer with decks
        ctx.drawImage(passivePlayer.image, deckGap + deckSize / 2, deckGap * 2 + deckSizeY, deckSize, deckSizeY);

        

        ctx.font = creatureFont;

        ctx.fillText(passivePlayer.health, deckGap + deckSize, deckGap * 2 + deckSizeY + deckSizeY / 32 * 29);

        if (passivePlayer.deck.length > 0) {
            ctx.drawImage(document.getElementById("BackSideImage"), deckGap, deckGap, deckSize, deckSizeY);
        } else {
            ctx.drawImage(document.getElementById("EmptyPlaceImage"), deckGap, deckGap, deckSize, deckSizeY);
        }

        ctx.font = handCardCostFont;
        ctx.fillText(passivePlayer.deck.length, deckGap + deckSize / 2, deckSizeY + deckGap + 35);



        if (passivePlayer.discardDeck.length > 0) {
            drawCard(passivePlayer.discardDeck[passivePlayer.discardDeck.length - 1], deckGap * 2 + deckSize, deckGap, deckSize);
        } else {
            ctx.drawImage(document.getElementById("EmptyPlaceImage"), deckGap * 2 + deckSize, deckGap, deckSize, deckSizeY);
        }


        ctx.fillText(passivePlayer.discardDeck.length, deckGap + deckSize / 2 * 3, deckSizeY + deckGap + 35);

        if((isTargetingMode && isValidPassivePlayer) || (selectedActiveCreatureInt != -1 && !hasPassivePlayerTaunt())){
            ctx.drawImage(document.getElementById('SelectablePlayerImage'), deckGap + deckSize / 2, deckGap * 2 + deckSizeY, deckSize, deckSizeY);
        }




        drawStones();

        drawActiveHand(activePlayer.hand);
        drawPassiveHand(passivePlayer.hand);
        drawActiveCreatures(activePlayer.creatures);
        drawPassiveCreatures(passivePlayer.creatures);
        if (selectedHandCardInt != -1) drawHandCardSelection();
        if (selectedActiveCreatureInt != -1) drawActiveCreatureSelection();

        if (isTargetingMode) {
            ctx.drawImage(document.getElementById("CastingFieldActiveImage"), canvas.width / 2 - castingFieldSize / 2, canvas.height / 2 - castingFieldSizeY / 2, castingFieldSize, castingFieldSizeY);
        } else {
            ctx.drawImage(document.getElementById("CastingFieldImage"), canvas.width / 2 - castingFieldSize / 2, canvas.height / 2 - castingFieldSizeY / 2, castingFieldSize, castingFieldSizeY);
            ctx.drawImage(document.getElementById("EndTurnImage"), canvas.width - turnButtonSize, canvas.height / 2 - turnButtonSizeY / 2, turnButtonSize, turnButtonSizeY);
        }



    }

    if (turnStatus == 0) {//Between turns

        ctx.drawImage(passivePlayer.image, canvas.width / 2 - handCardSize / 2, canvas.height / 2 - handCardSizeY / 2, handCardSize, handCardSizeY);


        ctx.drawImage(document.getElementById("NextTurnImage"), canvas.width - turnButtonSize, canvas.height / 2 - turnButtonSizeY / 2, turnButtonSize, turnButtonSizeY);
    }

    if (turnStatus == 4){//between drafts
        ctx.drawImage(activePlayer.image, canvas.width / 2 - handCardSize / 2, canvas.height / 2 - handCardSizeY / 2, handCardSize, handCardSizeY);

        ctx.drawImage(document.getElementById("NextDraftImage"), canvas.width - turnButtonSize, canvas.height / 2 - turnButtonSizeY / 2, turnButtonSize, turnButtonSizeY);

    }

    if (turnStatus == 3) { //Winning screen
        ctx.drawImage(winner.image, canvas.width / 2 - handCardSize / 2, canvas.height / 2 - handCardSizeY / 2, handCardSize, handCardSizeY);

        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.fillStyle = 'white';
        ctx.font = '35px arial';

        ctx.fillText("won", canvas.width / 2 - handCardSize / 2, canvas.height / 2 - handCardSizeY / 2);
    }

}

function drawDraftedDeck(){
    let deck = activePlayer.deck;
    let yDiff = 0;
    let xDiff;

    for(let i = 0; i < deck.length; i++){

        xDiff = i;
        if(i > 9){
            yDiff = deckSizeY + deckSizeY/10;
            xDiff = i - 10;
        } 
        if(i > 19){
            yDiff = (deckSizeY + deckSizeY/10) * 2;
            xDiff = i - 20;
        } 

        drawCard(deck[i], 0 + xDiff * (deckSize + deckSize/10) + deckSize/10, canvas.height/4 + deckSizeY/2 + yDiff, deckSize);
    }
}

function drawDraftableCards() {
    let l = draftableCards[draftTurn].length;
    let dfc = draftableCards[draftTurn];
    for (let i = 0; i < l; i++) {
        drawCard(dfc[i], (canvas.width / 2) - (l * (draftableCardSize + draftableCardGap) / 2) + i * (draftableCardSize + draftableCardGap),
            draftableCardGap, draftableCardSize);
    }
}

function drawStones() {
    let mStones = activePlayer.maxStones;
    let fStones = activePlayer.fullStones;

    for (let i = 0; i < mStones; i++) {
        let image;
        if (i < fStones) {
            image = document.getElementById("StoneImage");
        } else {
            image = document.getElementById("EmptyStoneImage");
        }

        ctx.drawImage(image, i * stoneSize, canvas.height / 2 - stoneSize / 2, stoneSize, stoneSize);
    }

    if(selectedHandCardInt != -1){

        let rStones = activePlayer.hand[selectedHandCardInt].cost;
        let image = document.getElementById("RequiredStoneImage");

        for (let i = 0; i < rStones; i++) {
    
            ctx.drawImage(image, i * stoneSize, canvas.height / 2 - stoneSize / 2, stoneSize, stoneSize);
        }


    }
}

function drawHandCardSelection() {
    ctx.drawImage(document.getElementById("SelectedImage"),
        (canvas.width / 2) - (activePlayer.hand.length * (handCardSize + handCardGap) / 2) + selectedHandCardInt * (handCardSize + handCardGap),
        canvas.height - handCardSizeY - handCardGap, handCardSize, handCardSizeY);
}

function drawDraftableCardSelection(){
    ctx.drawImage(document.getElementById("SelectedImage"),
        (canvas.width / 2) - (draftableCards[draftTurn].length * (draftableCardSize + draftableCardGap) / 2) + selectedDraftableCardInt * (draftableCardSize + draftableCardGap),
        draftableCardGap, draftableCardSize, draftableCardSizeY);
}

function drawActiveCreatureSelection() {
    ctx.drawImage(document.getElementById("SelectedImage"),
        (canvas.width / 2) - (activePlayer.creatures.length * (creatureSize + creatureGap) / 2) + selectedActiveCreatureInt * (creatureSize + creatureGap),
        canvas.height - handCardSizeY - handCardGap - creatureSizeY - creatureGap, creatureSize, creatureSizeY);
}
function drawActiveHand(hand) {


    for (let i = 0; i < hand.length; i++) {
        drawCard(hand[i], (canvas.width / 2) - (hand.length * (handCardSize + handCardGap) / 2) + i * (handCardSize + handCardGap),
            canvas.height - handCardSizeY - handCardGap, handCardSize);
    }

    // for(let i = 0; i < hand.length; i++){
    //     drawCard(hand[i], (handCardSize + handCardGap ) * i + handCardGap, canvas.height - handCardSizeY - handCardGap, handCardSize);
    // }
}

function drawPassiveHand(hand) {

    for (let i = 0; i < hand.length; i++) {
        //drawCard(hand[i], (handCardSize + handCardGap ) * i + handCardGap, canvas.height - handCardSize * Math.sqrt(2) - handCardGap, handCardSize);
        ctx.drawImage(document.getElementById("BackSideImage"), (canvas.width / 2) - (hand.length * (handCardSize + handCardGap) / 2) + i * (handCardSize + handCardGap),
            handCardGap, handCardSize, handCardSizeY);
    }
}

function drawActiveCreatures(creatures) {

    for (let i = 0; i < creatures.length; i++) {
        drawCreature(creatures[i], (canvas.width / 2) - (creatures.length * (creatureSize + creatureGap) / 2) + i * (creatureSize + creatureGap),
            canvas.height - handCardSizeY - handCardGap - creatureSizeY - creatureGap, creatureSize);

        if(isTargetingMode && isValidActiveCreatures){
            ctx.drawImage(document.getElementById('SelectableImage'), (canvas.width / 2) - (creatures.length * (creatureSize + creatureGap) / 2) + i * (creatureSize + creatureGap),
            canvas.height - handCardSizeY - handCardGap - creatureSizeY - creatureGap, creatureSize, creatureSizeY);
        }
    }
}

function drawPassiveCreatures(creatures) {

    for (let i = 0; i < creatures.length; i++) {
        drawCreature(creatures[i], (canvas.width / 2) - (creatures.length * (creatureSize + creatureGap) / 2) + i * (creatureSize + creatureGap),
            handCardSizeY + handCardGap + creatureGap, creatureSize);

        if((isTargetingMode && isValidPassiveCreatures) || (selectedActiveCreatureInt != -1 && (!hasPassivePlayerTaunt() || creatures[i].isTaunt))){
            ctx.drawImage(document.getElementById('SelectableImage'), (canvas.width / 2) - (creatures.length * (creatureSize + creatureGap) / 2) + i * (creatureSize + creatureGap),
            handCardSizeY + handCardGap + creatureGap, creatureSize, creatureSizeY)
        }
    }
}

function drawCard(card, x, y, size) {
    ctx.drawImage(card.image, x, y, size, size * Math.sqrt(2));

    ctx.font = handCardFont;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillStyle = 'white';

    for (let i = 0; i < card.cardtext.length; i++) {
        ctx.fillText(card.cardtext[i], x + size / 2, y + size / 16 * (9 + i * 1.5) * Math.sqrt(2));
    }

    ctx.font = handCardCostFont;

    ctx.fillText(card.cost, x + size * 27 / 32, y + size * Math.sqrt(2) * 31 / 32);
}

function drawCreature(creature, x, y, size) {
    ctx.drawImage(creature.image, x, y, size, size * Math.sqrt(2));


    ctx.font = creatureFont;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillStyle = 'white';
    ctx.fillText(creature.attack, x + size / 8, y + size * Math.sqrt(2), 100);
    ctx.fillText(creature.defense, x + size / 8 * 7, y + size * Math.sqrt(2), 100);

    if(creature.isUndead){
        ctx.drawImage(document.getElementById("EffectUndeadImage"), x, y, size, size * Math.sqrt(2));
    }
    if(creature.isShielded){
        ctx.drawImage(document.getElementById("EffectShieldedImage"), x, y, size, size * Math.sqrt(2));
    }
    if(creature.isTaunt){
        ctx.drawImage(document.getElementById("EffectTauntImage"), x, y, size, size * Math.sqrt(2));
    }


    if (!creature.isReady) {
        ctx.drawImage(document.getElementById("NotReadyImage"), x, y, size, size * Math.sqrt(2));
    }
}

function mouseClicked(event) {
    var x = event.clientX;     // Get the horizontal coordinate
    var y = event.clientY;     // Get the vertical coordinate

    if (turnStatus == 0) {
        mouseClickedBetweenTurns(x, y);
    } else if (turnStatus == 1) {
        mouseClickedMidTurn(x, y);
    } else if (turnStatus == 2){
        mouseClickedDraft(x, y);
    } else if (turnStatus == 4){
        mouseClickedBetweenDraft(x, y);
    } else if (turnStatus == -1){
        mouseClickedStartScreen(x, y);
    }




    repaint();
    // console.log("--------------------------------------");
    // console.log("selected handcard: " + selectedHandCardInt);
    // console.log("selected activeCreature: " + selectedActiveCreatureInt);
    // console.log("activePlayer creatures: " + activePlayer.creatures.length);
    // console.log("passivePlayer creatures: " + passivePlayer.creatures.length);
    // console.log("turnstatus: " + turnStatus);
    //activePlayer.hand.push(new CardGoblin());
}

function mouseClickedDraft(x, y){
    if(y >= draftableCardGap && y <= draftableCardGap + draftableCardSizeY){
        var selectedDraftableCardIntTemp 
        = Math.trunc((x - (canvas.width / 2 - draftableCards[draftTurn].length * (draftableCardSize + draftableCardGap) / 2)) / (draftableCardSize + draftableCardGap));

        if(selectedDraftableCardIntTemp == 'undefined') return;


        if (!(selectedDraftableCardIntTemp > draftableCards[draftTurn].length - 1)) {
            if (selectedDraftableCardInt == selectedDraftableCardIntTemp) {
                selectedDraftableCardInt = -1;
            } else {
                selectedDraftableCardInt = selectedDraftableCardIntTemp;
                draftSelected();
    
            }
        }
    }


    if ((y >= (canvas.height / 2 - castingFieldSizeY / 2)) && (y <= (canvas.height / 2 + castingFieldSizeY / 2)) //castingfield clicked
        && (x >= (canvas.width / 2 - castingFieldSize / 2)) && (x <= (canvas.width / 2 + castingFieldSize / 2))) {
            draftSelected();
    }

    if ((y >= (canvas.height / 2 - turnButtonSizeY / 2)) && (y <= (canvas.height / 2 + turnButtonSizeY / 2)) //fillRandom clicked
        && x > canvas.width - turnButtonSize) {
        draftFillRandom();
    }
}


function mouseClickedBetweenDraft(x, y){
    if ((y >= (canvas.height / 2 - turnButtonSizeY / 2)) && (y <= (canvas.height / 2 + turnButtonSizeY / 2)) //nextDraft clicked
        && x > canvas.width - turnButtonSize) {
        nextDraft();
    }
}

function nextDraft(){
    startDraft();
    
}

function draftFillRandom(){
    for(let i = activePlayer.deck.length; i < maxDeckSize; i++){
        selectedDraftableCardInt = 0;
        draftSelected();
    }
}

function draftSelected(){

    if(selectedDraftableCardInt != -1){

        let deck = activePlayer.deck;
        let card = draftableCards[draftTurn][selectedDraftableCardInt];

        

        for(let i = 0; i < deck.length; i++){
            
            if((deck[i].cost >= card.cost) && deck[i].name >= card.name){
                deck.splice(i, 0, card);
                break;
            }

            if(deck[i].cost > card.cost){
                deck.splice(i, 0, card);
                break;
            }

            if(i == deck.length -1){
                deck.push(card);
                break;
            }

        }

        if(deck.length == 0){
            deck.push(card);
        }


        //activePlayer.deck.push(draftableCards[draftTurn][selectedDraftableCardInt]);
        selectedDraftableCardInt = -1;
        draftTurn++;
    }

    if(activePlayer.deck.length >= maxDeckSize){

        if(passivePlayer.deck.length >= maxDeckSize){

            startGame();
            return;
        }

        draftableCards = [];
        fillDraftableCards();

        let temp = activePlayer;
        activePlayer = passivePlayer;
        passivePlayer = temp;

        draftTurn = 0;

        turnStatus = 4;

    }

    
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}


function hasPassivePlayerTaunt(){
    for(let i = 0; i < passivePlayer.creatures.length; i++){
        if(passivePlayer.creatures[i].isTaunt) return true;
    }

    return false;
}

function mouseClickedBetweenTurns(x, y) {

    if ((y >= (canvas.height / 2 - turnButtonSizeY / 2)) && (y <= (canvas.height / 2 + turnButtonSizeY / 2)) //turnbutton clicked
        && x > canvas.width - turnButtonSize) {
        nextTurn();
    }

}

function clickedHandcards(x, y) {

    if(isTargetingMode) return;

    var selectedHandCardIntTemp = Math.trunc((x - (canvas.width / 2 - activePlayer.hand.length * (handCardSize + handCardGap) / 2)) / (handCardSize + handCardGap));

    if (!(selectedHandCardIntTemp > activePlayer.hand.length - 1)) {
        if (selectedHandCardInt == selectedHandCardIntTemp) {
            selectedHandCardInt = -1;
        } else {
            selectedHandCardInt = selectedHandCardIntTemp;
            selectedActiveCreatureInt = -1;
        }
    }
}

function clickedActiveCreatures(x, y) {
    var selectedActiveCreatureIntTemp = Math.trunc((x - (canvas.width / 2 - activePlayer.creatures.length * (creatureSize + creatureGap) / 2)) / (creatureSize + creatureGap));

    if (!(selectedActiveCreatureIntTemp > activePlayer.creatures.length - 1)) {

        if(isTargetingMode && isValidActiveCreatures){
            currentTargetingSpell.play(activePlayer.creatures[selectedActiveCreatureIntTemp]);
            return;
        }

        if(isTargetingMode) return;


        if (selectedActiveCreatureInt == selectedActiveCreatureIntTemp) {
            selectedActiveCreatureInt = -1;
        } else {
            if (activePlayer.creatures[selectedActiveCreatureIntTemp].isReady) {
                selectedActiveCreatureInt = selectedActiveCreatureIntTemp;
                selectedHandCardInt = -1;
            }

        }
    }
}

function clickedPassiveCreatures(x, y) {


    var selectedPassiveCreatureIntTemp = Math.trunc((x - (canvas.width / 2 - passivePlayer.creatures.length * (creatureSize + creatureGap) / 2)) / (creatureSize + creatureGap));
    if(!(selectedPassiveCreatureIntTemp < passivePlayer.creatures.length))return; // no creature clicked

    if(isTargetingMode && isValidPassiveCreatures){
        currentTargetingSpell.play(passivePlayer.creatures[selectedPassiveCreatureIntTemp]);
    }

    if (selectedActiveCreatureInt != -1) {

        if(
            !activePlayer.creatures[selectedActiveCreatureInt].isFlying && ((!hasPassivePlayerTaunt() && !passivePlayer.creatures[selectedPassiveCreatureIntTemp].isFlying) || passivePlayer.creatures[selectedPassiveCreatureIntTemp].isTaunt) //Non-flying creatures can attack any creature with taunt and any non-flying creatures if the enemy does not have taunt
            || activePlayer.creatures[selectedActiveCreatureInt].isFlying //Flying creatures can attack anything
        ){
            activePlayer.creatures[selectedActiveCreatureInt].attackCreature(passivePlayer.creatures[selectedPassiveCreatureIntTemp]);
        
            selectedActiveCreatureInt = -1;
        }

        
    }
}

function clickedActivePlayer(x, y) {
    //todo
}

function clickedPassivePlayer(x, y) {

    if(isTargetingMode && isValidPassivePlayer){
        currentTargetingSpell.play(passivePlayer);
    }


    if (selectedActiveCreatureInt != -1) {

        if(!hasPassivePlayerTaunt() || activePlayer.creatures[selectedActiveCreatureInt].isFlying){ //Enemy player can always be hit if he does not have a creature with taunt or if the attacking creature is flying
            activePlayer.creatures[selectedActiveCreatureInt].attackPlayer(passivePlayer);
            selectedActiveCreatureInt = -1;
        }
    }
}

function mouseClickedStartScreen(x, y){
    if ((y >= (canvas.height / 2 - turnButtonSizeY / 2)) && (y <= (canvas.height / 2 + turnButtonSizeY / 2)) //turnbutton clicked
        && x > canvas.width - turnButtonSize) {
            if(!isTargetingMode)
                turnStatus = 4;
    }
}

function mouseClickedMidTurn(x, y) {

    if ((y >= (canvas.height / 2 - turnButtonSizeY / 2)) && (y <= (canvas.height / 2 + turnButtonSizeY / 2)) //turnbutton clicked
        && x > canvas.width - turnButtonSize) {
            if(!isTargetingMode)
                endTurn();
    }

    if (y >= (canvas.height - handCardSizeY - handCardGap)) { //handcards clicked
        if ((x >= canvas.width / 2 - activePlayer.hand.length * (handCardSize + handCardGap) / 2)
            && (x <= canvas.width / 2 + activePlayer.hand.length * (handCardSize + handCardGap) / 2)) {

            clickedHandcards(x, y);

        }
    }

    if ((y >= (canvas.height - handCardSizeY - handCardGap - creatureSizeY - creatureGap)) && y <= canvas.height - handCardSizeY - handCardGap) { //active creatures clicked
        if ((x >= canvas.width / 2 - activePlayer.creatures.length * (creatureSize + creatureGap) / 2)
            && (x <= canvas.width / 2 + activePlayer.creatures.length * (creatureSize + creatureGap) / 2)) {

            clickedActiveCreatures(x, y);

        }
    }


    if ((y >= (handCardSizeY + handCardGap + creatureGap)) && y <= handCardSizeY + handCardGap + creatureGap + creatureSizeY) { //passive creatures clicked
        if ((x >= canvas.width / 2 - passivePlayer.creatures.length * (creatureSize + creatureGap) / 2)
            && (x <= canvas.width / 2 + passivePlayer.creatures.length * (creatureSize + creatureGap) / 2)) {

            clickedPassiveCreatures(x, y);

        }
    }



    if (y >= (deckGap * 2 + deckSizeY) && y <= (deckGap * 2 + deckSizeY * 2) && // passive player clicked
        x >= deckGap + deckSize / 2 && x <= deckGap + deckSize / 2 * 3) {
        clickedPassivePlayer(x, y);
    }


    if ((y >= (canvas.height / 2 - castingFieldSizeY / 2)) && (y <= (canvas.height / 2 + castingFieldSizeY / 2)) //castingfield clicked
        && (x >= (canvas.width / 2 - castingFieldSize / 2)) && (x <= (canvas.width / 2 + castingFieldSize / 2))) {
        castSelected();
    }

    activePlayer.checkDeaths();
    passivePlayer.checkDeaths();

}

class Card {
    constructor(name, image, cost) {
        this.name = name;
        this.image = image;
        this.cost = cost;
        this.cardtext = [];

    }

    play() {

    }
}


class CardSpawnCreature extends Card {

    constructor(name, image, cost) {
        super(name, image, cost);
        this.spawnCreatures = [];
    }

    play() {
        this.spawnCreatures.forEach(c => activePlayer.spawnCreature(c));
    }


}


class CardTargetingSpell extends Card {
    constructor(name, image, cost) {
        super(name, image, cost);

        this.isTargetingPassiveCreatures = false;
        this.isTargetingActiveCreatures = false;
        this.isTargetingPassivePlayer = false;
        this.isTargetingActivePlayer = false;
    }

    play(target) {
        this.effect(target);
        isTargetingMode = false;
        activePlayer.discardDeck.push(this);
    }

    effect(target){

    }

    returnToHand(){
        activePlayer.hand.push(this);
    }

}

class CardSpawnCreatureAndTargetingSpell extends CardSpawnCreature{
    constructor(name, image, cost, accompanyingSpell){
        super(name, image, cost);
        this.accompanyingSpell = accompanyingSpell;
    }
    play() {
        super.play();
        enterSpellTargetingMode(this.accompanyingSpell);
    }
    /*
    play(target) {
        this.spawnCreatures.forEach(c => activePlayer.spawnCreature(c));
        this.effect(target);
        isTargetingMode = false;
        activePlayer.discardDeck.push(this);
    }
    */
}

class CardSpawnCreatureAccompanyingSpell extends CardTargetingSpell{
    constructor(name, image, cost) {
        super(name, image, cost);
    }
    play(target) {
        this.effect(target);
        isTargetingMode = false;
    }
    effect(target){

    }
    returnToHand(){

    }
}





class Creature {
    constructor(name, image, attack, defense) {
        this.name = name;
        this.image = image;

        this.attack = attack;
        this.defense = defense;
        this.maxAttack = attack;
        this.maxDefense = defense;

        this.isReady = false;

        this.isTaunt = false;
        this.isShielded = false;
        this.isUndead = false;
        this.isFlying = false;
        this.isBloodthirsty = false;
    }

    attackCreature(attackedCreature) {
        attackedCreature.takeHit(this.attack, true);
        this.takeHit(attackedCreature.attack, false);
        this.isReady = false;

        //Bloodthirsty healing
        if(this.isBloodthirsty && this.defense > 0){
            if(attackedCreature.defense <= 0){
                this.defense = this.maxDefense;
            }
        }

    }

    attackPlayer(attackedPlayer) {
        attackedPlayer.takeHit(this.attack, true);
        this.isReady = false;
    }

    takeHit(hitDamage, gotAttacked) {
        if(this.isShielded){
            this.isShielded = false;
        } else {
            this.defense -= hitDamage;
        }
    }

}





//----------------------------------------------------------------
//Cards

class CardFireBall extends CardTargetingSpell {
    constructor() {
        super("CardFireBall", document.getElementById("CardFireBallImage"), 2);
        this.cardtext.push("Deal 3 Damage");
        this.cardtext.push("to target enemy.");

        this.isTargetingPassiveCreatures = true;
        this.isTargetingPassivePlayer = true;
    }

    effect(target) {
        target.takeHit(3, true);
    }
}

class CardShield extends CardTargetingSpell{
    constructor(){
        super("CardShield", document.getElementById("CardShieldImage"), 1);
        this.cardtext.push("Shield target");
        this.cardtext.push("creature.");

        this.isTargetingPassiveCreatures = true;
        this.isTargetingActiveCreatures = true;
    }

    effect(target){
        target.isShielded = true;
    }
}

class CardBloodRush extends CardTargetingSpell{
    constructor(){
        super("CardBloodRush", document.getElementById("CardBloodRushImage"), 6);
        this.cardtext.push("Deal 1 Damage");
        this.cardtext.push("to target creature");
        this.cardtext.push("and ready it.");
        this.cardtext.push("It gains +3 attack.");

        this.isTargetingActiveCreatures = true;
        this.isTargetingPassiveCreatures = true;
    }

    effect(target){
        target.takeHit(1, true);
        target.attack += 3;
        target.isReady = true;

    }
}


class CardBook extends Card{
    constructor(){
        super("CardBook", document.getElementById("CardBookImage"), 5);
        this.cardtext.push("Draw 3 Cards.");
    }

    play(){
        for(let i = 0; i < 3; i++){
            activePlayer.drawCard();
        }
    }
}

class CardBloodSacrifice extends Card{
    constructor(){
        super("CardBloodSacrifice", document.getElementById("CardBloodSacrificeImage"), 0);
        this.cardtext.push("Fill your Bloodstones");
        this.cardtext.push("and take 6 Damage.");
    }

    play(){
        activePlayer.takeHit(6);
        activePlayer.fillStones();
    }
}


class CardGoblin extends CardSpawnCreature {
    constructor() {
        super("CardGoblin", document.getElementById("CardGoblinImage"), 2);
        //this.cardtext = [];
        this.cardtext.push("Spawn a");
        this.cardtext.push("1/2 Goblin.");
        this.spawnCreatures.push(new CreatureGoblin());
    }
}

class CardFireGoblin extends CardSpawnCreature {
    constructor() {
        super("CardFireGoblin", document.getElementById("CardFireGoblinImage"), 2);
        this.cardtext.push("Spawn a");
        this.cardtext.push("3/1 Firegoblin.");
        this.spawnCreatures.push(new CreatureFireGoblin());
    }
}

class CardArmoredOgre extends CardSpawnCreature {
    constructor() {
        super("CardArmoredOgre", document.getElementById("CardArmoredOgreImage"), 5);
        this.cardtext.push("Spawn a");
        this.cardtext.push("2/5 Armored Ogre");
        this.cardtext.push("with Taunt.");
        this.spawnCreatures.push(new CreatureArmoredOgre());
    }
}

class CardCrocodile extends CardSpawnCreature {
    constructor(){
        super("CardCrocodile", document.getElementById("CardCrocodileImage"), 5);
        this.cardtext.push("Spawn a");
        this.cardtext.push("4/4 Crocodile");
        this.cardtext.push("with Bloodthirst.");
        this.spawnCreatures.push(new CreatureCrocodile());
    }
}

class CardShieldedKnight extends CardSpawnCreature {
    constructor(){
        super("CardShieldedKnight", document.getElementById("CardShieldedKnightImage"), 3);
        this.cardtext.push("Spawn a");
        this.cardtext.push("2/2 Shielded Knight.");
        this.spawnCreatures.push(new CreatureShieldedKnight());
    }
}

class CardUndeadKnight extends CardSpawnCreature {
    constructor(){
        super("CardUndeadKnight", document.getElementById("CardUndeadKnightImage"), 3);
        this.cardtext.push("Spawn a");
        this.cardtext.push("2/2 Undead Knight.");
        this.spawnCreatures.push(new CreatureUndeadKnight());
    }
}

class CardBat extends CardSpawnCreature {
    constructor(){
        super("CardBat", document.getElementById("CardBatImage"), 2);
        this.cardtext.push("Spawn a");
        this.cardtext.push("1/1 flying Bat.");
        this.spawnCreatures.push(new CreatureBat());
    }
}
class CardDragon extends CardSpawnCreature {
    constructor(){
        super("CardDragon", document.getElementById("CardDragonImage"), 12);
        this.cardtext.push("Spawn a");
        this.cardtext.push("12/12 Dragon.");
        this.spawnCreatures.push(new CreatureDragon());
    }
}
class CardLegionnaire extends CardSpawnCreatureAndTargetingSpell{
    constructor(){
        super("CardLegionnaire", document.getElementById("CardLegionnaireImage"), 3, new CardLegionnaireAccompanyingSpell());
        this.cardtext.push("Spawn a 2/3 Legionnaire.");
        this.cardtext.push("Give another creature");
        this.cardtext.push("Taunt.");
        this.spawnCreatures.push(new CreatureLegionnaire());
    }

    effect(target){
        target.isTaunt = true;
    }
}
class CardLegionnaireAccompanyingSpell extends CardSpawnCreatureAccompanyingSpell{
    constructor(){
        super("CardLegionnaireTaunt", document.getElementById("CardLegionnaireImage"), 0);

        this.isTargetingPassiveCreatures = true;
        this.isTargetingActiveCreatures = true;
    }

    effect(target){
        target.isTaunt = true;
    }
}
class CardGolem extends CardSpawnCreature {
    constructor(){
        super("CardGolem", document.getElementById("CardGolemImage"), 8);
        this.cardtext.push("Spawn a 6/7 Golem.");
        this.cardtext.push("When it dies, add 2");
        this.cardtext.push("Golemites to your hand.");
        this.spawnCreatures.push(new CreatureGolem());
    }
}
class CardGolemite extends CardSpawnCreature {
    constructor(){
        super("CardGolemite", document.getElementById("CardGolemiteImage"), 4);
        this.cardtext.push("Spawn a");
        this.cardtext.push("3/3 Golemite.");
        this.spawnCreatures.push(new CreatureGolemite());
    }
}
class CardBloodStoneGolem extends CardSpawnCreature {
    constructor(){
        super("CardBloodstoneGolem", document.getElementById("CardBloodStoneGolemImage"), 8);
        this.cardtext.push("Spawn a 7/6 Golem.");
        this.cardtext.push("Whenever it attacks and");
        this.cardtext.push("kills a creature, add a");
        this.cardtext.push("Golemite to your hand.")
        this.spawnCreatures.push(new CreatureBloodStoneGolem());
    }
}
class CardBloodDrone extends CardSpawnCreature {
    constructor(){
        super("CardBloodDrone", document.getElementById("CardBloodDroneImage"), 1);
        this.cardtext.push("Spawn a 2/1");
        this.cardtext.push("Blood Drone Swarm.");
        this.cardtext.push("After it attacks, it");
        this.cardtext.push("drains 2 of your health");
        this.cardtext.push("and gains +1 attack.");
        this.spawnCreatures.push(new CreatureBloodDrone());
    }
}
class CardCrab extends CardSpawnCreature {
    constructor(){
        super("CardCrab", document.getElementById("CardCrabImage"), 1);
        this.cardtext.push("Spawn a 1/1 crab.");
        this.cardtext.push("Whenever it attacks and");
        this.cardtext.push("kills a creature, it");
        this.cardtext.push("gains a shield.");
        this.spawnCreatures.push(new CreatureCrab());
    }
}
class CardFlame extends CardSpawnCreature {
    constructor(){
        super("CardFlame", document.getElementById("CardFlameImage"), 1);
        this.cardtext.push("Spawn a");
        this.cardtext.push("1/1 Living Flame.");
        this.cardtext.push("Add a fireball");
        this.cardtext.push("to your hand.");
        this.spawnCreatures.push(new CreatureFlame());
    }
    play(){
        super.play();
        activePlayer.hand.push(new CardFireBall());
    }
}
class CardMadKnight extends CardSpawnCreature {
    constructor(){
        super("CardMadKnight", document.getElementById("CardMadKnightImage"), 2);
        this.cardtext.push("Spawn a 4/2 Mad Knight.");
        this.cardtext.push("Whenever it attacks,");
        this.cardtext.push("it hits YOU as well.");
        this.spawnCreatures.push(new CreatureMadKnight());
    }
}
class CardDragonKnight extends CardSpawnCreature {
    constructor(){
        super("CardDragonKnight", document.getElementById("CardDragonKnightImage"), 3);
        this.cardtext.push("Spawn a 3/2 Dragon Knight.");
        this.cardtext.push("Discard your hand.");
        this.cardtext.push("Add a dragon to your hand,");
        this.cardtext.push("its cost reduced to 10.");
        this.spawnCreatures.push(new CreatureDragonKnight());
    }
    play(){
        super.play();
        while(activePlayer.hand.length > 0){
            let card = activePlayer.hand[0];
            activePlayer.hand.splice(0, 1);
            activePlayer.discardDeck.push(card);
        }
        let dragon = new CardDragon();
        dragon.cost = 10;
        activePlayer.hand.push(dragon);
    }
}

//----------------------------------------------------------------





//----------------------------------------------------------------
//Creatures

class CreatureGoblin extends Creature {
    constructor() {
        super("Goblin", document.getElementById("CreatureGoblinImage"), 1, 2);
    }
}

class CreatureFireGoblin extends Creature {
    constructor() {
        super("FireGoblin", document.getElementById("CreatureFireGoblinImage"), 3, 1);
    }
}

class CreatureArmoredOgre extends Creature {
    constructor() {
        super("ArmoredOgre", document.getElementById("CreatureArmoredOgreImage"), 2, 5);
        this.isTaunt = true;
    }
}

class CreatureCrocodile extends Creature {
    constructor(){
        super("Crocodile", document.getElementById("CreatureCrocodileImage"), 4, 4);
        this.isBloodthirsty = true;
    }
}

class CreatureShieldedKnight extends Creature {
    constructor(){
        super("ShieldedKnight", document.getElementById("CreatureShieldedKnightImage"), 2, 2);
        this.isShielded = true;
    }
}

class CreatureUndeadKnight extends Creature {
    constructor(){
        super("UndeadKnight", document.getElementById("CreatureUndeadKnightImage"), 2, 2);
        this.isUndead = true;
    }
}
class CreatureBat extends Creature {
    constructor(){
        super("Bat", document.getElementById("CreatureBatImage"), 1, 1);
        this.isFlying = true;
    }
}
class CreatureDragon extends Creature {
    constructor(){
        super("Dragon", document.getElementById("CreatureDragonImage"), 12, 12);
        this.isFlying = true;
    }
}
class CreatureLegionnaire extends Creature {
    constructor(){
        super("Legionnaire", document.getElementById("CreatureLegionnaireImage"), 2, 3);
    }
}
class CreatureGolem extends Creature {
    constructor(){
        super("Golem", document.getElementById("CreatureGolemImage"), 6, 7);
    }
    takeHit(hitDamage, gotAttacked) {
        super.takeHit(hitDamage, gotAttacked);
        if(this.defense <= 0){
            let p;
            if(gotAttacked){
                p = passivePlayer;
            } else {
                p = activePlayer;
            }

            p.addCardToHand(new CardGolemite());
            p.addCardToHand(new CardGolemite());
        }
    }
}
class CreatureGolemite extends Creature {
    constructor(){
        super("Golemite", document.getElementById("CreatureGolemiteImage"), 3, 3);
    }
}
class CreatureBloodStoneGolem extends Creature {
    constructor(){
        super("BloodStoneGolem", document.getElementById("CreatureBloodStoneGolemImage"), 7, 6);
    }
    attackCreature(attackedCreature) {
        super.attackCreature(attackedCreature);
        if(attackedCreature.defense <= 0){
            activePlayer.hand.push(new CardGolemite());
        }
    }
}
class CreatureBloodDrone extends Creature {
    constructor(){
        super("BloodDrone", document.getElementById("CreatureBloodDroneImage"), 2, 1);
    }
    attackCreature(attackedCreature) {
        super.attackCreature(attackedCreature);
        if(this.defense > 0){
            activePlayer.takeHit(2, true);
            this.attack += 1;
        }
    }
    attackPlayer(attackedPlayer){
        super.attackPlayer(attackedPlayer);
        if(this.defense > 0){
            activePlayer.takeHit(2, true);
            this.attack += 1;
        }
    }
}
class CreatureCrab extends Creature {
    constructor(){
        super("Crab", document.getElementById("CreatureCrabImage"), 1, 1);
    }
    attackCreature(attackedCreature) {
        super.attackCreature(attackedCreature);
        if(attackedCreature.defense <= 0 && this.defense > 0){
            this.isShielded = true;
        }
    }
}
class CreatureFlame extends Creature {
    constructor(){
        super("Flame", document.getElementById("CreatureFlameImage"), 1, 1);
    }
}
class CreatureMadKnight extends Creature {
    constructor(){
        super("MadKnight", document.getElementById("CreatureMadKnightImage"), 4, 2);
    }
    attackCreature(attackedCreature) {
        activePlayer.takeHit(this.attack, true);
        super.attackCreature(attackedCreature);
    }
    attackPlayer(attackedPlayer){
        activePlayer.takeHit(this.attack, true);
        super.attackPlayer(attackedPlayer);
    }
}
class CreatureDragonKnight extends Creature {
    constructor(){
        super("DragonKnight", document.getElementById("CreatureDragonKnightImage"), 3, 2);
    }
}
//----------------------------------------------------------------





//----------------------------------------------------------------
//Player

class Player {
    constructor(name, image) {
        this.name = name;
        this.image = image;
        this.hand = [];

        this.health = 30;

        this.maxStones = 0;
        this.fullStones = 0;

        this.deck = [];

        // this.deck.push(new CardFireGoblin());
        // this.deck.push(new CardGoblin());
        // this.deck.push(new CardArmoredOgre());
        // this.deck.push(new CardFireGoblin());
        // this.deck.push(new CardGoblin());
        // this.deck.push(new CardArmoredOgre());
        // this.deck.push(new CardFireBall());
        // this.deck.push(new CardCrocodile());

        this.discardDeck = [];

        this.creatures = [];

        // this.creatures.push(new CreatureGoblin());
        // this.creatures.push(new CreatureGoblin());
    }

    spawnCreature(c) {
        c.isReady = false;
        this.creatures.push(c);
    }

    fillStones() {
        this.fullStones = this.maxStones;
    }

    addCardToHand(card){
        if(this.hand.length < 8)
        this.hand.push(card);
    }

    drawCard() {

        this.addCardToHand(this.deck.pop());


    }

    checkDeaths() {
        //selectedHandCardInt = 1;
        for (let i = 0; i < this.creatures.length; i++) {
            if (this.creatures[i].defense <= 0) {
                if(this.creatures[i].isUndead){ //Creature respawns upon death
                    this.creatures[i].defense = 1;
                    this.creatures[i].isUndead = false;
                    this.spawnCreature(this.creatures[i]);
                }
                this.creatures.splice(i, 1);
            }
        }
    }

    readyAllCreatures() {
        for (let i = 0; i < this.creatures.length; i++) {
            this.creatures[i].isReady = true;
        }
    }

    takeHit(damage, gotAttacked) {
        this.health -= damage;
        checkWin();
    }

}
//----------------------------------------------------------------