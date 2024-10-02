"use client";

import React, { useState } from "react";
import { Department, Goal } from "../schema/types";
import GoalComponent from "./GoalComponent";

interface DepartmentComponentProps {
  department: Department;
}

export default function DepartmentComponent({
  department,
}: DepartmentComponentProps) {
  const [goals, setGoals] = useState<Goal[]>(department.goals);

  const addGoal = () => {
    const newGoal: Goal = { id: Date.now(), name: "", objectives: [] };
    setGoals([...goals, newGoal]);
  };

  const updateGoal = (updatedGoal: Goal) => {
    setGoals(
      goals.map((goal) => (goal.id === updatedGoal.id ? updatedGoal : goal))
    );
  };

  const deleteGoal = (goalId: number) => {
    setGoals(goals.filter((goal) => goal.id !== goalId));
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        {department.name}
      </h2>
      <button
        onClick={addGoal}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200 ease-in-out"
      >
        Add Goal
      </button>

      <div className="mt-6 space-y-4">
        {goals.map((goal) => (
          <GoalComponent
            key={goal.id}
            goal={goal}
            updateGoal={updateGoal}
            deleteGoal={deleteGoal}
          />
        ))}
      </div>
    </div>
  );
}
