import React from "react";
import './CategoryLabel.css';

const CategoryColor = {
    work: '#FF5722',      // Orange
    personal: '#4CAF50',  // Green
    study: '#2196F3',     // Blue
    shopping: '#9C27B0',  // Purple
    health: '#E91E63',    // Pink
    others: '#607D8B'     // Blue Grey
}

const CategoryLabel = ({ category }) => {
    return (
        <span
            className="category-label"
            style={{ backgroundColor: CategoryColor[category] || CategoryColor['others'] }}
        >
            {category}
        </span>
    );
};

export default CategoryLabel;