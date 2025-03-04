import { z } from 'zod';
import { DiagnosisSchema, EntrySchema, NewEntrySchema, NewPatientSchema } from './utils';

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
};

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export type PatientWithoutSSN = Omit<Patient, 'ssn' | 'entries'>;
export type NewPatient = z.infer<typeof NewPatientSchema>;
export type Diagnosis = z.infer<typeof DiagnosisSchema>;
export type Entry = z.infer<typeof EntrySchema>;
export type NewEntry = z.infer<typeof NewEntrySchema>;

export interface Patient extends NewPatient {
  id: string,
  entries: Entry[]
}
