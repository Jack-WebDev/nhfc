"use client";

import React, { useState } from "react";

type CardProps = {
  title: string;
  label: string;
  label2?: string;
  inputValue?: string;
  inputValue2?: string;
  onInputChange?: (value: string) => void;
  onInputChange2?: (value: string) => void;
}

export const CardComponent = ({
  title,
  label,
  label2,
  inputValue2 = "",
  inputValue = "",
  onInputChange,
  onInputChange2,
}: CardProps) => {
  const [value, setValue] = useState<string>(inputValue);
  const [value2, setValue2] = useState<string>(inputValue2);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue1 = e.target.value;
    setValue(newValue1);
    if (onInputChange) {
      onInputChange(newValue1);
    }
  };

  const handleChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue2 = e.target.value;
    setValue2(newValue2);
    if (onInputChange2) {
      onInputChange2(newValue2);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-80">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
        <input 
          type="text" 
          value={value} 
          onChange={handleChange} 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
        />
      </div>
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">{label2}</label>
        <input 
          type="text" 
          value={value2} 
          onChange={handleChange2} 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
        />
      </div>
    </div>
  );
};

