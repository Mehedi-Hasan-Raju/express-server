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
//loger middleware

const logger = (req: Request, res: Response, next: express.NextFunction) =>{
    console.log(`${new Date().toISOString()} ${req.method} ${req.path}\n`)
    next();
}

//parser
app.use(express.json());

app.get('/', logger,(req:Request, res:Response) => {
  res.send('Hello Raju!')
})
//user CRUD
app.post('/users', async (req:Request, res:Response)=>{
    const {name, email} = req.body;

    try{
        const result = await pool.query(`INSERT INTO users(name, email) VALUES($1, $2) RETURNING *`,[name, email]);
        // console.log(result.rows[0]);
        
        res.status(201).json({
            success: true,
            message: 'data inserted successfully',
            data: result.rows[0]
        })
       
        
    }catch(err: any){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
});

app.get('/users', async(req:Request, res:Response)=> {
    try{
        const result = await pool.query(`SELECT * FROM users`);

        res.status(200).json({
            success: true,
            message: 'user data fetched successfully',
            data: result.rows,
        })

    }catch(err: any){
        res.status(500).json({
            success: false,
            message: err.message,
            details: err,
        })
    }
})

app.get('/users/:id', async(req : Request, res: Response) =>{
    // console.log(req.params.id);
   try{
    const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [req.params.id]);
    if(result.rows.length === 0 ){
        res.status(404).json({
            success: false,
            message: 'user not found',
        })
    }else{
        res.status(200).json({
            success: true,
            message: 'user data fetched successfully',
            data: result.rows[0]
        })
    }
   }catch(err:any){
        res.status(500).json({
            success: false,
            message: err.message,
            details: err,
        })
   }
})

app.put('/users/:id', async(req : Request, res: Response) =>{
    // console.log(req.params.id);
    const {name, email} = req.body;
   try{
    const result = await pool.query(`UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *`, [name, email, req.params.id]);
    if(result.rows.length === 0 ){
        res.status(404).json({
            success: false,
            message: 'user not found',
        })
    }else{
        res.status(200).json({
            success: true,
            message: 'user data updated successfully',
            data: result.rows[0]
        })
    }
   }catch(err:any){
        res.status(500).json({
            success: false,
            message: err.message,
            details: err,
        })
   }
})

app.delete('/users/:id', async(req : Request, res: Response) =>{
    // console.log(req.params.id);
   try{
    const result = await pool.query(`DELETE FROM users WHERE id = $1 RETURNING *`, [req.params.id]);
    if(result.rows.length === 0 ){
        res.status(404).json({
            success: false,
            message: 'user not found',
        })
    }else{
        res.status(200).json({
            success: true,
            message: 'user data deleted successfully',
            data: null,
        })
    }
   }catch(err:any){
        res.status(500).json({
            success: false,
            message: err.message,
            details: err,
        })
   }
})

//todo CRUD
app.post('/todos', async (req: Request, res: Response) => {
    const {user_id, title} = req.body;

    try{
        const result = await pool.query(`INSERT INTO todos(user_id, title) VALUES($1, $2) RETURNING * `,[user_id, title]);
        res.status(201).json({
            success: true,
            message: 'todo created successfully',
            data: result.rows[0]
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
            details: err,
        })
    }
})

app.get('/todos', async(req:Request, res:Response)=> {
    try{
        const result = await pool.query(`SELECT * FROM todos`);

        res.status(200).json({
            success: true,
            message: 'todo data fetched successfully',
            data: result.rows,
        })

    }catch(err: any){
        res.status(500).json({
            success: false,
            message: err.message,
            details: err,
        })
    }
})

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