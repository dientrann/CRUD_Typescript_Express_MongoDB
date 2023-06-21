import express from 'express';
import { createTest, pageTest, editTest, removeTest } from '../controllers/testController';


const route = express.Router();

route.post('/add', createTest);
route.put('/edit', editTest);
route.delete('/remove', removeTest);

route.get('/', pageTest);

export = route;