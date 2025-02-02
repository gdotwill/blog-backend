-- Create database
CREATE DATABASE IF NOT EXISTS blog_app;

-- Create table users
CREATE TABLE IF NOT EXISTS blog_app.users (
  id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  img VARCHAR(255) NULL,
  PRIMARY KEY (id)
);

-- Create table posts
CREATE TABLE IF NOT EXISTS blog_app.posts (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(1000) NOT NULL,
  img VARCHAR(255) NOT NULL,
  cat VARCHAR(255) NOT NULL,
  date DATETIME NOT NULL,
  uid INT NOT NULL,
  PRIMARY KEY (id),
  INDEX uid_idx (uid),
  CONSTRAINT fk_uid
    FOREIGN KEY (uid)
    REFERENCES blog_app.users (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);
