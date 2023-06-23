import express from 'express';
import { createUser, infoUser, loginUser, logout } from '../controllers/userController';
import { verifyToken } from '../middleware/auth';

export const userRoute = express.Router();

userRoute.post('/login', loginUser);
userRoute.post('/register', createUser);
userRoute.get('/logout',logout);
userRoute.get('/user',verifyToken, infoUser);
