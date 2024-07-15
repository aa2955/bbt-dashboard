import React from 'react';

const Dropdown = ({ label, options, onChange, value, valueKey, labelKey }) => (
  <div className="dropdown">
    <label>{label}</label>
    <select onChange={onChange} value={value}>
      <option value="">Select {label}</option>
      {options.map((option, index) => (
        <option key={index} value={option[valueKey]}>
          {option[labelKey]}
        </option>
      ))}
    </select>
  </div>
);

export default Dropdown;
