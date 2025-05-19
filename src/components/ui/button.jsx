import React from 'react';

export function Button({ children, onClick, variant = "solid", size = "md" }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "8px 16px",
        margin: "4px",
        backgroundColor: variant === "outline" ? "#fff" : "#007bff",
        color: variant === "outline" ? "#007bff" : "#fff",
        border: "1px solid #007bff",
        borderRadius: 4,
        cursor: "pointer"
      }}
    >
      {children}
    </button>
  );
}
