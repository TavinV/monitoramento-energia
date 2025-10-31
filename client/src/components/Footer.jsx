function Footer() {
    return (
        <footer className="w-full bg-gray-100 border-t border-gray-300 mt-30">
            <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left text-gray-700">
                
                {/* Nome e descrição */}
                <div className="mb-4 sm:mb-0">
                    <h3 className="font-semibold text-lg text-gray-800">Monitoramento de Energia</h3>
                    <p className="text-sm text-gray-600">
                        Sistema de acompanhamento em tempo real do consumo elétrico.
                    </p>
                </div>

                {/* Links */}
                <div className="flex space-x-5">
                    <a
                        href="https://github.com/TavinV/monitoramento-energia"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm hover:text-blue-600 transition-colors"
                    >
                        GitHub
                    </a>
                    <a
                        href="/#"
                        className="text-sm hover:text-blue-600 transition-colors"
                    >
                        Documentação
                    </a>
                    <a
                        href="mailto:otavioviniciusads@gmail.com"
                        className="text-sm hover:text-blue-600 transition-colors"
                    >
                        Contato
                    </a>
                </div>
            </div>

            {/* Linha final */}
            <div className="w-full bg-gray-200 py-2">
                <p className="text-xs text-center text-gray-500">
                    © {new Date().getFullYear()} Monitoramento de Energia. Todos os direitos reservados.
                </p>
            </div>
        </footer>
    );
}

export default Footer;
