// import { AppDataSource } from '../../index';
import { Task } from './tasks.entity';
import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { AppDataSource } from '../..';
import { validationResult } from 'express-validator';

class TasksController {
   //Method for the get route

   public async getAll(req: Request, res: Response): Promise<Response>{
      //Decalre a variable to hold all tasks
      let allTasks: Task[];
      //Fetch all tasks using the repository
      try{
         allTasks = await AppDataSource.getRepository(
            Task,
         ).find({
         order: {
            date: 'ASC',
         },
      });
      //Convert the tasks instance to an array of  objects
      allTasks = instanceToPlain(allTasks) as Task[];
      
      return res.json(allTasks).status(200);
      }catch(errors){
         console.log('Message: ', errors);
         return res.status(500).json({error: 'Internal server error'});
      }
   }

   //Method for the post route
   public async create(req: Request, res: Response): Promise<Response>{
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
      console.log(errors);
      return res
         .status(400)
         .json({ errors: errors.array() });
      }
      //Create instance of the Task



      //Add the required properties to the Task object


      //Add the new task to the Database
   }
}

export const taskController = new TasksController();