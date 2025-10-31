import { useState, useEffect } from "react";
import api from "../services/api";

export const useMeasurements = ({onlyLast = false}) => {
    const [measurements, setMeasurements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMeasurements = async () => {
            try {
                const endpoint = onlyLast ? "/measurements/last" : "/measurements";
                const response = await api.get(endpoint);
                setMeasurements(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchMeasurements();
    }, []);

    return { measurements, loading, error };
};
