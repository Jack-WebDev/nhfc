"use client";

import React, { useState } from "react";
import { Objective } from "../schema/types";
interface ObjectiveComponentProps {
  objective: Objective;
  updateObjective: (objective: Objective) => void;
  deleteObjective: (objectiveId: number) => void;
}

export default function ObjectiveComponent({
  objective,
  updateObjective,
  deleteObjective,
}: ObjectiveComponentProps) {
  const [description, setDescription] = useState(objective.description);

  const saveObjective = () => {
    updateObjective({ ...objective, description });
  };

  return (
    <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-md">
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Objective description"
        className="flex-grow px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
      />

      <button
        onClick={saveObjective}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200 ease-in-out"
      >
        Save
      </button>

      <button
        onClick={() => deleteObjective(objective.id)}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200 ease-in-out"
      >
        Delete
      </button>
    </div>
  );
}
