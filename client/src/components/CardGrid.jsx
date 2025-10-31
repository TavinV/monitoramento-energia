function CardGrid({children}) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            {children}
        </div>
    );
}

export default CardGrid;
