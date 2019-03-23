// CRUD create read update delete

const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!')
    }

    const db = client.db(databaseName)

// --> Insert one
    // db.collection('users').insertOne({
    //     name: 'Ishaan',
    //     age: 3
    // }, (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert user')
    //     }
    //     console.log(result.insertedCount);
    // })

// --> Inser Many
    db.collection('users').insertMany([
        {
            name: 'Nick',
            age: 18

        },
        {
            name: 'Bellick',
            age: 3
        }
    ], (error, result) => {
        if (error) {
            return console.log('Unable to insert documents into user collection');
        }
        console.log(result.insertedIds);
    })

})