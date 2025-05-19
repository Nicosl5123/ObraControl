import React from 'react';

export function Textarea({ value, onChange, placeholder }) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={3}
      style={{ padding: 8, border: "1px solid #ccc", borderRadius: 4, width: "100%" }}
    />
  );
}
