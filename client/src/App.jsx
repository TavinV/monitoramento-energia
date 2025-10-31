import Header from "./components/Header.jsx";
import { useMeasurements } from "./hooks/useMeasurements.jsx";

function App() {
  const { measurements, loading, error } = useMeasurements({ onlyLast: true });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
    <Header />
    <h1>hello</h1>
    <pre>{JSON.stringify(measurements, null, 2)}</pre>
    </>
  )
}

export default App
