import { useState, useEffect } from "react";
import api from "../services/api";

/**
 * Hook para buscar medições do sistema.
 * 
 * @param {Object} options
 * @param {boolean} [options.onlyLast=false] - Define se deve buscar apenas a última medição.
 * @param {string|null} [options.period=null] - Filtra por período: "today", "week", "month", ou null (todas).
 * @param {number|null} [options.limit=null] - Limita a quantidade de medições retornadas.
 */
export const useMeasurements = ({ onlyLast = false, period = null, limit = null } = {}) => {
    const [measurements, setMeasurements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMeasurements = async () => {
            setLoading(true);
            setError(null);

            try {
                let endpoint = onlyLast ? "/measurements/last" : "/measurements";

                // Monta query string de filtros (apenas se necessário)
                const params = new URLSearchParams();
                if (period) params.append("period", period);
                if (limit) params.append("limit", limit);

                if (!onlyLast && (period || limit)) {
                    endpoint += `?${params.toString()}`;
                }

                const response = await api.get(endpoint);
                setMeasurements(response.data);
            } catch (err) {
                console.error("Erro ao buscar medições:", err);
                setError(err.message || "Erro ao carregar dados");
            } finally {
                setLoading(false);
            }
        };

        fetchMeasurements();
    }, [onlyLast, period, limit]);

    return { measurements, loading, error };
};
