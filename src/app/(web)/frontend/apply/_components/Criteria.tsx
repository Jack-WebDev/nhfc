import React from 'react'

type CriteriaProps = {
    items: string[];
    itemsPerGroup?: number; // Optional prop to specify the number of items per group
  };
  
  export default function Criteria({ items, itemsPerGroup = 2 }: CriteriaProps) {
    const groupedItems = [];
  
    for (let i = 0; i < items.length; i += itemsPerGroup) {
      groupedItems.push(items.slice(i, i + itemsPerGroup));
    }
  
    return (
      <div className='border border-gray-200 p-4 rounded-lg bg-slate-200'>
        <h1>Qualifying Criteria</h1>
        {groupedItems.map((group, groupIndex) => (
          <ul key={groupIndex} className='list-disc list-inside'>
            {group.map((item, itemIndex) => (
              <li key={itemIndex}>{item}</li>
            ))}
          </ul>
        ))}
      </div>
    );
  }
