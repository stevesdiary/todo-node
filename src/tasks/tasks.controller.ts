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
      const newTask = new Task();
      //Add the required properties to the Task object
      newTask.title = req.body.title;
      newTask.date = req.body.date;
      newTask.description = req.body.description;
      newTask.priority = req.body.priority;
      newTask.status = req.body.status;

      //Add the new task to the Database
      let createdTask: Task;
      try {
         createdTask = await AppDataSource.getRepository(Task,).save(newTask);
         //Convert the task instance to an object
         createdTask = instanceToPlain(createdTask) as Task;
         console.log('Post created successfully');
         return res.status(201).json(createdTask);
      }catch(error){
         console.log(error);
         return res.status(500).json({error: 'Internal Server Error'});
      }
   }
}

export const taskController = new TasksController();