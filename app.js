import createError from 'http-errors';
import express, { json, urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mongoose from "mongoose";
import loginRouter from './routes/login.route';
import creditCardRouter from './routes/creditCard.route';
import contactRouter from './routes/contact.route';
import userRouter from './routes/user.route';
import transferRouter from './routes/trasnfer.route';
import transactionRoute from './routes/transaction.route';
import { jwtAuth } from './service/jwtauth';
import { DB } from './properties/config.json';
import adminUser from './data/adminUser.json';
import { create as createUser } from './service/userService';
import Cryptr from 'cryptr';
const securePass = new Cryptr('aes256');

const app = express();

mongoose.connect(DB.connString);
const db = mongoose.connection;
db.on('error', console.error.bind(console, "Erro de conexão."));

createUser(adminUser, (err, result) => {
  if (err) {
    console.error.bind(console, 'Error creating admin', err)
  } else {
    console.log('Admin user created')
  }
});

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(jwtAuth);

app.use('/login', loginRouter);
app.use('/contact', contactRouter);
app.use('/creditcard', creditCardRouter);
app.use('/user', userRouter);
app.use('/transfer', transferRouter);
app.use('/transaction', transactionRoute);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  console.log('Critical Error', err);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500).send({err: err});
});

export default app;
