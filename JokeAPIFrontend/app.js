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
        const response = await axios.post("http://localhost:8081/get_joke",{JokeType: req.body.JokeType});
        console.log(response.data);
        res.json(response.data);

    }catch(err){
        console.error(err);
        res.status(500).send("Error fetching joke");
    }
})
app.get("/create_joke", (req, res) => {
    res.render("createJoke")
})
app.post("/create_joke", (req, res) => {
    let generalJoke = req.body.joke;
    let jokeType = req.body.JokeType;
    console.log(jokeType + ": " + generalJoke);
    if(generalJoke != ""){
        if(jokeType == "leagueJoke") leagueJokes.push(generalJoke);
        else if(jokeType == "generalJoke") generalJokes.push(generalJoke);
        else if(jokeType == "generalerJoke") generalerJokes.push(generalJoke);
        res.redirect("/");
    }else res.redirect("/create_joke");
});
app.listen(PORT, () => {
    console.log("espress running on pork:" + PORT);
    console.log("http://localhost:" + PORT);
});