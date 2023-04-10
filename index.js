import express from "express";
import multer from "multer";
import cors from "cors";
import mongoose from "mongoose";
import {
  registerValidation, loginValidation, skillCreateValidation, mediaCreateValidation, contactCreateValidation,
  factCreateValidation, projectCreateValidation
} from "./validations.js";
import {
  UserController, SkillController, MediaController, ContactController, FactController, ProjectController
} from './controllers/index.js';
import { handleValidationErrors, checkAuth } from './utils/index.js';


mongoose.connect('mongodb+srv://admin:wwwwww@cluster0.jcpn6xu.mongodb.net/portfolio?retryWrites=true&w=majority')
  .then(() => console.log('MongoDB OK'))
  .catch((err) => console.log('MongoDB error', err));

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login);
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);

app.get('/skills', SkillController.getAll);
app.post('/skills', checkAuth, skillCreateValidation, handleValidationErrors, SkillController.create);
app.delete('/skills/:id', checkAuth, SkillController.remove);
app.patch('/skills/:id', checkAuth, skillCreateValidation, handleValidationErrors, SkillController.update);

app.get('/medias', MediaController.getAll);
app.post('/medias', checkAuth, mediaCreateValidation, handleValidationErrors, MediaController.create);
app.delete('/medias/:id', checkAuth, MediaController.remove);
app.patch('/medias/:id', checkAuth, mediaCreateValidation, handleValidationErrors, MediaController.update);

app.get('/contacts', ContactController.getAll);
app.post('/contacts', checkAuth, contactCreateValidation, handleValidationErrors, ContactController.create);
app.delete('/contacts/:id', checkAuth, ContactController.remove);
app.patch('/contacts/:id', checkAuth, contactCreateValidation, handleValidationErrors, ContactController.update);

app.get('/facts', FactController.getAll);
app.post('/facts', checkAuth, factCreateValidation, handleValidationErrors, FactController.create);
app.delete('/facts/:id', checkAuth, FactController.remove);
app.patch('/facts/:id', checkAuth, factCreateValidation, handleValidationErrors, FactController.update);

app.get('/projects', ProjectController.getAll);
app.post('/projects', checkAuth, projectCreateValidation, handleValidationErrors, ProjectController.create);
app.delete('/projects/:id', checkAuth, ProjectController.remove);
app.patch('/projects/:id', checkAuth, projectCreateValidation, handleValidationErrors, ProjectController.update);


app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('Server OK');
});