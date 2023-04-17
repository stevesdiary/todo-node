import { Router, Request, Response } from "express";

//Fire the router functiom
export const tasksRouter: Router = Router();
//Create a default route
tasksRouter.get('/tasks', (req: Request, res: Response) => {
   res.send('Express + Typescript Server');
});