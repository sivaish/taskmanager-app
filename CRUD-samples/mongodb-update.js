// CRUD create read update delete

const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const ObjectID = mongodb.ObjectID

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!')
    }

    const db = client.db(databaseName)

    // db.collection('users').updateOne({
    //     _id: new ObjectID("5c9592c4c97bb042a4097dec")
    // }, {
    //         $inc:{
    //             age: 1
    //         }
    //     }).then((result) => {
    //         console.log(result);
    //     }).catch((error) => {
    //         console.log(error);
    //     })

    db.collection('task').updateMany({
        Completed: false
    }, {
            $set: {
                Completed: true
            }
        }).then((result) => {
            console.log(result);
        }).catch((error) => {
            console.log(error);

        })
})