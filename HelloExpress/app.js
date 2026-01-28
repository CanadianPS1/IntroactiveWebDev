//im gunna kill my self
console.log("good bye world");
const express = require('express');
const app = express();
const PORT = 9001;
app.set("view engine", "ejs");
app.use(express.static("public"));
app.get("/", (req, res) => {
    console.log("<html>Get: homepage</html>");
    let quoteFromDb = "'Me Fial english.... thats unpossible'"
    let model = {
        qotd: quoteFromDb
    };
    res.render("home",model);
})
app.get("/about-us", (req, res) => {
    res.send("this website is for ordering hits on people");
})
app.get("/green", (req, res) => {
    res.sendFile("/et.jpg");
})
app.get("/contact-me", (req, res) => {
    res.render("contact");
});
app.post("/contact-me", (req, res) => {
    
});
app.listen(PORT, () => {
    console.log("espress running on pork:" + PORT);
    console.log("http://localhost:" + PORT);
});