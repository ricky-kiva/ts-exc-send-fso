import diagnoses from "../../data/diagnoses";
import { Diagnosis } from "../types";

const getDiagnoses = (): Diagnosis[] => diagnoses;

export default {
  getDiagnoses
};
