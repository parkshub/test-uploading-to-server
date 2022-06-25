// if you want this to work you have to manually input "type": "module" in your package.json
// there could be other ways, but fetch wouldn't work
// the below 'imports blah1 from blah2' is the same as const blah1 = require('blah2')

import fetch from 'node-fetch'
import dotenv from 'dotenv'
import {MongoClient} from 'mongodb'
dotenv.config()

async function getIt() {
    try {
        const response = await fetch('https://futuramaapi.herokuapp.com/api/quotes')
        const data = await response.json()
        return data
    } catch(e) {
        console.error(e)
    }
}

const docs = await getIt()

console.log(docs)

async function main() {    

    const client = new MongoClient(process.env.DB_STRING)
    
    try {
        await client.connect();
        const db = client.db('test')
        const infoCollection = db.collection('futurama')
        await infoCollection.insertMany(docs)
    } catch (e) {
        console.error(e)
    
    } finally {
        console.log('all done. closing')
        await client.close()
    }
}

main().catch(console.error)