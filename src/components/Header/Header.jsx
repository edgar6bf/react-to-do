import React from "react";

export default function Header({ filters, filter, onFilterChange }) {
    return (
        <header>
            <ul>
                {filters.map((value, index) => {
                    return <li key={index}>
                        <button onClick={() => onFilterChange(value)}>{value}</button>
                    </li>
                })}
            </ul>
        </header>
    );
}
