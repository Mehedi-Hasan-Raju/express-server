import { Request, Response } from "express";
import { todosService } from "./todos.service";

const createTodo = async (req: Request, res: Response) => {
    const { user_id, title } = req.body;

    try {
        const result = await todosService.createTodo( user_id, title );
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
        });
    }
};

const getAll = async(req:Request, res:Response)=> {
    try{
        const result = await todosService.getAll();

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
}

const updateTodo = async (req: Request, res: Response) => {
    const { title } = req.body;
    const { id } = req.params;

    try {
        const result = await todosService.updateTodo(title, id as string);

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
}

const deleteTodo = async (req: Request, res: Response) => {
    try {
        const result = await todosService.deleteTodo(req.params.id as string);

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
}

export const todosController = {
    createTodo,getAll,updateTodo,deleteTodo,
}