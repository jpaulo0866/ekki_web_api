import express from 'express';
import { verifyToken } from '../service/jwtauth';
import { getBalance } from '../service/transactionService';
const transactionRoute = express.Router();

transactionRoute.get('/mybalance', (req, res) => {
    verifyToken(req.headers.token, (err, result) => {
        getBalance(result.id, (err, result) => {
            if (err) {
                res.status(400).send({status:false, err: err});
            } else {
                res.send({status: true, data: result});
            }
        })
    })
})

export default transactionRoute;