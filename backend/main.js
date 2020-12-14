//import libraries
const express = require('express')
const morgan = require('morgan')
//import mongodb driver
const MongoClient = require('mongodb').MongoClient; //npm i mongodb

//need to import ObjectId from mongo
const ObjectId = require('mongodb').ObjectID

require('dotenv').config()


const app = express()
app.use(morgan('combined'))

//connection string
const MONGO_URL = 'mongodb://localhost:27017'
//const MONGO_URL = 'mongodb+srv://<username>:<password>@paf-cluster.7ywpi.mongodb.net/<dbname>?retryWrites=true&w=majority'
/* !!! note that username password and dbname is inside, use env variables to input into the code*/

//to restore/upload data into mongoDB cloud
//in cli:
//mongorestore --uri mongodb+srv://<username>:<password>@paf-cluster.7ywpi.mongodb.net/<dbname>?retryWrites=true&w=majority --db mflix --dir sample_mflix

//if using atlus, go to clusters, connect, and get the connection string from there
//or just copy paste the code from full driver code example
//if windows doesnt recognize srv use the conn. string from node v2.2 and below

//create client-pool
const mongoClient = new MongoClient(MONGO_URL,{
    useNewUrlParser: true, useUnifiedTopology: true
})


const APP_PORT = parseInt(process.argv.APP_PORT) || parseInt(process.env.APP_PORT)

app.get("/", (req, resp) => {
    resp.status(200).type('text/html')
    resp.send("page loaded successfully")
})

//GET /countries
app.get("/countries", async (req, resp) => {
    let country = req.params.country

    //perform query to mongodb 
    //- return all the countries from the database & sort(its alr autosorted)
    try{
        const result = await mongoClient.db('winemag')
            .collection('wine')
            .distinct('country')  //note: distinct returns an array
        //if i want to reverse the order: result.reverse()

        resp.status(200).type('application/json')
        resp.json(result)
    }catch(e){
        resp.status(500).type('application/json')
        resp.json({error: e})
    }   
})

//GET  /country/:country
//create query to retrieve country from wine database in mongodb - 
app.get("/country/:country", async (req, resp) => {
    let country = req.params.country
    let limitVal = parseInt(req.query.limit)
    let offsetVal = parseInt(req.query.offset)

    console.log(`limit, offset = ${limitVal}, ${offsetVal}`)
    //perform query to mongodb 
    //- get country under france using regex, return as json, sort by province
    try{
        const result = await mongoClient.db('winemag').collection('wine')   // cos .toArray returns a promise so we need to async await it
        .find({
            country: {
                $regex: country,
                $options: 'i'
            }
        }).sort({ province: 1 })
        .limit(limitVal) //input MUST BE NUMBER
        .skip(offsetVal) //skip==offset
        //get objectId as string, title of wine, price
        .project({_id: 1, title: 1, price: 1})  //_id is optional
        .toArray()

        resp.status(200).type('application/json')
        resp.json(result)
    }catch(e){
        resp.status(500).type('application/json')
        resp.json({error: e})
    }   
})

//GET /wine/:objId
app.get("/wine/:wineId", async (req, resp) => {
    let objId = req.params.wineId
    console.log("objId: ", objId)
    try{
        const result = await mongoClient.db('winemag').collection('wine')   // cos .toArray returns a promise so we need to async await it
        .find({ _id: ObjectId(`${objId}`)}) //returns a cursor object
            .toArray() //convert toArray for easy reading
        //result is [{obj}]
        console.log("wine details: ", result[0])
        
        resp.status(200).type('application/json')
        resp.json(result[0])
    }catch(e){
        resp.status(500).type('application/json')
        resp.json({error: e})
    }   


})

//here we use the promise of pool to ping
mongoClient.connect().then(
    app.listen(APP_PORT, () => {
        console.info(`Application started on port ${APP_PORT} at ${new Date()}`)
    })    
).catch(e => {
    console.error('Cannot connect to mongodb: ', e)
})
