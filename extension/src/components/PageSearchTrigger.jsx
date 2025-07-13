import React from "react";
import { Search } from "lucide-react";

const PageSearchTrigger = ({ className = "", title = "Search Page" }) => {
    const openPageSearch = () => {
        // Send message to content script to open page search
        window.postMessage({
            type: 'OPEN_PAGE_SEARCH'
        }, '*');
    };

    return (
        <button
            onClick={openPageSearch}
            className={`p-2 rounded-lg transition-all duration-150 hover:bg-blue-100 ${className}`}
            title={title}
        >
            <Search size={16} />
        </button>
    );
};

export default PageSearchTrigger; 