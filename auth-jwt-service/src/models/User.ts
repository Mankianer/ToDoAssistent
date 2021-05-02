export class User {
  username: string;
  password = '';
  role = 'user';

  constructor(username: string, password?: string, role?: string) {
    this.username = username;
    this.password = password || this.password;
    this.role = role || this.role;
  }
}
