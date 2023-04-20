import { Router, Request, Response } from "express";
import { taskController } from "./tasks.controller";
import { createValidator } from "./tasks.validator";
import { validationResult } from "express-validator";
//Fire the router functiom
export const tasksRouter: Router = Router();
//Create a default route
tasksRouter.get('/tasks', taskController.getAll)

tasksRouter.post('/tasks', createValidator, 
   async (req: Request, res: Response) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         console.log(errors);
         return res.status(400).json({ errors: errors.array() });
      }
   },
);