import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/solid';

const Accordion = ({ title, children, isOpen, onToggle }) => {

    const panelId = `accordion-panel-${title.replace(/\s+/g, '-').toLowerCase()}`;
    return (
        <div className="border border-gray-300 rounded-lg overflow-hidden">
            <button
                type="button"
                onClick={onToggle}
                className="w-full flex justify-between items-center px-4 py-3 bg-gray-100 font-medium text-left text-gray-800 hover:bg-gray-200 transition focus:outline-none focus-visible:ring focus-visible:ring-blue-500"
                aria-expanded={isOpen}
                aria-controls={panelId}
            >
                <span>{title}</span>
                <span aria-hidden="true">
                    {isOpen ? <ChevronUpIcon className="w-5 h-5" /> : <ChevronDownIcon className="w-5 h-5" />}
                </span>
            </button>
            <div
                id={panelId}
                role="region"
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[1000px]' : 'max-h-0'}`}
            >
                <div className="p-4 bg-white">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Accordion;
