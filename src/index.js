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