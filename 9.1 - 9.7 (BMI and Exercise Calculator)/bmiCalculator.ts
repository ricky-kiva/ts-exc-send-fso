interface BmiCalculatorArgs {
  height: number;
  weight: number;
}

const calculateBmi = (height: number, weight: number): string => {
  const heightInMeter = (height / 100);
  const bmi = weight / (heightInMeter * heightInMeter);

  switch(true) {
    case bmi < 16:
      return 'Underweight (Severe thinness)';
    case bmi >= 16 && bmi <= 16.9:
      return 'Underweight (Moderate thinness)';
    case bmi >= 17.0 && bmi <= 18.4:
      return 'Underweight (Mild thinness)';
    case bmi >= 18.5 && bmi <= 24.9:
      return 'Normal range';
    case bmi >= 25.0 && bmi <= 29.9:
      return 'Overweight (Pre-obese)';
    case bmi >= 30.0 && bmi <= 34.9:
      return 'Obese (Class I)';
    case bmi >= 35.0 && bmi <= 39.9:
      return 'Obese (Class II)';
    case bmi >= 40.0:
      return 'Obese (Class III)';
    default:
      throw new Error('an error occured while calculating the BMI');
  }
};

const getBmiCalculatorArgs = (args: string[]): BmiCalculatorArgs => {
  if (args.length < 4) throw new Error('not enough arguments');
  if (args.length > 4) throw new Error('too many arguments');

  args.forEach((arg, i) => {
    if (i < 2) return;
    if (isNaN(Number(arg))) throw new Error('provided values were not numbers');
  });

  return {
    height: Number(args[2]),
    weight: Number(args[3])
  };
};

if (require.main === module) {
  try {
    const { height, weight } = getBmiCalculatorArgs(process.argv);
    const bmi = calculateBmi(height, weight);
    console.log(bmi);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong';
    if (error instanceof Error) {
      errorMessage = `${errorMessage}: ${error.message}`;
    }
    console.log(errorMessage);
  }
}

export default calculateBmi;
