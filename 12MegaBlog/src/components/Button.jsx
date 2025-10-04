import React from "react";

export default function Button({
    children,
    type = "button",
    bgColor = "bg-blue-600",
    textColor = "text-white",
    className = "",
    disabled = false,
    ...props
}) {
    return (
        <button 
            type={type}
            disabled={disabled}
            className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                disabled 
                    ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                    : `${bgColor} ${textColor} hover:opacity-90`
            } ${className}`} 
            {...props}
        >
            {children}
        </button>
    );
}
