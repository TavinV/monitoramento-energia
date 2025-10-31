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

   // Função para obter todas as medições com filtros opcionais
    async getAllMeasurements(req, res) {
        try {
            let { limit, period } = req.query;

            // Converte limit para número se existir
            limit = limit ? parseInt(limit) : null;

            // Filtro base (sem restrições)
            const filter = {};

            // Aplica filtro de período, se informado
            if (period) {
                const now = new Date();
                let startDate = null;

                switch (period) {
                    case "today":
                        startDate = new Date(now.setHours(0, 0, 0, 0));
                        break;
                    case "week":
                        startDate = new Date();
                        startDate.setDate(now.getDate() - 7);
                        break;
                    case "month":
                        startDate = new Date();
                        startDate.setMonth(now.getMonth() - 1);
                        break;
                    default:
                        startDate = null; // “all”
                }

                if (startDate) {
                    filter.timestamp = { $gte: startDate };
                }
            }

            // Consulta no banco
            let query = Measurements.find(filter).sort({ timestamp: -1 });
            if (limit) query = query.limit(limit);

            const measurements = await query;

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
