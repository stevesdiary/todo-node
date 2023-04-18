import { Router, Request, Response } from "express";
import { TasksController } from "./tasks.controller";

//Fire the router functiom
export const tasksRouter: Router = Router();
//Create a default route
tasksRouter.get('/tasks', async (req: Request, res: Response) => {
   const taskController = new TasksController();
   const allTasks = await taskController.getAll();
   res.status(200).json(allTasks);
});
tasksRouter.post('/tasks', async (req:Request, res: Response) => {
   const taskController = new TasksController();
});