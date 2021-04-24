import MongodbTodo from "./helper/mongodb-todo";
import express from "express";
import bodyParser from "body-parser";
import {ObjectID} from "mongodb";
import JsonWebToken, {SignOptions} from "jsonwebtoken";
import jwt from "express-jwt";
import { User, Todo } from "todo-assistant-models";
import fs from "fs";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

const publicKeyPath = process.env.SSH_KEY_PUBLIC_PATH || 'dev/default-sshkey.pub'
const privateKeyPath = process.env.SSH_KEY_PRIVATE_PATH || 'dev/default-sshkey'
const publicKey = fs.readFileSync(publicKeyPath);
const privateKey = fs.readFileSync(privateKeyPath);

app.use(jwt({ secret: privateKey, algorithms: ['HS256']}).unless({path: ['/token']}));

const mongodb = new MongodbTodo();

const port = 3000

app.get('/', (req, res) => {
  // const todo = new Todo();
  mongodb.findAllTodo((value) => {
    res.send(value);
  });
})

app.post('/', (req, res) => {
  const todo: Todo = req.body;
  if(todo._id !== undefined) {
    res.status(405)
    res.send("_id !== undefined");
  }
  mongodb.addToDo(todo);
  res.send(todo);
});

app.put('/', (req, res) => {
  let todo: Todo = req.body;
  if(todo._id === undefined) {
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
  if(todo._id === undefined) {
    res.status(405)
    res.setHeader('Allow', 'POST')
    res.send('Error: _id === undefined');
    return;
  }
  todo._id = new ObjectID(todo._id);
  mongodb.deleteToDo(todo, console.log);
  res.send(todo)
})

const users = [new User('user'), new User('admin', 'admin', 'admin')];

app.post('/token', (req, res) => {
  // Read username and password from request body
  const { username, password } = req.body;
  // Filter user from the users array by username and password
  const user = users.find(u => { return u.username === username && u.password === password });

  if (user) {
    // Generate an access token
    let options: SignOptions = {algorithm: "HS256", expiresIn: '2m'};
    const accessToken = JsonWebToken.sign({ username: user.username,  role: user.role }, privateKey, options);

    res.json({
      accessToken
    });
  } else {
    res.send('Username or password incorrect');
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

