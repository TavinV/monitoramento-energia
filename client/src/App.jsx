import Header from "./components/Header.jsx";
import LatestMeasurement from "./components/sections/LatestMeasurement.jsx";
import MeasurementsChart from "./components/sections/MeasurementsChart.jsx";

function App() {
  return (
    <>
    <Header />
    <main className="w-full mx-auto px-10">
      <LatestMeasurement />
      <MeasurementsChart />
    </main>
    </>
  )
}

export default App
