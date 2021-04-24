import { ObjectID } from "mongodb";

export default class Todo {
  public  _id: ObjectID;
  public type = " ";
  public titel = " ";
  public description = " ";
  public status = " ";
  public priority = 0;
}
