export type Objective = {
  id: number;
  description: string;
};

export type Goal = {
  id: number;
  name: string;
  objectives: Objective[];
};

export type Department = {
  id: number;
  name: string;
  goals: Goal[];
};
