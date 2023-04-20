import { Router, Request, Response } from "express";
import { TasksController } from "./tasks.controller";
import { createValidator } from "./tasks.validator";
import { validationResult } from "express-validator";
//Fire the router functiom
export const tasksRouter: Router = Router();
//Create a default route
tasksRouter.get('/tasks', async (req: Request, res: Response) => {
   const taskController = new TasksController();
   const allTasks = await taskController.getAll();
   res.status(200).json(allTasks);
});

tasksRouter.post('/tasks', createValidator, async (req:Request, res: Response) => {
   const errors = validationResult(req);
   // const taskController = new TasksController();

   if(!errors.isEmpty()){
      return res.status(400).json({errors: errors.array()});
   }
});