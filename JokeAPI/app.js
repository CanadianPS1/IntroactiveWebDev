const { render } = require('ejs');
const express = require('express');
const app = express();
const PORT = 8080;
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded());
var leagueJokes = ["Im moving as Fast as I can!!!", 
                    "Im Zack", 
                    "Jhin, in the big two six", 
                    "Misttaaaa YIIII",
                    "What did the risky gambit say to Majiah : You cost 1150 more gold then me"
]
var generalJokes = ["Whys the Grinch so GREEEEN : because he ate all the green juice",
                    "October 6th 2032, Car Accident.",
                    "Reply Hazy, try again",
                    "What you do call a Grinch that isn't green : Orange Grinch ",
                    "*You enter a room and see a figure looking out the window, his back turned to you* 'Hello?' - you say confused *the man turns around, he appears to be the Grinch* 'Grinch??!' - you esclame *the figure smirks, then takes off his mask, he's a man with a horn coming out of his head and an eye patch* *he looks to the camera still smirking, and invisible by Duran Duran starts playing*"
]
var generalerJokes = ["Whats the deal with the my SSD : Like whhyyyyyys it sooo solllidd",
                        "General. . . the casultys have been massive, we've lost over 70% of our troups",
                        "DAMN!!! whats the state of the field?",
                        "we're being pushed back, if this keeps up theyll be at New York by 23000",
                        "*Smashes fist on tabel* call the troups back... we'll defend at Philly, we should be able to regroup and push them back from their."
]
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
    let generalJoke = req.body.generalJoke;
    let jokeType = req.body.jokeType;
    console.log("General Joke: " + generalJoke);
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