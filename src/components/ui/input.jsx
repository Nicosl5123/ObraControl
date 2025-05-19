import React from 'react';

export function Input({ value, onChange, placeholder }) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{ padding: 8, border: "1px solid #ccc", borderRadius: 4, width: "100%" }}
    />
  );
}
