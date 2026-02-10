const { render } = require('ejs');
const express = require('express');
const app = express();
const PORT = 8080;
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded());
app.get("/", (req, res) => {
    res.render("home");
})
app.get("/jokes", (req, res) => {
    res.render("jokes");
})
app.get("/create_joke", (req, res) => {
    res.render("createJoke")
})
app.post("/create_joke", (req, res) => {
    let questionAndAnswer = req.body.questionAndAnswer;
    let question = req.body.question;
    let answer = req.body.answer;
    let generalJoke = req.body.generalJoke;
    console.log("Question and Answer: " + questionAndAnswer);
    console.log("Question: " + question);
    console.log("Answer: " + answer);
    console.log("General Joke: " + generalJoke);
    if(questionAndAnswer && question != "" && answer != "" && generalJoke == ""){
        const fs = require('fs');
        res.redirect("/");
        let orderData = `{ "${name}sOrder" : [` +
                        `{ "name": "${name}"}, { "address": "${address}"},` +
                        `{ "email": "${email}"}, { "phone": "${phone}"}]}`;
        const jsonData = JSON.stringify(orderData, null, 2);
        fs.writeFile(`${name}sOrder`, jsonData, 'utf8', (err) => {
            if(err) console.error('Error writing to file', err);
            else console.log('Data written to file');
        });
    }else if(!questionAndAnswer && question == "" && answer == "" && generalJoke != ""){
        const fs = require('fs');
        res.redirect("/");
        let Jokes = `{ "${name}sOrder" : [` +
                        `{ "name": "${name}"}, { "address": "${address}"},` +
                        `{ "email": "${email}"}, { "phone": "${phone}"}]}`;
        const jsonData = JSON.stringify(orderData, null, 2);
        fs.writeFile(`${name}sOrder`, jsonData, 'utf8', (err) => {
            if(err) console.error('Error writing to file', err);
            else console.log('Data written to file');
        });
    }else{
        res.redirect("/create_joke");
    }
});
app.listen(PORT, () => {
    console.log("espress running on pork:" + PORT);
    console.log("http://localhost:" + PORT);
});