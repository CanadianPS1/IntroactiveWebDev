const playButton = document.getElementById("playButton");
const inputField = document.getElementById("input")
const guessButton = document.getElementById("guessButton")
playButton.addEventListener("click", () =>{
    GetQuestions();
});
async function GetQuestions(){
    const amountOfQuestions = document.getElementById("amountOfQuestions").value;
    const difficulty = document.getElementById("difficulty").value;
    const url = `https://opentdb.com/api.php?amount=${amountOfQuestions}&category=15&difficulty=${difficulty}&type=multiple`
    fetch(url).then(response => response.json()).then(data => {
        PoseQuestions(data);
    });
}
function PoseQuestions(jsonData){
    inputField.style.visibility = "visible";
    guessButton.style.visibility = "visible";
    for(let i = 0; i < document.getElementById("amountOfQuestions").value; i++){
        const questionNum = i - 8;
        const questionNumber = `Question #${questionNum}`;
        document.getElementById("questionNumberText").textContent = (questionNumber);
        let question = jsonData.results[i].question;
        const correctAnswer = jsonData.results[i].correct_answer;
        jsonData.results[i].incorrect_answers.push(correctAnswer);
        const answers = jsonData.results[i].incorrect_answers;
        answers.sort(() => Math.random() - 0.5);
        document.getElementById("question").textContent = (question);
        document.getElementById("answers").textContent = (`(a) ${answers[0]}\n(b) ${answers[1]}\n(c) ${answers[2]}\n(d) ${answers[3]}`);
    }
}