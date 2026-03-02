const { MongoClient, ObjectId } = require('mongodb');
const uri = "mongodb+srv://admit:passw0rd@schoolpilled.10u9kyg.mongodb.net/?appName=SchoolPilled";
// Write a function that reads all documents from a collection
// We used my Animal colleciton in the demo in class, but you should use one you created (Animals, Books, Movies, etc)
// Returns an array of all documents in the collection
async function getAllDocuments() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    // Get the Database we want to work with
    let db = await client.db("TESTER");
    // From the db object, get the collection we want to work with
    let coll = db.collection("TEST_ONE");
    // Perform our query (find, update, delete, etc)
    let results = await coll.find().toArray(); // If it returns multiple results, we need to get an array of items
    //console.log("Results:", results);
    return results;
  } finally {
    await client.close();
  }
}
// Write a function that reads a single document from a collection by name
// name: the name of the document to find (You can change "name" to some other field in your document that makes sense)
// Returns the document found
async function getDocumentByName(name) {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    // Your Code Here
    const db = client.db("TESTER")
    const collection = db.collection("TEST_ONE");
    const documents = await collection.findOne({ q: name});
    //console.log("Documents: ", documents)
    return documents;
  } finally {
    await client.close();
  }
}

// Write a fucntion that adds a document to a collection
// newDoc: the document to add
// Returns the _id of the newly added document
async function addDocument(newDoc) {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    // Your Code Here
    const db = client.db("TESTER")
    const collection = db.collection("TEST_ONE");
    const result = await collection.insertOne(newDoc);
    return result
  } finally {
    await client.close();
  }
}

// Write a function that deletes a document from a collection
// id: the _id of the document to delete
// Returns nothing
async function deleteDocument(id) {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db("TESTER")
    const collection = db.collection("TEST_ONE");
    const result = await collection.deleteOne({
      _id: new ObjectId(id)
    });
    return result
  } finally {
    await client.close();
  }
}

// Write a function that updates a document in a collection
// id: the _id of the document to update
// updatedDoc: the updated document
// Returns nothing
async function updateDocument(id, updatedDoc) {
    const client = new MongoClient(uri);
    try {
        await client.connect();

        // Your Code Here
        const db = client.db("TESTER")
        const collection = db.collection("TEST_ONE");
        const result = await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { q: updatedDoc } }
        );
        return result
    } finally {
        await client.close();
    }
}

// Calling one of your functions
//getAllDocuments().then(data => console.log("Documents", data));

// Write code HERE to call your other functions and test them out and prove that they work

//getDocumentByName(`q`).then(data => console.log("Data", data));

//const newInput = {q: "l"}
//addDocument(newInput).then(data => console.log("Data", data));

//deleteDocument("69a5228d2660bebc257ce021").then(data => console.log("Data", data));

updateDocument("69a5228d2660bebc257ce021", "p").then(data => console.log("Data", data));