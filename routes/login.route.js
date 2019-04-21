import { login } from '../service/authService';
import express from 'express';
const loginRoute = express.Router();

loginRoute.post('/', (req, res) => {
    login(req.body.email, req.body.password, (err, result) => {
        if (err) {
            res.status(403).send({status:false, err: err});
        } else {
            res.send({status: true, token: result.token, user: result.user, expires: result.expires});
        }
    })
})

export default loginRoute;