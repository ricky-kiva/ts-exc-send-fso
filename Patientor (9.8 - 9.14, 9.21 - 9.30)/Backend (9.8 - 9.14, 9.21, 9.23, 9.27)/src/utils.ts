import { Gender, HealthCheckRating } from "./types";
import { z } from 'zod';

export const DiagnosisSchema = z.object({
  code: z.string(),
  name: z.string(),
  latin: z.string().optional()
});

const BaseEntrySchema = z.object({
  id: z.string(),
  description: z.string(),
  date: z.string().date(),
  specialist: z.string(),
  diagnosisCodes: z.array(DiagnosisSchema.shape.code).optional()
});

const HospitalEntrySchema = BaseEntrySchema.extend({
  discharge: z.object({
    date: z.string().date(),
    criteria: z.string()
  }),
  type: z.literal('Hospital')
});

const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
  employerName: z.string(),
  sickLeave: z
    .object({
      startDate: z.string().date(),
      endDate: z.string().date()
    })
    .optional(),
  type: z.literal('OccupationalHealthcare')
});

const HealthCheckEntrySchema = BaseEntrySchema.extend({
  healthCheckRating: z.nativeEnum(HealthCheckRating),
  type: z.literal('HealthCheck')
});

export const EntrySchema = z.discriminatedUnion('type', [
  HospitalEntrySchema,
  OccupationalHealthcareEntrySchema,
  HealthCheckEntrySchema
]);

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string().regex(/^\d{6}[-A+]\d{2,4}[A-Z]?$/),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
  entries: z.array(EntrySchema).default([])
});

export const NewEntrySchema = z.discriminatedUnion('type', [
  HospitalEntrySchema.omit({ id: true }),
  OccupationalHealthcareEntrySchema.omit({ id: true }),
  HealthCheckEntrySchema.omit({ id: true })
]);
