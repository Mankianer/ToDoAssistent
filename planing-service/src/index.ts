import express from "express";
import bodyParser from "body-parser";
import JsonWebToken, {SignOptions} from "jsonwebtoken";
import {JwtUtils} from "./libs/express-utils/express-utils";
import jwt from "express-jwt";
import axios from "axios";
import {Todo, TodoTemplate} from "./models/todo";
import {TemplateHelper} from "./helper/template-helper";


const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.use(jwt(JwtUtils.jwtRequstHandlerOption));

const port = process.env.PORT || 3003;
const todoservice = process.env.TODO_SERVICE_URL || 'http://localhost:3000/';

app.get('/', async (req, res) => {
  let token = req.header('authorization');
  axios.get<TodoTemplate[]>(todoservice + '?template=true', {
    headers: {'authorization': token},
    data: {isTemplate: true}
  }).then(value => {
    return TemplateHelper.TemplatesToToDos(value.data);
  }).then(value => res.send(value));

  // res.send('ok')
})

app.get('/getTemplates', async (req, res) => {
  let token = req.header('authorization');
  axios.get<TodoTemplate[]>(todoservice + '?template=true', {
    headers: {'authorization': token},
    data: {isTemplate: true}
  }).then(value => {
    return TemplateHelper.TemplatesToToDosByDates(value.data, new Date(), new Date(2021, 4, 14));
  }).then(value => res.send(value));

  // res.send('ok')
})


app.listen(port, () => {
  console.log(`planing-service listening at http://localhost:${port}`)
})

