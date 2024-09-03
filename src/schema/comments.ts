// types.ts
export type CommentData = {
  id: string;
  author: string;
  text: string;
  timestamp: Date;
  replies?: CommentData[];
};

export type CommentFormValues = {
  author: string;
  text: string;
};
