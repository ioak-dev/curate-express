
var express = require('express'),
    path = require('path'),
    nodeMailer = require('nodemailer'),
    bodyParser = require('body-parser');

module.exports = {
    sendEmail: function(to, subject, htmlbody) {
        console.log('inside send email function');
        let transporter = nodeMailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'curate.ioak@gmail.com',
                pass: 'v1$3GLd!Y55w%J72!Xwy^EWj#'
            }
        });
        let mailOptions = {
            from: 'curate.ioak@gmail.com',
            to: to,
            subject: subject,
            html: htmlbody
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
            res.render('index');
        });
    },
    sendEmailWithAttachment: function (to, subject, htmlbody, attachments) {
        console.log('inside send email function');
        let transporter = nodeMailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'curate.ioak@gmail.com',
                pass: 'v1$3GLd!Y55w%J72!Xwy^EWj#'
            }
        });
        let mailOptions = {
            from: 'curate.ioak@gmail.com',
            to: to,
            subject: subject,
            attachments: [
                {
                    filename: 'bookmark.html',
                    content: content
                }],
            html: htmlbody
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
            res.render('index');
        });
}}

