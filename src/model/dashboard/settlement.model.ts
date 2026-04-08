export interface Settlement {
  id: string;
  entity: string;
  amount: number;
  fees: number;
  tax: number;
  status: string;
  date: number;
  utr?: string;
  settled_at?: number;
  debit?: number;
  credit?: number;
  currency?: string;
}