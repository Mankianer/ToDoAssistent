import { ObjectID } from "mongodb";

export interface Todo {
  _id: ObjectID;
  type: string;
  title: '';
  description: '';
  status: string;
  priority: number;
  isTemplate: false;
}
