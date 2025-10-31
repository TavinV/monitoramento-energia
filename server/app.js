import express from 'express';
import dotenv from 'dotenv';
import measurementsRoutes from './routes/MeasurementRoutes.js';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/measurements', measurementsRoutes);

export default app;
