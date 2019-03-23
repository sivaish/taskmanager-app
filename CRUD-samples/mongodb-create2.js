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

// --> Insert Many
    db.collection('task').insertMany([
        {
            Description: 'Learning Nodejs',
            Completed: false

        },
        {
            Description: 'Learn JavaScript',
            Completed: true
        },
        {
            Description: 'Learn ES6 functionalities',
            Completed: false
        }
    ], (error, result) => {
        if (error) {
            return console.log('Unable to insert documents into task collection');
        }
        console.log(result.ops);
    })

})