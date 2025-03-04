import express from 'express';
import calculateBmi from './bmiCalculator';
import { calculateExercises, ExerciseParams } from './exerciseCalculator';

interface ExerciseNetworkModel {
  target: number,
  daily_exercises: number[]
}

const app = express();
const PORT = 3003;

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    if (isNaN(height) || isNaN(weight)) {
      res.status(400).send({ error: "malformatted parameters" });
      return;
    }

    const bmi = calculateBmi(height, weight);

    res.send({ weight, height, bmi });
  } catch (e: unknown) {
    res.status(400).send('Sorry, there\'s an error calculating the BMI!');
    if (e instanceof Error) console.log(e);
  }
});

app.post('/exercises', (req, res) => {
  let exerciseParams: ExerciseParams;

  try {
    const body = req.body as ExerciseNetworkModel;

    if (!body.daily_exercises || !body.target) {
      res.status(400).send({ error: 'parameters missing' });
      return;
    }

    const isDailyExercisesArrayOfNumbers = body.daily_exercises
      .every(item => typeof item === 'number');

    if (!isDailyExercisesArrayOfNumbers || typeof body.target !== 'number') {
      res.status(400).send({ error: 'malformatted parameters' });
      return;
    }

    exerciseParams = {
      dailyExerciseHours: body.daily_exercises,
      target: body.target
    };
  } catch(_e: unknown) {
    res.status(400).send({ error: 'malformatted parameters' });
    return;
  }

  try {
    const result = calculateExercises(exerciseParams.target, exerciseParams.dailyExerciseHours);
    res.send(result);
  } catch(e: unknown) {
    if (e instanceof Error) {
      if (e.message === 'exercise hour cannot be negative'
        || e.message === 'maximum hours in a day is 24') {
        res.status(400).send({ error: 'malformatted parameters' });
        return;
      } else {
        console.log(e);
      }
    }
    
    res.status(400).send('Sorry, there\'s an error calculating the BMI!');
  }

  const result = calculateExercises(exerciseParams.target, exerciseParams.dailyExerciseHours);
  res.send(result);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
