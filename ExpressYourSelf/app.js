const express = require('express');
const app = express();
const PORT = 8080;
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded());
app.get("/", (req, res) => {
    console.log("<html>Get: homepage</html>");
    let quoteFromDb = "'Talk about getting some Tail' - Gex"
    let model = {
        qotd: quoteFromDb
    };
    res.render("home",model);
})
app.get("/features", (req, res) => {
    res.send("this website is for ordering hits on people");
})
app.get("/features", (req, res) => {
    res.sendFile("/et.jpg");
})
app.get("/orders", (req, res) => {
    res.render("contact");
});
app.post("/orders", (req, res) => {
    let body = req.body;
    res.redirect("/")
    console.log("Body" + body);
});
app.listen(PORT, () => {
    console.log("espress running on pork:" + PORT);
    console.log("http://localhost:" + PORT);
});