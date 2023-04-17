import express, {Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { Task } from './src/tasks/tasks.entity';
import cors from 'cors';
import bodyParser from 'body-parser';
import { DataSource } from 'typeorm';
const app: Express = express();
dotenv.config();
app.use(bodyParser.json());
app.use(cors());
const port  = process.env.PORT
//Create Database Connection
export const AppDataSource = new DataSource( {
   type: 'mysql',
   host: process.env.HOST,
   port: 3306,
   username: process.env.MYSQL_USER,
   password: process.env.MYSQL_PASSWORD,
   database: process.env.MYSQL_DB,
   entities: [ Task ],
   synchronize: true,
});


app.get('/', (req: Request, res: Response) => {
   res.send("Express + Typescript Server");
})

AppDataSource.initialize()
   .then(() => {
   app.listen(port);
   console.log("Database connection established!");
})
   .catch((err)=> {
   console.error( 'Error during DataSource initialization', err)
   })


