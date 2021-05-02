import express from "express";
import bodyParser from "body-parser";
import {ObjectID} from "mongodb";
import JsonWebToken, {SignOptions} from "jsonwebtoken";
import {JwtUtils} from "./libs/express-utils/express-utils";
import jwt from "express-jwt";

import {User} from "./models/User";
import fs from "fs";

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(bodyParser.raw());

const port = process.env.PORT || 3001;
const userFile = process.env.USER_FILE || 'dev/users.json';

app.use(jwt(JwtUtils.jwtRequstHandlerOption).unless({path: ['/token']}));

let users: User[];
users = JSON.parse(fs.readFileSync(userFile).toString());


app.post('/token', (req, res) => {
  // Read username and password from request body
  const {username, password} = req.body;
  // Filter user from the users array by username and password
  const user = users.find(u => {
    return u.username === username && u.password === password
  });

  if (user) {
    // Generate an access token
    let options: SignOptions = {algorithm: JwtUtils.algorithm, expiresIn: JwtUtils.expireIn};
    const accessToken = JsonWebToken.sign({
      username: user.username,
      role: user.role
    }, JwtUtils.privateKey, options);

    res.json({
      accessToken
    });
  } else {
    res.send('Username or password incorrect');
  }
});

app.listen(port, () => {
  console.log(`auth-jwt-service listening at http://localhost:${port}`)
})

