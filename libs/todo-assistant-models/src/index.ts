import { ObjectID } from "mongodb";

export interface Todo {
  _id: ObjectID;
  type: string;
  title: '';
  description: '';
  status: string;
  priority: number;
}

export class User {
  username: string;
  password = '';
  role = 'user';

  constructor(username: string, password?: string, role?: string) {
    this.username = username;
    this.password = password || this.password;
    this.role = role || this.role;
  }
}
