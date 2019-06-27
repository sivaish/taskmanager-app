// Configuration file
if (process.env.npm_lifecycle_event === 'dev' || process.env.npm_lifecycle_event === 'start' ) {
    require('dotenv').config({ path: './config/dev.env' })
} else if (process.env.npm_lifecycle_event === 'qa') {
    require('dotenv').config({ path: './config/dev.env' })
} else {
    require('dotenv').config({ path: './config/dev.env' })
}

const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(process.env.PORT, () => {
    console.log(`Server is up in port ${process.env.PORT}`);
})