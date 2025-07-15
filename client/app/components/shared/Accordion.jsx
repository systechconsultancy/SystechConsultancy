const Accordion = ({ title, children, isOpen, onToggle }) => {
    return (
        <div className="border border-gray-300 rounded-lg overflow-hidden">
            <button
            type="button"
                onClick={onToggle}
                className="w-full flex justify-between items-center px-4 py-3 bg-gray-100 font-medium text-left text-gray-800 hover:bg-gray-200 transition"
            >
                <span>{title}</span>
                <span>{isOpen ? "▲" : "▼"}</span>
            </button>
            {isOpen && (
                <div className="p-4 bg-white">
                    {children}
                </div>
            )}
        </div>
    );
};

export default Accordion;
