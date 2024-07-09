export interface UserInput {
  id: number;
  username: string;
  password: string;
  email: string;
}

export interface JournalEntryInput {
  id: number;
  title: string;
  content: string;
  category: string;
  date: string;
  userId: number;
}

export interface DateRangeInput {
  userId: number;
  startDate: string;
  endDate: string;
}

export interface CategoryInput {
  userId: number;
  category: string;
}

export interface LoginInput {
  username: string;
  password: string;
}
