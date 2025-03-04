import express from 'express';
import cors from 'cors';
import diagnoseRouter from './routes/diagnoseRoutes';
import patientRouter from './routes/patientRoutes';

const PORT = 3001;
const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/diagnoses', diagnoseRouter);
app.use('/api/patients', patientRouter);

app.get('/api/ping', (_req, res) => {
  res.send('pong!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
