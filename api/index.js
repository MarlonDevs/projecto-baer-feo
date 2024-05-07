var Express = require("express");
var Mongoclient=require("mongodb").MongoClient; 
var cors=require("cors");
const multer=require("multer");

var app=Express();
app.use(cors());

var CONNECTION_STRING="mongodb+srv://admin:admin-baer@cluster0.yqz2aqo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

var DATABASENAME="baer-bd";
var database;

app.listen(5038, ()=>{
    Mongoclient.connect(CONNECTION_STRING,(error, client) =>{
        database=client.db(DATABASENAME);
        console.log("MongoDB connection successful");
    })
})

app.get('/api/baer-db/GetNotes', (request, response) =>{
    database.collection("baercollection").find({}).toArray((error, result) =>{
        response.send(result);
    })
})

app.post('/api/baer-db/AddNotes', multer().none(), (request, response) =>{
    database.collection("baercollection").count({}, function(error,numOfDocs){
        database.collection("baercollection").insertOne({
            id:(numOfDocs+1).toString(),
            name: request.body.newNote
        });
        response.json("Added successfully");
    });
})

app.delete('/api/baer-db/DeleteNotes',(request, response) => {
    database.collection("baercollection").deleteOne({
        ir: request.query.id
    })
    response.json("Delete Successfully")
})