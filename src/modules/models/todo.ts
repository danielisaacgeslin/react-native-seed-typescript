export enum Status {
  PENDING = 'pending',
  PROGRESS = 'in-progress',
  DONE = 'done'
}

export interface ITodo {
  _id?: string;
  createdById: string;
  status: Status;
  title: string;
  description: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}
