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

    db.collection('task').findOne( { _id: new ObjectID("5c95944ba0580f0bb8725fde") }, (error, userresult) => {
        if(error){
            return console.log('Unable to fetch element from the task collection');
        }
        console.log(userresult);
    })

    db.collection('task').find( {Completed: false} ).toArray( (error, resultusers) => {
        if(error){
            return console.log('Unable to fetch element from the task collection');
        }
        console.log(resultusers);
    })

})