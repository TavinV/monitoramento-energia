import { useState } from "react";
import api from "../services/api";
import { FaBolt, FaPlug, FaKey, FaPaperPlane } from "react-icons/fa6";

const PASSWORD = "tccsenai2025";

export default function EspSimulator() {
  const [authorized, setAuthorized] = useState(false);
  const [password, setPassword] = useState("");
  const [formData, setFormData] = useState({
    voltage: "",
    current: "",
    xApiKey: ""
  });
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAuth = (e) => {
    e.preventDefault();
    if (password === PASSWORD) {
      setAuthorized(true);
    } else {
      alert("Senha incorreta!");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);

    try {
      const res = await api.post(
        "/measurements",
        {
          voltage: parseFloat(formData.voltage),
          current: parseFloat(formData.current)
        },
        {
          headers: {
            "x-api-key": formData.xApiKey
          }
        }
      );

      setResponse({
        status: "success",
        data: res.data
      });
    } catch (error) {
      let message = "Erro ao enviar dados.";

      if (error.response) {
        const { status } = error.response;

        if (status === 401) {
          message = "Chave inválida (erro 401).";
        } else if (status === 500) {
          message = "Erro interno no servidor (erro 500).";
        } else {
          message = error.response.data?.error || `Erro ${status}`;
        }
      }

      setResponse({
        status: "error",
        message
      });
    } finally {
      setLoading(false);
    }
  };

  if (!authorized) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
        <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-sm text-center">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            🔒 Acesso restrito
          </h2>
          <form onSubmit={handleAuth} className="flex flex-col gap-3">
            <input
              type="password"
              placeholder="Digite a senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center p-4">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-2 text-center text-gray-800">
          Simulador de Envio ESP
        </h1>
        <p className="text-gray-500 text-sm text-center mb-6">
          Envie dados de <strong>Tensão</strong> e <strong>Corrente</strong> ao servidor.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="relative">
            <FaBolt className="absolute left-3 top-3 text-yellow-500" />
            <input
              type="number"
              name="voltage"
              step="0.001"
              value={formData.voltage}
              onChange={handleChange}
              placeholder="Tensão (V)"
              required
              className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-yellow-400 focus:outline-none"
            />
          </div>

          <div className="relative">
            <FaPlug className="absolute left-3 top-3 text-blue-500" />
            <input
              type="number"
              name="current"
              step="0.001"
              value={formData.current}
              onChange={handleChange}
              placeholder="Corrente (A)"
              required
              className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <div className="relative">
            <FaKey className="absolute left-3 top-3 text-green-500" />
            <input
              type="text"
              name="xApiKey"
              value={formData.xApiKey}
              onChange={handleChange}
              placeholder="X-API-KEY"
              required
              className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-green-400 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`mt-3 py-2 rounded-md text-white font-medium flex items-center justify-center gap-2 transition-colors ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            <FaPaperPlane />
            {loading ? "Enviando..." : "Enviar Dados"}
          </button>
        </form>

        {response && (
          <div
            className={`mt-5 p-3 rounded-md text-sm font-medium text-center ${
              response.status === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {response.status === "success"
              ? "✅ Dados enviados com sucesso!"
              : `❌ ${response.message}`}
          </div>
        )}
      </div>
    </div>
  );
}
