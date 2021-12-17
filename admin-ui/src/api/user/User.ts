export type User = {
  createdAt: Date;
  firstName: string | null;
  id: string;
  lastName: string | null;
  roles: Array<string>;
  todos: string | null;
  updatedAt: Date;
  username: string;
};
