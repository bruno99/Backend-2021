import { MongoClient } from "mongodb"

//modo atiguo, usar import mejor 
//const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://bruno:Nebrija52@cluster-nebrija.loorm.mongodb.net/BrunoDB?retryWrites=true&w=majority";
const client = new MongoClient(uri);
client.connect().then(() => {
    console.log("Connected to DB");
    client.db("BrunoDB").collection("clase")
        .find()
        .toArray()
        .then((results => {
            client.db("BrunoDB").collection("clase").insertOne(
                {
                name: "Bruno2",
                apellido: "test",
                edad: 22
            }
            ).then(() => console.log("new user"));
            
            console.log(results[0]);
        })).catch(e => console.log(e));
}).catch((e) => {
    console.log(e);
})

//     err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
//});
