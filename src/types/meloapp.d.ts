type BaseEntity<T> = T & {
  created_at: string;
  updated_at: string;
  deleted_at: string;
};

declare type newUser = {
  name: string;
  email: string;
  password: string;
  surname: string;
};

declare type UpdateUser = {
  name: string;
};
