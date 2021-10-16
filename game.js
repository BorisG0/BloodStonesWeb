function startGame(){
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    //ctx.font = "30px Arial";
    //ctx.fillText("Hello World",10,50);

    var imgCreatureGoblin = document.getElementById("CreatureGoblinImage");


    var handImageSizeX = 160;
    var handImageSizeY = handImageSizeX * Math.sqrt(2);

    ctx.drawImage(imgCreatureGoblin, 10, 10, handImageSizeX, handImageSizeY);
}