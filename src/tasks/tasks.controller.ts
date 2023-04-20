// import { AppDataSource } from '../../index';
import { Task } from './tasks.entity';
import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { AppDataSource } from '../..';

class TasksController {
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
}

export const taskController = new TasksController();