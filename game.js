function startGame(){
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;


    var imgCreatureGoblin = document.getElementById("CreatureGoblinImage");


    var handImageSizeX = 160;
    var handImageSizeY = handImageSizeX * Math.sqrt(2);

    ctx.drawImage(imgCreatureGoblin, 10, 10, handImageSizeX, handImageSizeY);
}