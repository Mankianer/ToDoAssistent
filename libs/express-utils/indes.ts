import jwt from "express-jwt";
import fs from "fs";

const publicKeyPath = process.env.SSH_KEY_PUBLIC_PATH || 'dev/default-sshkey.pub'
const privateKeyPath = process.env.SSH_KEY_PRIVATE_PATH || 'dev/default-sshkey'
const publicKey = fs.readFileSync(publicKeyPath);
const privateKey = fs.readFileSync(privateKeyPath);

export class JwtUtils {
  public jwtRequstHandler = jwt({ secret: privateKey, algorithms: ['HS256']});
}
