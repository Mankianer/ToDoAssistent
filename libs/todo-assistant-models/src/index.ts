import { ObjectID } from "mongodb";

export class Todo {
  public  _id: ObjectID;
  public type = " ";
  public titel = " ";
  public description = " ";
  public status = " ";
  public priority = 0;
}

export class User {
  public username: string;
  public password: string;
  public role: string;

  constructor(username: string, password?: string, role?: string) {
    this.username = username;
    this.password = password || '';
    this.role = role || 'user';
  }
}
