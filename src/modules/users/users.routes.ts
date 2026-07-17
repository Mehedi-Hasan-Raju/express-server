import express, { Request, Response }from 'express';
import { usersController } from './users.controller';
import logger from '../../middleware/logger';
import auth from '../../middleware/auth';





const router = express.Router();


router.post("/", usersController.createUser);
router.get("/", logger, auth(), usersController.getUser);
router.get("/:id", usersController.getSingel);
router.put("/:id", usersController.updateUser);
router.delete("/:id", usersController.deleteUser);


export const userRoute = router;