export interface Experience {
  company: string;
  url: string;
  positions: Position[];
}

export interface Position {
  name: string;
  startDate: string;
  endDate: string;
  tasks: string[];
}
