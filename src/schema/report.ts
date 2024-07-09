export type ReportType = {
  id: string;
  adminId: string;
  userId: string | null;
  batchId: number | null;
  bookNumber: number | null;
  activity: string;
  message: string;
  date: Date;
};
