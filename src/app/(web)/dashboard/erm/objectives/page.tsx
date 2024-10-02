"use client";

import DepartmentComponent from "../_components/DepartmentComponent";

export default function Objectives() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 p-6">
      <DepartmentComponent department={{ id: 1, name: "IT", goals: [] }} />
      <DepartmentComponent
        department={{ id: 2, name: "Marketing", goals: [] }}
      />
      <DepartmentComponent department={{ id: 3, name: "Sales", goals: [] }} />
      <DepartmentComponent department={{ id: 4, name: "Finance", goals: [] }} />
    </div>
  );
}
