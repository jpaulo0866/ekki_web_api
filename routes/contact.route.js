import express from 'express';
import { create as createUser } from '../service/userService';
import { findById, findAll, create, update, remove } from '../service/contactService';

const contactRoute = express.Router();

contactRoute.get('/:id', (req, res) => {
    findById(req.params.id, (err, result) => {
        if (err) {
            res.status(400).send({status:false, err: err});
        } else {
            res.send({status: true, data: result});
        }
    })
})

contactRoute.get('/:page/:count', (req, res) => {
    findAll(parseInt(req.params.page), parseInt(req.params.count), (err, result) => {
        if (err) {
            res.status(400).send({status:false, err: err});
        } else {
            res.send({status: true, data: result});
        }
    })
})

contactRoute.post('/', (req, res) => {
    createUser({
        email: req.body.email,
        password: 'default01',
        name: req.body.name
    }, (err, result) => {
        req.body.user = result._id;
        create(req.body, (err, result) => {
            if (err) {
                res.status(400).send({status:false, err: err});
            } else {
                res.send({status: true, data: result});
            }
        })
    })
    
})

contactRoute.put('/', (req, res) => {
    update(req.body, (err, result) => {
        if (err) {
            res.status(400).send({status:false, err: err});
        } else {
            res.send({status: true, data: result});
        }
    })
})

contactRoute.delete('/:id', (req, res) => {
    remove(req.params.id, (err, result) => {
        if (err) {
            res.status(400).send({status:false, err: err});
        } else {
            res.send({status: true, data: result});
        }
    })
})

export default contactRoute;