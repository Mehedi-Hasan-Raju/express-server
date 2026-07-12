import express, {Request, Response } from 'express';
import initDB, { pool } from './config/db';
import config from './config';
import logger from './middleware/logger';
import { userRoute } from './modules/users/users.routes';



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
app.use("/users", userRoute)
app.get('/users/', userRoute)
app.put('/users/', userRoute)
app.delete('/users/', userRoute)


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

// update todo title
app.put('/todos/:id', async (req: Request, res: Response) => {
    const { title } = req.body;
    const { id } = req.params;

    try {
        const result = await pool.query(
            `UPDATE todos SET title = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *`,
            [title, id]
        );

        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: 'todo not found',
            });
        } else {
            res.status(200).json({
                success: true,
                message: 'todo title updated successfully',
                data: result.rows[0],
            });
        }
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
            details: err,
        });
    }
});


// delete todo
app.delete('/todos/:id', async (req: Request, res: Response) => {
    try {
        const result = await pool.query(
            `DELETE FROM todos WHERE id = $1 RETURNING *`,
            [req.params.id]
        );

        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: 'todo not found',
            });
        } else {
            res.status(200).json({
                success: true,
                message: 'todo deleted successfully',
                data: null,
            });
        }
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
            details: err,
        });
    }
});
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