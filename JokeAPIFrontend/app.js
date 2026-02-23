const { render } = require('ejs');
const express = require('express');
const app = express();
const PORT = 8080;
const axios = require("axios");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded());
app.get("/", (req, res) => {
    res.render("home");
})
app.get("/jokes", (req, res) => {
    //res.sendFile(__dirname + '/jokes.ejs');
    let jokeFromDb = "Im the Grinch";
    let model = {
        joke: jokeFromDb
    };
    res.render("jokes", model);
})
app.post("/jokes", async (req, res) => {
    try{
        let jokeFromDb = ""
        let jokeType = req.body.JokeType;
        fetch("http://localhost:8081/get_joke", {
            method: "POST",
            headers: {"Content-Type": "application/json",
                "Joke-Request": "frontEnd"},
            body: JSON.stringify({message: jokeType})
        })
        .then(res => res.json())
        .then(data => {
            jokeFromDb = data.joke + "";
            console.log(jokeFromDb)
            let model = {
                joke: jokeFromDb
            };
            res.render("jokes", model);
        });;
    }catch(err){
        console.error(err);
        res.status(500).send("Error fetching joke");
    }
})
app.get("/create_joke", (req, res) => {
    res.render("createJoke")
})
app.post("/create_joke", async (req, res) => {
    try{
        let joke = req.body.joke;
        let jokeType = req.body.JokeType;
        fetch("http://localhost:8081/create_joke", {
            method: "POST",
            headers: {"Content-Type": "application/json",
                "Joke-Create": "frontEnd"},
            body: JSON.stringify({jokeType: jokeType,
                                joke: joke
                                })
        })
        .then(res => res.json())
        .then(data => {
            jokeFromDb = data.success + "";
            console.log(jokeFromDb)
            if(jokeFromDb == "yes"){
               res.render("home"); 
            }else if(jokeFromDb == "no"){
                res.render("createJoke");
            }
            
        });;
    }catch(err){
        console.error(err);
        res.status(500).send("Error fetching joke");
    }
});
app.listen(PORT, () => {
    console.log("espress running on pork:" + PORT);
    console.log("http://localhost:" + PORT);
});