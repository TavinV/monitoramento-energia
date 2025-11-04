import { MdOutlineBolt } from "react-icons/md";
import { useMeasurements } from "../hooks/useMeasurements";

function Header() {

  const {loading, error } = useMeasurements(true);

  const pingColors = {
    "loaded" : "bg-green-500",
    "loading": "bg-amber-400",
    "error" : "bg-red-500"
  };

  let currentColor 

  if (loading){
    currentColor = pingColors.loadings
  } else if (!loading && !error){
    currentColor = pingColors.loaded
  } else if (!loading && error) {
    currentColor = pingColors.error
  }

  return (
    <header className="w-full bg-[#f9f9f9] p-6 px-10 mb-20 shadow-md flex items-center sm:justify-between justify-center md:flex-row flex-col gap-2 flex-wrap">
        <span className="flex items-center gap-2">
            <MdOutlineBolt className="text-amber-300" size={24} />
            <h1 className="text-xl font-semibold text-blue-800 text-center">Monitoramento de Energia</h1>
        </span>
        <span className="flex items-center gap-2">
            <div className={"rounded-full w-2 h-2 animate-ping " + currentColor}></div>
            <span className="">{loading ? "Conectando": "Conectado"}</span>
        </span>
    </header>
  );
}

export default Header;
