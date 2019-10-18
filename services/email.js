/*
var express = require('express'),
    path = require('path'),
    nodeMailer = require('nodemailer'),
    bodyParser = require('body-parser');

var app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
var port = 3000;

export function sendForgetPasswordResetCode(to, resetCode) {
    console.log('inside sendForgetPasswordResetCode function');
    // compose subject and body
    sendEmail(to, '', '');
}

export function sendEmail(to, subject, body) {
    console.log('inside send email function');
    let transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'amarendrait@gmail.com',
            pass: '*#pinkysahoo#*'
        }
    });
    let mailOptions = {
        from: 'amarendrait@gmail.com', // sender address
        to: 'kumartech3@gmail.com', // list of receivers
        subject: 'subject', // Subject line
        text: 'body', // plain text body
        html: '<b>NodeJS Email Tutorial</b>' // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
        res.render('index');
    });
}
*/
