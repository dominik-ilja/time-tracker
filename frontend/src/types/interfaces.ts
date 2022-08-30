export interface ICategory {
  id: number;
  title: string;
}
export interface ICategoryTime extends ICategory {
  total_time: number | null;
};
export interface ILog {
  category: string;
  category_id: number;
  finished_date: string;
  log_id: number;
  time: number;
}

export interface ILogFields {
  dateDay: string;
  dateMonth: string;
  dateYear: string;
  finishHour: string;
  finishMinutes: string;
  workDays: string;
  workHours: string;
  workMinutes: string;
}
export interface ISubmitInfo {
  submitTime: Date;
  seconds: number;
}
