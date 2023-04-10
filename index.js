import express from "express";
import mongoose from "mongoose";
import { registerValidation, loginValidation, skillCreateValidation } from "./validations.js";
import checkAuth from "./utils/checkAuth.js";
import * as UserController from './controllers/UserController.js';
import * as SkillController from './controllers/SkillController.js';


mongoose.connect('mongodb+srv://admin:wwwwww@cluster0.jcpn6xu.mongodb.net/portfolio?retryWrites=true&w=majority')
  .then(() => console.log('MongoDB OK'))
  .catch((err) => console.log('MongoDB error', err));

const app = express();

app.use(express.json());

app.post('/auth/login', loginValidation, UserController.login);
app.post('/auth/register', registerValidation, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);

app.get('/skills', SkillController.getAll);
app.post('/skills', checkAuth, skillCreateValidation, SkillController.create);
app.delete('/skills/:id', checkAuth, SkillController.remove);
app.patch('/skills/:id', checkAuth, SkillController.update);


app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('Server OK');
});