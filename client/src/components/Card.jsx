import { FaBolt, FaPlug, FaGears, FaBatteryThreeQuarters, FaMoneyBillWave } from "react-icons/fa6";
import { FiClock } from "react-icons/fi";

// Mapeamento de ícones por tipo
const icons = {
    voltage: <FaBolt className="w-5 h-5" />,
    current: <FaPlug className="w-5 h-5" />,
    power: <FaGears className="w-5 h-5" />,
    energy: <FaBatteryThreeQuarters className="w-5 h-5" />,
    cost: <FaMoneyBillWave className="w-5 h-5" />,
    timestamp: <FiClock className="w-5 h-5" />
};

// Cores de fundo por tipo
const colors = {
    voltage: "bg-yellow-500",
    current: "bg-blue-500",
    power: "bg-purple-500",
    energy: "bg-green-500",
    cost: "bg-red-500",
    timestamp: "bg-gray-500"
};

function Card({ type, title, value, unit }) {
    return (
        <div className="bg-white rounded-lg p-6 shadow-md transition-transform transform hover:-translate-y-1 hover:shadow-xl w-full flex flex-col h-full">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-gray-600 uppercase font-medium text-sm">{title}</h3>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${colors[type]}`}>
                    {icons[type]}
                </div>
            </div>
            <div className="text-2xl font-semibold mb-1">{value}</div>
            {unit && <div className="text-gray-500 text-sm">{unit}</div>}
        </div>
    );
};

export default Card;