import express, {Request, Response } from 'express';
import initDB, { pool } from './config/db';
import config from './config';
import logger from './middleware/logger';
import { userRoute } from './modules/users/users.routes';
import { todosroutes } from './modules/todos/todos.routes';



const app = express()
const port = config.port;


//initialize database
initDB();


//parser
app.use(express.json());

app.get('/', logger,(req:Request, res:Response) => {
  res.send('Hello Raju!')
})
//user CRUD

app.use('/users', userRoute)



//todo CRUD
app.use('/todos',todosroutes)



app.use((req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
        path: req.originalUrl,
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})