import express, { NextFunction, Request, Response } from 'express';
import patientServices from '../services/patientServices';
import { Entry, NewEntry, NewPatient, Patient, PatientWithoutSSN } from '../types';
import { NewEntrySchema, NewPatientSchema } from '../utils';
import { z } from 'zod';

const patientRouter = express.Router();

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewPatientSchema.parse(req.body);
    next();
  } catch (e: unknown) {
    next(e);
  }
};

const newEntryParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewEntrySchema.parse(req.body);
    next();
  } catch (e: unknown) {
    next(e);
  }
};

patientRouter.get('/', (_req, res: Response<PatientWithoutSSN[]>) => {
  res.send(patientServices.getPatientsWithoutSSN());
});

patientRouter.get('/:id', (req, res: Response<Patient>) => {
  const patient = patientServices.findPatientById(req.params.id);

  if (!patient) {
    res.sendStatus(404);
    return;
  }

  res.send(patient);
});

patientRouter.post('/', newPatientParser, (
  req: Request<unknown, unknown, NewPatient>,
  res: Response<Patient>
) => {
  const addedPatient = patientServices.addPatient(req.body);
  res.json(addedPatient);
});

patientRouter.post('/:id/entries', newEntryParser, (
  req: Request<{ id: string }, unknown, NewEntry>,
  res: Response<Entry>
) => {
  const addedEntry = patientServices.addEntry(req.params.id, req.body);
  res.json(addedEntry);
});

const errorMiddleWare = (e: unknown, _req: Request, res: Response, next: NextFunction) => {
  if (e instanceof z.ZodError) {
    res.status(400).send({ error: e.issues });
    return;
  }

  if (e instanceof Error) res.status(400).send({ error: e.message });

  next(e);
};

patientRouter.use(errorMiddleWare);

export default patientRouter;
