import Header from "./components/Header.jsx";
import LatestMeasurement from "./components/sections/LatestMeasurement.jsx";
import MeasurementsChart from "./components/sections/MeasurementsChart.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  return (
    <>
    <Header />
    <main className="w-full mx-auto sm:px-10 px-2">
      <LatestMeasurement />
      <MeasurementsChart />
    </main>
    <Footer />
    </>
  )
}

export default App
