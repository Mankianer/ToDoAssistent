import express from "express";
import bodyParser from "body-parser";
import JsonWebToken, {SignOptions} from "jsonwebtoken";
import {JwtUtils} from "./libs/express-utils/express-utils";
import jwt from "express-jwt";

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.use(jwt(JwtUtils.jwtRequstHandlerOption));

const port = process.env.PORT || 3002;

app.get('/', (req, res) => {
  return 'ok';
})


app.listen(port, () => {
  console.log(`planing-service listening at http://localhost:${port}`)
})

