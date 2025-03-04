import express, { Response } from 'express';
import diaryService from '../services/diagnoseServices';
import { Diagnosis } from '../types';

const diagnoseRouter = express.Router();

diagnoseRouter.get('/', (_req, res: Response<Diagnosis[]>) => {
  res.send(diaryService.getDiagnoses());
});

export default diagnoseRouter;
