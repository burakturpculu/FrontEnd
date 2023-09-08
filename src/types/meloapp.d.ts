type BaseEntity<T> = T & {
  created_at: string;
  updated_at: string;
  deleted_at: string;
};

declare type MeloAppUser = {
  email: string;
  password: string;
};

declare type MeloAppTask = BaseEntity<{
  id: string;
  name: string;
}>;

declare type UpdateMeloAppTask = {
  name: string;
};

declare type CreateMeloAppTask = {
  name: string;
};
