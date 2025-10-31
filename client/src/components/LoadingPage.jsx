function LoadingPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="border-4 h-8 w-8 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p>Carregando...</p>
        </div>
    );
};

export default LoadingPage;
