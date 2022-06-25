PORT = 8000

cors = require('cors')

express = require('express')
app = express()
app.use(cors())
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const MongoClient = require('mongodb').MongoClient
require('dotenv').config()

let db,
    infoCollection,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'test';
    
MongoClient.connect(dbConnectionStr)
    .then(client => {
        console.log('we in boys')
        db = client.db(dbName)
        infoCollection = db.collection('futurama')
    })

infoCollection.find().toArray()
    .then(data => {
        console.log(data)
    })
    .catch(err => console.error(err))

app.listen(PORT, () => {
    console.log(`running on port ${PORT}`)
})