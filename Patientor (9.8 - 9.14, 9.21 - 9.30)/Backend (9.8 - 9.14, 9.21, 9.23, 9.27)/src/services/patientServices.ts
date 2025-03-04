import patients from "../../data/patients";
import { Entry, NewEntry, NewPatient, Patient, PatientWithoutSSN } from "../types";
import { v1 as uuid } from 'uuid';

const getPatients = (): Patient[] => patients;

const getPatientsWithoutSSN = (): PatientWithoutSSN[] => patients.map(
  (p) => ({ 
    id: p.id,
    name: p.name,
    dateOfBirth: p.dateOfBirth,
    gender: p.gender,
    occupation: p.occupation
   })
);

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    ...patient,
    id: uuid(),
    entries: []
  };

  patients.push(newPatient);
  
  return newPatient;
};

const addEntry = (patientId: string, entry: NewEntry): Entry | undefined => {
  const patient = patients.find(p => p.id === patientId);
  if (!patient) return undefined;

  const newEntry = {
    ...entry,
    id: uuid()
  };

  patient.entries.push(newEntry);

  return newEntry;
};

const findPatientById = (id: string): Patient | undefined => {
  const patient = patients.find(p => p.id === id);

  if (!patient) return undefined;

  return {
    ...patient,
    entries: patient.entries ?? []
  };
};

export default {
  getPatients,
  getPatientsWithoutSSN,
  addPatient,
  findPatientById,
  addEntry
};
