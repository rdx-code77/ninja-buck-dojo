export interface NinjaUser {
  id: string;
  name: string;
  ninjaBucks: number;
  rank?: string;
  lastUpdated?: Date;
}

export interface Prize {
  id: string;
  name: string;
  description: string;
  cost: number;
  category: string;
  image?: string;
  inStock: boolean;
}

export interface NinjaData {
  users: NinjaUser[];
  prizes: Prize[];
}