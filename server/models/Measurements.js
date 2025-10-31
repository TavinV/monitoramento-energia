import mongoose from "mongoose";

const MeasurementSchema = new mongoose.Schema({
    voltage: {
        type: Number,
        required: true,           // Tensão:  Enviado pelo ESP32
    },
    current: {
        type: Number,
        required: true,           // Corrente: Enviado pelo ESP32
    },
    power: {
        type: Number,
        required: true,           // Potência instantânea: Calculado: V × I
    },
    duration: {
        type: Number,             // Calculado: tempo em segundos desde a última medição
        required: true,
    },
    energy: {
        type: Number,
        required: true,           // Calculado: (P × duration) / (1000 × 3600)
    },
    cost: {
        type: Number,             // Calculado: energy × tarifa
        required: false,
    },
    timestamp: {
        type: Date,
        default: Date.now,        // Hora da medição
    }
});

export default mongoose.model("Measurement", MeasurementSchema);
