const { render } = require('ejs');
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
    res.render("features");
})
app.get("/features", (req, res) => {
    res.sendFile("/et.jpg");
})
app.get("/orders", (req, res) => {
    res.render("buying");
});
app.post("/orders", (req, res) => {
    let name = req.body.name;
    let address = req.body.address;
    let email = req.body.email;
    let phone = req.body.phone;
    console.log("Name: " + name);
    console.log("Address: " + address);
    console.log("Email: " + email);
    console.log("Phone: " + phone);
    if(name != "" && address != "" && email != "" && phone != ""){
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
    }else{
        res.redirect("/orders");
    }
});
app.listen(PORT, () => {
    console.log("espress running on pork:" + PORT);
    console.log("http://localhost:" + PORT);
});