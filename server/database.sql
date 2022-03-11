CREATE TABLE users (
  user_id serial,
  user_name varchar(255) not null,
  user_email varchar(255) not null unique,
  user_password varchar(255) not null,
  primary key(user_id)
);