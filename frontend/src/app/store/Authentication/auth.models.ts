export class User {
  id?: number;
  name: string;
  username: string;
  email?: string;
  dateOfBirth?: Date;
  address?: string;
  phoneNumber?: string;
  role?: string;
}

export class UserToken {
  user: User;
  token: string;
}

export class UserCredentials {
  email: string;
  username: string;
  password: string;
}