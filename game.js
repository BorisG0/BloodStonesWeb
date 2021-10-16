function startGame(){
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;


    var imgLogo = document.getElementById("KidneyStoneLogoImage");
    var logoSizeX = 1536/2;
    var logoSizeY = 724/2;
    ctx.drawImage(imgLogo, (canvas.width / 2) - (logoSizeX / 2), 10, logoSizeX, logoSizeY);
    

    drawActiveHand();
    
}


function drawActiveHand(){

    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

    var imgCreatureGoblin = document.getElementById("CreatureGoblinImage");
    var handCardSizeX = 130;
    var handCardSizeY = handCardSizeX * Math.sqrt(2);

    ctx.drawImage(imgCreatureGoblin, 0, canvas.height-handCardSizeY,handCardSizeX, handCardSizeY)
}