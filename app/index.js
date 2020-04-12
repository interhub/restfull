const express = require("express");
const app = express();
const bp = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
class Book {
    constructor(author, name, age) {
        this.param = {
            people: true,
            author,
            age
        };
        this.name = name;
    }
}

app.use(bp.json());
app.use(bp.urlencoded({
    extended: true
}));
const mongo = new MongoClient("mongodb+srv://stepan:338voenka@interhub-udazq.gcp.mongodb.net/test?retryWrites=true&w=majority", {
    useNewUrlParser: true
});
mongo.connect((err, db) => {
    if (err) {
        return console.error(err);
    }
    db.close()
})

app.get("/", (req, res) => {
    console.log("request page");
    mongo.connect((err, client) => {
        if (err) {
            return console.error(err);
        }
        const db = client.db("newbase");
        const collection = db.collection("books");
        let books = [
            new Book("Erik", "скотный двор", 32),
            new Book("Marina Iosif", "Добро и зло", 56),
            new Book("Elis", "Книги для детей", 12),
            new Book("Mery", "Книги для росылх", 34),
            new Book("Женя", "Учебник по биологии", 34),


        ]
        collection.find({
            "param.age": {
                $gt: 33
            }
        }).toArray((err, result) => {
            if (err) {
                console.error(err);
            }
            console.log(result);
            res.send(result)
        });
        client.close()
    })
});


app.listen(3005, () => {
    console.log("server start");
})
