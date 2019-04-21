import express from 'express';
import { verifyToken } from '../service/jwtauth';
import { findById, findAll, create, update, remove } from '../service/creditCardService';

const creditCardRoute = express.Router();

creditCardRoute.get('/:id', (req, res) => {
    findById(req.params.id, (err, result) => {
        if (err) {
            res.status(400).send({status:false, err: err});
        } else {
            res.send({status: true, data: result}); 
        }
    })
})

creditCardRoute.get('/:page/:count', (req, res) => {
    verifyToken(req.headers.token, (err, result) => {
        findAll(parseInt(req.params.page), parseInt(req.params.count), result.id, (err, result) => {
            if (err) {
                res.status(400).send({status:false, err: err});
            } else {
                res.send({status: true, data: result});
            }
        })
    })
    
})

creditCardRoute.post('/', (req, res) => {
    verifyToken(req.headers.token, (err, result) => {
        req.body.user = result.id;
        create(req.body, (err, result) => {
            if (err) {
                res.status(400).send({status:false, err: err});
            } else {
                res.send({status: true, data: result});
            }
        })
    })
    
})

creditCardRoute.put('/', (req, res) => {
    update(req.body, (err, result) => {
        if (err) {
            res.status(400).send({status:false, err: err});
        } else {
            res.send({status: true, data: result});
        }
    })
})

creditCardRoute.delete('/:id', (req, res) => {
    remove(req.params.id, (err, result) => {
        if (err) {
            res.status(400).send({status:false, err: err});
        } else {
            res.send({status: true, data: result});
        }
    })
})

export default creditCardRoute;