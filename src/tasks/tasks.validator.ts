import { ValidationChain, body } from 'express-validator'; 
import { Priority } from '../enums/Priority';
import { Status } from '../enums/Status';
export const createValidator: ValidationChain[] = [
   body('title')
      .not()
      .isEmpty()
      .withMessage('The task title is mandatory')
      .trim()
      .isString()
      .withMessage('The task title needs to be a string'),
   body('date')
      .not()
      .isEmpty()
      .withMessage('Date is required')
      .trim().isString()
      .withMessage('Date needs to be a valid date format'),
   body('description')
      .trim()
      .isString()
      .withMessage('Description needs to be in text format'),
   body('priority')
      .trim()
      .isIn([Priority.normal, Priority.high, Priority.low])
      .withMessage('Priority needs to be normal, high or low.'),
   body('status')
      .trim()
      .isIn([Status.todo, Status.inProgress, Status.completed])
];
