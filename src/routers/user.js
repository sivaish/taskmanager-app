const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const User = require('../models/user')
const Task = require('../models/task')
const auth = require('../middlewares/auth')
const email = require('../emails/accounts')
const router = new express.Router()

//Public routers below

router.get('/users/list', async (req, res) => {

    let abc = async (x) => {
        for( const [index, value] of x.entries()) {
            taskcnt = await Task.find({ owner: value._id }).countDocuments()
            x[index] = {value, taskcnt}
        }
        return x
    }

    User.find({}).select('name').then((user) => {
        return abc(user)
    }).then((result) => {
        res.send(result)
    }).catch((e) => {
        console.log('Error in userlist promise: '+ e);
    })
    
    
})

router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        email.sendWelcomeEmail(user.email, user.name)
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send()
    }
})

//Private or Authenticate routers below

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).status
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).status
    }
})

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid operation!' })
    }

    try {
        updates.forEach((update) => {
            req.user[update] = req.body[update]
        })
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(400).send()
    }

})

router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove()
        email.sendCancelEmail(req.user.email, req.user.name)
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})

const userpic = multer({
    // dest: 'avatars',
    limits: {
        fileSize: 1000000
    }, fileFilter(req, file, cb) {

        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image - Supported files format are JPG and JPEG'))
        }

        cb(undefined, true)

    }
})

router.post('/users/me/avatar', auth, userpic.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

router.delete('/users/me/avatar', auth, userpic.single('avatar'), async (req, res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})

router.get('/users/:id/avatar', async (req, res) => {

    const _id = req.params.id

    try {
        const user = await User.findById({ _id })

        if (!user || !user.avatar) {
            throw new Error()
        }

        res.set('Content-Type', 'image/png')
        res.send(user.avatar)
    } catch (e) {
        res.status(404).send()
    }
})

module.exports = router