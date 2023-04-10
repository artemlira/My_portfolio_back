import { body } from 'express-validator';

export const loginValidation = [
  body('email', 'Неверный формат почты').isEmail(),
  body('password', 'Пароль должен быть не менее 5 символов').isLength({ min: 5 }),
];

export const registerValidation = [
  body('email', 'Неверный формат почты').isEmail(),
  body('password', 'Пароль должен быть не менее 5 символов').isLength({ min: 5 }),
  body('fullName', 'Укажите имя').isLength({ min: 3 }),
  body('avatarUrl', 'Неверная ссылка на аватарку').optional().isURL(),
];

export const skillCreateValidation = [
  body('categoryEN', 'Enter a category').isLength({ min: 3 }).isString(),
  body('categoryUA', 'Введите категорию').isLength({ min: 3 }).isString(),
  body('value', 'Укажите значения').isArray(),
];

export const mediaCreateValidation = [
  body('name', 'Введите имя соц. сети').isLength({ min: 3 }).isString(),
  body('link', 'Неверная ссылка на соц. сеть').isURL(),
  body('icon', 'Неверная ссылка на иконку').isURL(),
];

export const contactCreateValidation = [
  body('name', 'Введите название контакта').isLength({ min: 3 }).isString(),
  body('value', 'Неверное значене контакта').isLength({ min: 3 }).isString(),
  body('icon', 'Неверная ссылка на контакт').isURL(),
];