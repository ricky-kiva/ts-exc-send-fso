import { Visiblity, Weather } from "./types";
import z from 'zod';

export const NewEntrySchema = z.object({
  weather: z.nativeEnum(Weather),
  visibility: z.nativeEnum(Visiblity),
  date: z.string().date(),
  comment: z.string().optional()
});
