import express from "express";
import {MongodbTodo} from "./helper/mongodb-todo";
import bodyParser from "body-parser";
import {ObjectID} from "mongodb";
import JsonWebToken, {SignOptions} from "jsonwebtoken";
import {JwtUtils} from "./libs/express-utils/express-utils";
import jwt from "express-jwt";

import {Todo} from "./models/todo";
import fs from "fs";

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.use(jwt(JwtUtils.jwtRequstHandlerOption));

const mongodb = new MongodbTodo();

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  mongodb.findAllTodo((value) => {
    res.send(value);
  });
})

app.post('/', (req, res) => {
  const todo: Todo = req.body;
  if (todo._id !== undefined) {
    res.status(405)
    res.send("_id !== undefined");
  }
  mongodb.addToDo(todo);
  res.send(todo);
});

app.put('/', (req, res) => {
  let todo: Todo = req.body;
  if (todo._id === undefined) {
    res.status(405)
    res.setHeader('Allow', 'POST')
    res.send('Error: _id === undefined');
    return;
  }
  todo._id = new ObjectID(todo._id);
  mongodb.updateToDo(todo);
  res.send(todo)
})

app.delete('/', (req, res) => {
  let todo: Todo = req.body;
  if (todo._id === undefined) {
    res.status(405)
    res.setHeader('Allow', 'POST')
    res.send('Error: _id === undefined');
    return;
  }
  todo._id = new ObjectID(todo._id);
  mongodb.deleteToDo(todo, console.log);
  res.send(todo)
})

app.listen(port, () => {
  console.log(`ToDo-Service listening at http://localhost:${port}`)
})

