import express from 'express';
import { verifyToken } from '../service/jwtauth';
import { find, findById, findAll, create } from '../service/transferService';
const transferRoute = express.Router();
const moment = require('moment')

transferRoute.get('/:id', (req, res) => {
    findById(req.params.id, (err, result) => {
        if (err) {
            res.status(400).send({status:false, err: err});
        } else {
            res.send({status: true, data: result});
        }
    })
})

transferRoute.get('/find/weekly/transfers', (req, res) => {
    verifyToken(req.headers.token, (err, result) => {
        let options = {
            user: result.id,
            status: 'transfered'
        };

        const sevenDaysBefore = moment().subtract(7, 'days'); 

        options.created = {
            $gte: sevenDaysBefore.toDate(), 
            $lte: moment().endOf('day').toDate()
        };
        
        find(options, (err, result) => {
            if (err) {
                res.status(400).send({status:false, err: err});
            } else {
                res.send({status: true, data: result});
            }
        })

    })
    
})


transferRoute.get('/:page/:count', (req, res) => {
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

transferRoute.post('/', (req, res) => {
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

export default transferRoute;