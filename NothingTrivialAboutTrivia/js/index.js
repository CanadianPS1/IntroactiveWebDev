const playButton = document.getElementById("playButton");
playButton.addEventListener("click", () =>{
    GetQuestions();
});
async function GetQuestions(){
    let jsonData = [];
    const amountOfQuestions = document.getElementById("amountOfQuestions").value;
    const difficulty = document.getElementById("difficulty").value;
    const url = `https://opentdb.com/api.php?amount=${amountOfQuestions}&category=15&difficulty=${difficulty}&type=multiple`
    fetch(url).then(response => response.json()).then(data => {
        PoseQuestions(data);
    });
}
function PoseQuestions(jsonData){
    for(let i = 0; i < document.getElementById("amountOfQuestions").value; i++){
        const questionNumber = `Question #${i + 1}`;
        document.getElementById("questionNumberText").textContent = (questionNumber);

    }
}