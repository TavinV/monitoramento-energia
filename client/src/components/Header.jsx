import { MdOutlineBolt } from "react-icons/md";

function Header() {
  return (
    <header className="w-full bg-[#f9f9f9] p-6 px-10 mb-20 shadow-md flex items-center sm:justify-between justify-center md:flex-row flex-col gap-2 flex-wrap">
        <span className="flex items-center gap-2">
            <MdOutlineBolt className="text-amber-300" size={24} />
            <h1 className="text-xl font-semibold text-blue-800 text-center">Monitoramento de Energia</h1>
        </span>
        <span className="flex items-center gap-2">
            <div className="rounded-full bg-green-500 w-2 h-2 animate-ping"></div>
            <span className="">Conectado</span>
        </span>
    </header>
  );
}

export default Header;
