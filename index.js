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
let client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.post('/addProduct', (req, res) => {
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    const product = req.body;
    client.connect(err => {
        const collection = client.db("onlineStore").collection("products");
        collection.insertOne(product, (err, result) => {
            if (err) {
                console.log(err)
            }
            else {
                res.send(result.ops[0])
            }
        });
        client.close();
    });
});






app.listen(port, () => console.log(`We are Live on port No:  ${port}!`))