### Schema
CREATE DATABASE Tasks_DB;
USE Tasks_DB;

CREATE TABLE User
(
	uid int NOT NULL AUTO_INCREMENT,
	username varchar(100) NOT NULL,
	email varchar(255) NOT NULL,
	password varchar(20) NOT NULL,
	PRIMARY KEY (uid)
);

CREATE TABLE Task
(
	tid int NOT NULL AUTO_INCREMENT,
	userid int NOT NULL,
	task varchar(255) NOT NULL,
	task_date datetime NOT NULL,
	iscompleted boolean NOT NULL,
	usedai boolean DEFAULT false, 
	PRIMARY KEY (tid),
	FOREIGN KEY (userid) REFERENCES User(uid)
);

CREATE TABLE Notes
(
	nid int NOT NULL AUTO_INCREMENT,
	note varchar() NOT NULL,
	
);

