// import * as jwt from "express-jwt";
import * as fs from "fs";
import {Algorithm} from "jsonwebtoken";

const publicKeyPath = process.env.SSH_KEY_PUBLIC_PATH || 'dev/default-sshkey.pub'
const privateKeyPath = process.env.SSH_KEY_PRIVATE_PATH || 'dev/default-sshkey'
const publicKey = fs.readFileSync(publicKeyPath);
const privateKey = fs.readFileSync(privateKeyPath);

export class JwtUtils {

  public static expireIn: string = process.env.JWT_EXPIRESIN || '10m';
  public static algorithm: Algorithm = (process.env.JWT_ALGORITHMS as Algorithm || 'HS256');

  public static publicKey = publicKey;
  public static privateKey = privateKey;

  public static jwtRequstHandlerOption = {secret: JwtUtils.privateKey, algorithms: [JwtUtils.algorithm]};
}
