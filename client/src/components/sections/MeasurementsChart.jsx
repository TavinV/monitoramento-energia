import { useState } from "react";
import { useMeasurements } from "../../hooks/useMeasurements.jsx";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";

const chartColors = {
    voltage: "#3b82f6",   // azul
    current: "#10b981",   // verde
    power: "#f59e0b",     // amarelo
    energy: "#8b5cf6",    // roxo
    cost: "#ef4444",      // vermelho
};

const units = {
    voltage: "Volts (V)",
    current: "Ampères (A)",
    power: "Watts (W)",
    energy: "kWh",
    cost: "Reais (R$)",
};

const labels = {
    voltage: "Tensão",
    current: "Corrente",
    power: "Potência",
    energy: "Energia",
    cost: "Custo",
};

export default function MeasurementsChart() {
    const { measurements, loading, error } = useMeasurements(false);
    const [selectedType, setSelectedType] = useState("power");

    if (loading) return <p className="text-gray-500">Carregando gráfico...</p>;
    if (error) return <p className="text-red-500">Erro ao carregar medições: {error}</p>;
    if (!measurements || measurements.length === 0)
        return <p className="text-gray-500">Nenhuma medição encontrada.</p>;

    const data = measurements.map((m) => ({
        timestamp: new Date(m.timestamp).toLocaleString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
            day: "2-digit",
            month: "2-digit",
        }),
        value: m[selectedType],
    }));

    return (
        <div className="flex flex-col bg-gray-200 p-5 rounded-xl shadow-md">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
                <h2 className="text-md font-semibold text-gray-700 mb-2 sm:mb-0">
                    Evolução de {labels[selectedType]} ao longo do tempo
                </h2>

                <select
                    className="bg-white border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                >
                    <option value="voltage">Tensão</option>
                    <option value="current">Corrente</option>
                    <option value="power">Potência</option>
                    <option value="energy">Energia</option>
                    <option value="cost">Custo</option>
                </select>
            </div>

            <div className="w-full h-72">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                        <XAxis dataKey="timestamp" tick={{ fontSize: 12 }} />
                        <YAxis
                            tick={{ fontSize: 12 }}
                            label={{
                                value: units[selectedType],
                                angle: -90,
                                position: "insideLeft",
                                offset: 5,
                            }}
                        />
                        <Tooltip
                            formatter={(value) =>
                                `${value.toFixed(3)} ${units[selectedType]}`
                            }
                            labelStyle={{ color: "#374151" }}
                            contentStyle={{
                                backgroundColor: "#f9fafb",
                                border: "1px solid #d1d5db",
                                borderRadius: "8px",
                            }}
                        />
                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke={chartColors[selectedType]}
                            strokeWidth={2.5}
                            dot={false}
                            isAnimationActive={true}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
