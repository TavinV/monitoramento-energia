import api from "../services/api";

export const exportMeasurementsAsCSV = async () => {
        try {
            const response = await api.get('/measurements/export', {
                responseType: 'blob',
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'measurements.csv');
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error('Erro ao exportar CSV:', error);
        }
    };
