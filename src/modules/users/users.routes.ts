import express, { Request, Response }from 'express';
import { usersController } from './users.controller';





const router = express.Router();


router.post("/", usersController.createUser);
router.get("/", usersController.getUser);
router.get("/:id", usersController.getSingel);
router.put("/:id", usersController.updateUser);
router.delete("/:id", usersController.deleteUser);


export const userRoute = router;