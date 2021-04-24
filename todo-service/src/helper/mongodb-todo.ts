import {Collection, MongoClient} from "mongodb";
import Todo from './../model/todo';

export default class MongodbTodo {

  user = 'todo_dev';
  password = 'todo';
  dbName = 'todos';
  dbSchema = 'todos';
  authMechanism = `SCRAM-SHA-1&authSource=${this.dbName}`;
  // Connection URL
  url = `mongodb://${this.user}:${this.password}@localhost:27017/?authMechanism=${this.authMechanism}&useUnifiedTopology=true`;
  client: MongoClient;
  todoCollection: Collection;

  constructor() {
    this.client = new MongoClient(this.url);
    this.client.connect((err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log('MongoDB connected successfully');
      this.todoCollection = this.client.db(this.dbName).collection(this.dbSchema);
      // client.close();
    });
  }

  public findAllTodo(callback: (value: any[]) => any): void {
    this.todoCollection.find().toArray((err, todos) => {
      if (err) {
        console.error(err);
      }
      callback(todos);
    });
  }


  public addToDo(todo: Todo, callback?: (value: any) => void) {
    this.todoCollection.insertOne(todo, callback);
  }

  public deleteToDo(todo: Todo, callback?: (value: any) => void) {
    this.todoCollection.deleteOne(todo, ((err, result) => {
      if (err) {
        console.error(err);
      }
      if(callback) callback(result.result);
    }))
  }

  public updateToDo(todo: Todo, callback?: (value: any) => void) {
    this.todoCollection.updateOne({  _id: todo._id}, { $set: todo}, (err, todos) => {
      if (err) {
        console.error(err);
      }
      if(callback) callback(todos.result);
    });
  }
}
