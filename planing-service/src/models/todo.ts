import { ObjectID } from "mongodb";

export interface Todo {
  _id: ObjectID;
  type: string;
  title: '';
  description: '';
  status: string;
  priority: number;
  latestFinish: Date;
  startDate: Date;
  isTemplate: false;
  parent: { _id: ObjectID };
}

export interface TodoTemplate extends Todo{
  templatePeriod: number;
  children: Todo[];

}
