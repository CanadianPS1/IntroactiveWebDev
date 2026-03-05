const express = require('express');
const app = express();
const PORT = 9001;
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded());
app.get("/",  async (req, res) => {
    const response = await fetch("http://localhost:8081/get-page");
    const text = await response.text();
    let dataArray = JSON.parse(text);
    dataArray = JSON.parse(dataArray);
    const entriesOnly = dataArray.map(item => item.entrie);
    let model = {
        posts: entriesOnly
    };
    res.render("home", model); 
})
app.post("/", async (req, res) => {
    try{
        let entrie = req.body.post;
        fetch("http://localhost:8081/submit-entrie", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "entrie-Create": "frontEnd"
            },
            body: JSON.stringify({entrie: entrie,})
        });
        const response = await fetch("http://localhost:8081/get-page");
        const text = await response.text();
        let dataArray = JSON.parse(text);
        dataArray = JSON.parse(dataArray);
        const entriesOnly = dataArray.map(item => item.entrie);
        let model = {
            posts: entriesOnly
        };
        res.render("home", model); 
        }catch(err){
            console.error(err);
            res.status(500).send("Error fetching joke");
        }
});
app.listen(PORT, () => {
    console.log("espress running on pork:" + PORT);
    console.log("http://localhost:" + PORT);
});