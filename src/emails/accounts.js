const sgMail = require('@sendgrid/mail')
require('dotenv').config()

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const customeEmail = 'lone.wolves@outlook.com'

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: customeEmail,
        subject: 'Welcome to Task Manager App',
        text: `Welcome to the app ${name}. Let me know how you get along with the app.`
    })
}

const sendCancelEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: customeEmail,
        subject: 'Losted a valued customer',
        text: `Dear ${name}, Is there anything would we have done to kept you onboard?`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelEmail
}