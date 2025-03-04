import z from 'zod';
import { NewEntrySchema } from './utils';

export enum Weather {
  Sunny = 'sunny',
  Rainy = 'rainy',
  Cloudy = 'cloudy',
  Windy = 'windy',
  Stormy = 'stormy'
};

export enum Visiblity {
  Great = 'great',
  Good = 'good',
  OK = 'ok',
  Poor = 'poor'
};

export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>;
export type NewDiaryEntry = z.infer<typeof NewEntrySchema>;

export interface DiaryEntry extends NewDiaryEntry {
  id: number
};
