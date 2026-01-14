const playButton = document.getElementById("playButton");
const inputField = document.getElementById("input");
const guessButton = document.getElementById("guessButton");
const nextButton = document.getElementById("nextButton");
const scoreCard = document.getElementById("scoreCard");
const music = new Audio('./Music/Theme.mp3');
let score;
let jsonData;
let iterationCount;
playButton.addEventListener("click", () =>{
    QuestionAnswered = false;
    GetQuestions();
});
guessButton.addEventListener("click", () =>{
    QuestionAnswered = true;
    Guess();
});
nextButton.addEventListener("click", () =>{
    QuestionAnswered = false;
    iterationCount = iterationCount + 1;
    guessButton.disabled = false;
    PoseQuestions(iterationCount);
})
async function GetQuestions(){
    const amountOfQuestions = document.getElementById("amountOfQuestions").value;
    const difficulty = document.getElementById("difficulty").value;
    const url = `https://opentdb.com/api.php?amount=${amountOfQuestions}&category=15&difficulty=${difficulty}&type=multiple`
    fetch(url).then(response => response.json()).then(data => {
        iterationCount = 0;
        jsonData = data;
        score = 0
        document.getElementById("scoreCard").textContent = (`${score}/${iterationCount + 1}`);
        music.pause();
        music.play();
        PoseQuestions(iterationCount);
    });
}
function PoseQuestions(i){
    inputField.style.visibility = "visible";
    guessButton.style.visibility = "visible";
    nextButton.style.visibility = "visible";
    scoreCard.style.visibility = "visible";
    const questionNum = i + 1;
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
function Guess(){
    const guess = inputField.value;
    const correctAnswer = jsonData.results[iterationCount].correct_answer;
    let answerList = document.getElementById("answers").textContent;
    if(guess == "a"){
        answerList = answerList.slice(answerList.indexOf(`(${guess})`) + 4, answerList.indexOf("(b)"));
    }else if(guess == ("b")){
        answerList = answerList.slice(answerList.indexOf(`(${guess})`) + 4, answerList.indexOf("(c)"));
    }else if(guess == ("c")){
        answerList = answerList.slice(answerList.indexOf(`(${guess})`) + 4, answerList.indexOf("(d)"));
    }else if(guess == ("d")){
        answerList = answerList.slice(answerList.indexOf(`(${guess})`) + 4, answerList.length);
    }
    if(answerList == correctAnswer){
        score++;
    }
    guessButton.disabled = true;
    document.getElementById("correctAnswerDisplay").textContent = `The Correct Answer Was "${correctAnswer}"`;
    document.getElementById("scoreCard").textContent = (`${score}/${iterationCount + 1}`);
}