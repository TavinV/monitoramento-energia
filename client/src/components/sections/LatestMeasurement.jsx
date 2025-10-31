import { useMeasurements } from "../../hooks/useMeasurements.jsx";
import Card from "../Card";
import CardGrid from "../CardGrid";

const descriptions = {
    voltage: "Tensão elétrica medida pelo ESP32 (Volts).",
    current: "Corrente elétrica medida pelo ESP32 (Ampères).",
    power: "Potência instantânea da máquina (Watts).",
    energy: "Energia consumida desde a ultima medição (kWh).",
    cost: "Custo estimado do consumo desde a ultima medição (Reais).",
    timestamp: "Data e hora da última medição."
};

function LatestMeasurement() {
    const { measurements, loading, error } = useMeasurements(true);

    if (loading) return <p className="text-gray-500">Carregando medições...</p>;
    if (error) return <p className="text-red-500">Erro: {error}</p>;

    const m = Array.isArray(measurements) ? measurements[0] : measurements;

    const cardsData = [
        { type: "voltage", title: "Tensão", value: m.voltage, unit: "Volts (V)" },
        { type: "current", title: "Corrente", value: m.current, unit: "Ampères (A)" },
        { type: "power", title: "Potência", value: m.power, unit: "Watts (W)" },
        { type: "energy", title: "Energia", value: m.energy, unit: "kWh" },
        { type: "cost", title: "Custo", value: m.cost, unit: "R$" },
        { type: "timestamp", title: "Última atualização", value: new Date(m.timestamp).toLocaleString("pt-BR"), unit: "" }
    ];

    return (
        <div className="flex flex-col bg-gray-200 p-5 rounded-xl shadow-md mb-10">
            <h2 className="sm:text-md text-sm text-center sm:text-left mb-3 font-semibold text-gray-700">Dados da ultima medição, realizada em {new Date(m.timestamp).toLocaleString("pt-BR")}</h2>
            <CardGrid>
                {cardsData.map((card) => (
                    <div key={card.type} className="relative group">
                        <Card {...card} />
                        {/* Tooltip */}
                        <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs rounded py-1 px-2 w-40 text-center z-50 pointer-events-none">
                            {descriptions[card.type]}
                        </div>
                    </div>
                ))}
            </CardGrid>
        </div>
    );
}

export default LatestMeasurement;
