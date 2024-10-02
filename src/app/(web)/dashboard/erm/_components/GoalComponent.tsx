"use client";

import React, { useState } from "react";
import { Goal, Objective } from "../schema/types";
import ObjectiveComponent from "./ObjectiveComponent";

interface GoalComponentProps {
  goal: Goal;
  updateGoal: (goal: Goal) => void;
  deleteGoal: (goalId: number) => void;
}

export default function GoalComponent({
  goal,
  updateGoal,
  deleteGoal,
}: GoalComponentProps) {
  const [goalName, setGoalName] = useState(goal.name);
  const [objectives, setObjectives] = useState<Objective[]>(goal.objectives);

  const addObjective = () => {
    const newObjective: Objective = { id: Date.now(), description: "" };
    setObjectives([...objectives, newObjective]);
  };

  const updateObjective = (updatedObjective: Objective) => {
    setObjectives(
      objectives.map((obj) =>
        obj.id === updatedObjective.id ? updatedObjective : obj
      )
    );
    updateGoal({ ...goal, objectives });
  };

  const deleteObjective = (objectiveId: number) => {
    setObjectives(objectives.filter((obj) => obj.id !== objectiveId));
    updateGoal({ ...goal, objectives });
  };

  const saveGoal = () => {
    updateGoal({ ...goal, name: goalName, objectives });
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-md">
      <input
        value={goalName}
        onChange={(e) => setGoalName(e.target.value)}
        placeholder="Goal name"
        className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
      />

      <div className="flex space-x-4 mb-4">
        <button
          onClick={saveGoal}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200 ease-in-out"
        >
          Save Goal
        </button>
        <button
          onClick={() => deleteGoal(goal.id)}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200 ease-in-out"
        >
          Delete Goal
        </button>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Objectives</h3>
        <button
          onClick={addObjective}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200 ease-in-out mb-4"
        >
          Add Objective
        </button>

        <div className="space-y-4">
          {objectives.map((obj) => (
            <ObjectiveComponent
              key={obj.id}
              objective={obj}
              updateObjective={updateObjective}
              deleteObjective={deleteObjective}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
