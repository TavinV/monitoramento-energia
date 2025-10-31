import Measurements from "../models/Measurements.js";
import { calculateMeasurement } from "../util/calculateData.js";

const MeasurementsController = {

    // Função para criar uma nova medição
    createMeasurement: async (req, res) => {
        try {
            const {voltage, current} = req.body;
            console.log("Received data:", req.body);
            const latestMeasurement = await Measurements.findOne().sort({ timestamp: -1 });
            let duration = 0;
            if (latestMeasurement) {
                duration = (Date.now() - latestMeasurement.timestamp) / 1000; // em segundos
            } else {
                duration = 0; // Valor padrão para a primeira medição
            }

            const { power, energy, cost } = calculateMeasurement({ voltage, current, duration, tariff: parseFloat(process.env.ENERGY_TARIF) });
            const newMeasurement = new Measurements({
                voltage,
                current,
                duration,
                power,
                energy,
                cost
            });

            await newMeasurement.save();
            return res.status(201).json(newMeasurement);
        } catch (error) {
            console.error("Error creating measurement:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    },

    // Função para obter todas as medições
    async getAllMeasurements(req, res) {
        try {
            const measurements = await Measurements.find().sort({ timestamp: -1 });
            return res.status(200).json(measurements);
        } catch (error) {
            console.error("Error fetching measurements:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    },

    // Função para obter a última medição
    async getLastMeasurement(req, res) {
        try {
            const lastMeasurement = await Measurements.findOne().sort({ timestamp: -1 });
            return res.status(200).json(lastMeasurement);
        } catch (error) {
            console.error("Error fetching last measurement:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    },

    // Função para deletar uma medição por ID
    async deleteMeasurement(req, res) {
        try {
            const { id } = req.params;
            await Measurements.findByIdAndDelete(id);
            return res.status(204).json({ message: "Measurement deleted successfully" });
        } catch (error) {
            console.error("Error deleting measurement:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }

};

export default MeasurementsController;
