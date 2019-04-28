const express = require('express')

require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log(`Server is up in port ${port}`);
})

const jwt = require('jsonwebtoken')

const myfunction = async() => {
    const token = jwt.sign({ _id: '12456' }, 'thisismycourse', {expiresIn: '1 days'})
    console.log(token);

    const data = jwt.verify(token, 'thisismycourse')

    console.log(data);
    
    
}

myfunction()