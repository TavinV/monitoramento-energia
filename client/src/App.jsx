import Header from "./components/Header.jsx";
import LatestMeasurement from "./components/sections/LatestMeasurement.jsx";

function App() {
  return (
    <>
    <Header />
    <main className="w-full mx-auto px-10">
      <LatestMeasurement />

    </main>
    </>
  )
}

export default App
