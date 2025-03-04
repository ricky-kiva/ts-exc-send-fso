interface ExerciseResult {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
};

export interface ExerciseParams {
  target: number,
  dailyExerciseHours: number[]
}

export const calculateExercises = (targetExerciseHour: number, dailyExerciseHours: number[]): ExerciseResult => {
  dailyExerciseHours.forEach((hour) => {
    if (hour < 0) throw new Error('exercise hour cannot be negative');
    if (hour > 24) throw new Error('maximum hours in a day is 24');
  });

  const periodLength = dailyExerciseHours.length;
  const trainingDays = dailyExerciseHours.filter((hour) => hour > 0).length;

  const success = (trainingDays == periodLength) 
    && dailyExerciseHours.every((hour) => (hour >= targetExerciseHour));
  
  const sumExerciseHours = dailyExerciseHours.reduce(((acc, hour) => acc + hour), 0);
  const average = sumExerciseHours / periodLength;

  const sumTargetHoursInPeriod = targetExerciseHour * periodLength;
  const dailyPerTargetPercentage = (sumExerciseHours / sumTargetHoursInPeriod) * 100;

  let rating: number;
  let ratingDescription: string;

  if (dailyPerTargetPercentage >= 100) {
    rating = 3;
    ratingDescription = 'feels good brother? keep it up you do good';
  } else if (dailyPerTargetPercentage >= 66) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else if (dailyPerTargetPercentage >= 0) {
    rating = 1;
    ratingDescription = 'you good brother? where is the dedication?';
  } else {
    throw new Error('unable to set rating for this exercise hours dataset');
  };

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target: targetExerciseHour,
    average
  };
};

const getExerciseParamsFromArgs = (args: string[]): ExerciseParams => {
  if (args.length < 4) throw new Error('not enough arguments');

  args.forEach((arg, i) => {
    if (i < 2) return;
    if (isNaN(Number(arg))) throw new Error('provided values were not numbers');
  });

  const dailyExerciseHours = args.slice(3)
    .map((arg) => Number(arg));

  return {
    target: Number(args[2]),
    dailyExerciseHours
  };
};

if (require.main === module) {
  try {
    const { target, dailyExerciseHours } = getExerciseParamsFromArgs(process.argv);
    const exerciseResult = calculateExercises(target, dailyExerciseHours);

    console.log(exerciseResult);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong';
    
    if (error instanceof Error) {
      errorMessage = `${errorMessage}: ${error.message}`;
    }
    
    console.log(errorMessage);
  }
}
