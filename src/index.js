const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

// Middleware section
//
// new request -> do something -> run route handler
//
// app.use((req, res, next) => {
//     if (req.method === 'GET') {
//         res.send('GET request needs authentication')
//     } else {
//         next()
//     }
// })

// app.use((req, res, next) => {
//     res.status(503).send('Site under maintenance - Check back soon')
// })

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log(`Server is up in port ${port}`);
})

// const Task = require('./models/task')
// const User = require('./models/user')

// const main = async () => {
//     // const task = await Task.findById('5cc78ceffaaad92e9070c33b')
//     // await task.populate('owner').execPopulate()
//     // console.log(task);
//     // console.log(task.owner);
    
//     const user = await User.findById('5cc78cb5faaad92e9070c339')
//     await user.populate('tasks').execPopulate()
//     console.log(user);
//     console.log(user.tasks);
// }

// main()