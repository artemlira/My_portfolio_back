import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

import { registerValidation } from "./validations/auth.js";

mongoose.connect('mongodb+srv://artem:artem8887@cluster0.tpn5ogm.mongodb.net/?retryWrites=true&w=majority')
  .then(() => console.log('MongoDB OK'))
  .catch((err) => console.log('MongoDB error', err));

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('111 Hello Artem!');
});

app.post('/auth/register', registerValidation, (req, res) => {

});

// app.post('/auth/login', (req, res) => {

//   const token = jwt.sign({
//     email: req.body.email,
//     fullName: 'Artem Lira',
//   },
//     'secret123',
//   );
//   res.json({
//     success: true,
//     token,
//   })
// });

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log('Server OK');
});