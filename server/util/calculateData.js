export function calculateMeasurement({ voltage, current, duration, tariff = 0.68 }) {
    const power = voltage * current;
    const energy = (power * duration) / (1000 * 3600);
    const cost = energy * tariff;

    return {
        power: Number(power.toFixed(2)),     // Ex: 12.7 W
        energy: Number(energy.toFixed(6)),   // Ex: 0.000020 kWh
        cost: Number(cost.toFixed(6)),       // Ex: 0.000014 R$
        duration: Number(duration.toFixed(3)) // Ex: 5.609 s
    };
}
