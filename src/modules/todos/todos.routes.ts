import express, { Request, Response }from 'express';
import { todosController } from "./todos.controller";


const router = express.Router();

router.post("/", todosController.createTodo);
router.get("/", todosController.getAll);
router.put("/:id",todosController.updateTodo);
router.delete("/:id", todosController.deleteTodo);





export const todosroutes = router;