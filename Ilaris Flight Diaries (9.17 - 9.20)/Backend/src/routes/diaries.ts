import express, { NextFunction, Response, Request } from 'express';
import diaryService from '../services/diaryService';
import { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry } from '../types';
import { NewEntrySchema } from '../utils';
import z from 'zod';

const diaryRouter = express.Router();

const newDiaryParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewEntrySchema.parse(req.body);
    next();
  } catch (e: unknown) {
    next(e);
  }
};

diaryRouter.get('/', (_req, res: Response<NonSensitiveDiaryEntry[]>) => {
  res.send(diaryService.getNonSensitiveEntries());
});

diaryRouter.post('/', newDiaryParser, (
  req: Request<unknown, unknown, NewDiaryEntry>,
  res: Response<DiaryEntry>
) => {
  const addedEntry = diaryService.addDiary(req.body);
  res.json(addedEntry);
});

diaryRouter.get('/:id', (req, res) => {
  let id: number;

  try {
    id = Number(req.params.id);
  } catch(e: unknown) {
    res.sendStatus(404);
    console.log(`Something's wrong: ${e}`);
    
    return;
  }

  const diary = diaryService.findById(Number(id));

  if (!diary) {
    res.sendStatus(404);
    return;
  }
  
  res.send(diary);
});

const errorMiddleWare = (e: unknown, _req: Request, res: Response, next: NextFunction) => {
  if (e instanceof z.ZodError) {
    res.status(400).send({ error: e.issues });
    return;
  }

  next(e);
};

diaryRouter.use(errorMiddleWare);

export default diaryRouter;
