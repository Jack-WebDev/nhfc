import React from "react";

type CriteriaProps = {
  items: string[];
  documents?: string[];
  itemsPerGroup?: number; // Optional prop to specify the number of items per group
};

export default function Criteria({ items,documents, itemsPerGroup = 2 }: CriteriaProps) {
  const groupedItems = [];

  for (let i = 0; i < items.length; i += itemsPerGroup) {
    groupedItems.push(items.slice(i, i + itemsPerGroup));
  }

  return (
    <div className="border border-gray-200 p-4 rounded-lg bg-slate-200">
      <h1 className="text-center text-lg text-blue-600 font-medium my-4">
        QUALIFYING CRITERIA
      </h1>
      {groupedItems.map((group, groupIndex) => (
        <ul key={groupIndex} className="list-disc list-inside">
          {group.map((item, itemIndex) => (
            <li key={itemIndex}>{item}</li>
          ))}
        </ul>
      ))}
      <h2 className="text-center text-lg text-blue-600 font-medium my-4">
        DOCUMENTS REQUIRED FOR APPLICATION
      </h2>
      <ul className="list-disc list-inside">
        {documents?.map((document, documentIndex) => (
          <li key={documentIndex}>{document}</li>
        ))}
      </ul>
    </div>
  );
}
