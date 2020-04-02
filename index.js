const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors')
const port = 4200

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Get Request'))
const user = ['sakib', 'sayem', 'Tamanna', 'Allu-Arjun']

app.get('/user/:id', (req, res) => {
    const id = req.params.id;
    const name = user[id];
    res.send({ id, name })

})

const uri = "mongodb+srv://sojib_bd:Ol57pkWa60V2h0UB@cluster0-o5pd4.mongodb.net/test?retryWrites=true&w=majority";

app.post('/addProduct', (req, res) => {
    const product = req.body;
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(err => {
        const collection = client.db("onlineStore").collection("products");
        collection.insertOne(product, (err, result) => {
            console.log('insert successfully', result)
        });
        client.close();
    });
});






app.listen(port, () => console.log(`We are Live on port No:  ${port}!`))