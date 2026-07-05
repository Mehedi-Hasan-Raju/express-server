import express, {Request, Response } from 'express';
import{Pool} from 'pg';
import dotenv from 'dotenv';
import path from 'path/win32';

dotenv.config({path: path.join(process.cwd(), ".env" )});

const app = express()
const port = 5000


//DB
const pool = new Pool({
    connectionString: `${process.env.CONNECTION_STR}`,
})

const initDB = async () => {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            age INT,
            phone VARCHAR(20),
            address TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS todos(
            id SERIAL PRIMARY KEY,
            user_id INT REFERENCES users(id) ON DELETE CASCADE,
            title VARCHAR(255) NOT NULL,
            description TEXT,
            completed BOOLEAN DEFAULT false,
            due_date DATE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`);
};

initDB();


//parser
app.use(express.json());

app.get('/', (req:Request, res:Response) => {
  res.send('Hello Raju!')
})

app.post('/', (req:Request, res:Response)=>{
   console.log(req.body);

   res.status(201).json({
    success: true,
    message: 'Data submitted successfully'
   });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})