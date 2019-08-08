import express from 'express';
const AuthController = express.Router();
import User from '../model/User';

AuthController.route('/auth')
    .get((req, res) => {
        User.find({}, (err, users) => {
            res.json(users);
        });
    });

export default AuthController;