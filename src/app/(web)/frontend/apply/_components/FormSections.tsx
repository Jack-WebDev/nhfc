import React from 'react'

type FormSectionProps = {
    sectionTitle: string;
    fields: { name: string; label: string; type: string }[];
    values: { [key: string]: any };
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };

export default function FormSections({ sectionTitle, fields, values, handleChange }: FormSectionProps) {
    return (
        <div>
          <h2>{sectionTitle}</h2>
          {fields.map((field) => (
            <div key={field.name}>
              <label>{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={values[field.name] || ''}
                onChange={handleChange}
                className='border border-gray-200 rounded-lg p-2 w-full'
              />
            </div>
          ))}
        </div>
      );
}
