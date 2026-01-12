console.log("Rawr");

const et = document.getElementById("et");
et.addEventListener("click", soundPlay);
let etSound = new Audio('./images/MainMenu.wav');
function soundPlay(){
    console.log("Playing sound! Maybe"); 
    etSound.play();
}