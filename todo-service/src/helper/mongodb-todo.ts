import {Collection, FilterQuery, MongoClient} from "mongodb";
import {Todo} from '../models/todo';

export class MongodbTodo {

  dbName = process.env.MONGODB_DB || 'todos';
  dbCollection = process.env.MONGODB_COLLECTION || 'todos';
  // Connection URL
  url = process.env.MONGODB_URL || 'mongodb://admin:admin@localhost:27017/?authMechanism=SCRAM-SHA-1&authSource=admin&useUnifiedTopology=true';
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
      this.todoCollection = this.client.db(this.dbName).collection(this.dbCollection);
      // client.close();
    });
  }

  public findAllTodo(callback: (value: any[]) => any, filter?: FilterQuery<any>): void {
    this.todoCollection.find(filter).toArray((err, todos) => {
      if (err) {
        console.error(err);
      }
      callback(todos);
    });
  }


  public addToDo(todo: Todo, callback?: (value: any) => void) {
    this.todoCollection.insertOne(todo, callback);
  }

  public addToDos(todos: Todo[], callback?: (value: any) => void) {
    this.todoCollection.insertMany(todos, callback);
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
