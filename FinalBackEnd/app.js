const { render } = require('ejs');
const express = require('express');
const app = express();
const PORT = 8081;
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded());
const { MongoClient, ObjectId } = require('mongodb');
const uri = "mongodb+srv://admit:passw0rd@schoolpilled.10u9kyg.mongodb.net/?appName=SchoolPilled";
app.post("/submit-entrie", (req, res) => {
    addDocument(req.body);
    res.json({status: "ok",
            "success": "yes"
    });
})
app.get("/get-page", async (req, res) => {
    try{
        let result = await getAllDocuments();
        res.json(JSON.stringify(result));
    }catch(err){
        console.error("SERVER ERROR:", err);
        res.status(500).json({ error: err.message });
    }
})
async function addDocument(newDoc){
    const client = new MongoClient(uri);
    try{
        await client.connect();
        const db = client.db("Blog")
        const collection = db.collection("Blog");
        const result = await collection.insertOne(newDoc);
        return result
    }finally{
        await client.close();
    }
}
async function getAllDocuments(){
    const client = new MongoClient(uri);
    try{
    await client.connect();
        let db = await client.db("Blog");
        let coll = db.collection("Blog");
        let results = await coll.find().sort({_id: -1}).toArray();
        return results;
    }finally{
        await client.close();
    }
}
app.listen(PORT, () => {
    console.log("espress running on pork:" + PORT);
    console.log("http://localhost:" + PORT);
});