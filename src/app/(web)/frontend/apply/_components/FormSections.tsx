import React from "react";

type Field = { name: string; label: string; type: string; options?: string[] };

type FormSectionProps = {
  sectionTitle: string;
  fields: Field[];
  values: { [key: string]: any };
  handleChange: (e: any) => void;
};

export default function FormSections({
  sectionTitle,
  fields,
  values,
  handleChange,
}: FormSectionProps) {
  return (
    <div className="grid grid-cols-2 gap-8">
      {fields.map((field) => (
        <div key={field.name} className="grid gap-y-2">
          <label className="mt-8">{field.label}</label>
          {field.type === "select" ? (
            <select
              name={field.name}
              value={values[field.name] || ""}
              onChange={handleChange}
              className="border border-gray-200 rounded-lg p-2"
            >
              {field.options?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : field.type === "file" ? (
            <input
              type="file"
              name={field.name}
              onChange={handleChange}
              className="border border-gray-200 rounded-lg p-2 w-full"
              multiple
            />
          ) : (
            <input
              type={field.type}
              name={field.name}
              value={values[field.name] || ""}
              onChange={handleChange}
              className="border border-gray-200 rounded-lg p-2 w-full"
            />
          )}
        </div>
      ))}
    </div>
  );
}
