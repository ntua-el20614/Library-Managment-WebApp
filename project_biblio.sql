DROP DATABASE IF EXISTS biblio_project;

CREATE DATABASE biblio_project;
USE biblio_project;
 
 CREATE TABLE school(
	school_id integer(10) NOT NULL auto_increment,
    school_name varchar(50) NOT NULL,
    address varchar(100) NOT NULL,
    city varchar(20) NOT NULL,
    telephone integer(15) NOT NULL,
    email varchar(70) NOT NULL,
    principal_fullname varchar(50) NOT NULL,
    PRIMARY KEY(school_id)
);

CREATE TABLE book(
	isbn char(10) NOT NULL,
    school_id integer(10) NOT NULL,
    title varchar(50) NOT NULL,
    publisher varchar(50) NOT NULL,
    pages integer(4) NOT NULL,
    summary varchar(255),
    image binary(255),
    book_language varchar(20),
    copies integer(3),
    keywords varchar(100),
    available_copies integer(3),
		CONSTRAINT books_in_school FOREIGN KEY (school_id)
		REFERENCES school(school_id) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (isbn,school_id)
);

CREATE TABLE author(
	author_id integer(10) NOT NULL auto_increment,
    author_name varchar(15) NOT NULL,
    author_surname varchar(15) NOT NULL,
    PRIMARY KEY (author_id)
);

CREATE TABLE book_author(
	isbn char(10) NOT NULL,
    school_id integer(10) NOT NULL,
	author_id integer(10) NOT NULL,
		CONSTRAINT book_info_auth FOREIGN KEY (isbn, school_id)
        REFERENCES book(isbn, school_id) ON  DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT author_info FOREIGN KEY (author_id)
        REFERENCES author(author_id) ON  DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (isbn,school_id,author_id)
);

CREATE TABLE category(
	category_id integer(10) NOT NULL auto_increment,
    category_name varchar(20) NOT NULL,
    PRIMARY KEY (category_id)
);

CREATE TABLE book_category(
	isbn char(10) NOT NULL,
    school_id integer(10) NOT NULL,
	category_id integer(10) NOT NULL,
		CONSTRAINT book_info_cat FOREIGN KEY (isbn, school_id)
        REFERENCES book(isbn,school_id) ON  DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT category_info FOREIGN KEY (category_id)
        REFERENCES category(category_id) ON  DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (isbn,school_id,category_id)
);

CREATE TABLE users(
	user_id integer(10) NOT NULL auto_increment,
    username varchar(20) NOT NULL,
    passcode varchar(20) NOT NULL,
    user_name varchar(30) NOT NULL,
    user_surname varchar(30) NOT NULL,
    birthday date NOT NULL,
    email varchar(30) NOT NULL,
    approved boolean NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE student(
	user_id integer(10) NOT NULL,
    school_id integer(10) NOT NULL,
		CONSTRAINT student_sc FOREIGN KEY (user_id)
        REFERENCES users(user_id) ON  DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT student_in FOREIGN KEY (school_id)
        REFERENCES school(school_id) ON  DELETE CASCADE ON UPDATE CASCADE,
	PRIMARY KEY (user_id,school_id)
);

CREATE TABLE teacher(
	user_id integer(10) NOT NULL,
    school_id integer(10) NOT NULL,
		CONSTRAINT teacher_sc FOREIGN KEY (user_id)
        REFERENCES users(user_id) ON  DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT teacher_in FOREIGN KEY (school_id)
        REFERENCES school(school_id) ON  DELETE CASCADE ON UPDATE CASCADE,
	PRIMARY KEY (user_id,school_id)
);

CREATE TABLE handlers(
	user_id integer(10) NOT NULL,
    school_id integer(10) NOT NULL,
		CONSTRAINT handlers_sc FOREIGN KEY (user_id)
        REFERENCES users(user_id) ON  DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT handlers_in FOREIGN KEY (school_id)
        REFERENCES school(school_id) ON  DELETE CASCADE ON UPDATE CASCADE,
	PRIMARY KEY (user_id,school_id)
);

CREATE TABLE mastoras(
	user_id integer(10) NOT NULL,
		CONSTRAINT einai_mastoras FOREIGN KEY (user_id)
        REFERENCES users(user_id) ON  DELETE CASCADE ON UPDATE CASCADE,
	PRIMARY KEY (user_id)
);

CREATE TABLE rent(
	rent_id integer(10) NOT NULL auto_increment,
    user_id integer(10) NOT NULL,
    isbn char(10) NOT NULL,
    school_id integer(10) NOT NULL,
    date_of_rent timestamp NOT NULL,
    returned boolean NOT NULL,
    approved boolean NOT NULL,
		CONSTRAINT rent_by_user FOREIGN KEY (user_id)
        REFERENCES users(user_id) ON  DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT rented_book FOREIGN KEY (isbn,school_id)
        REFERENCES book(isbn,school_id) ON  DELETE CASCADE ON UPDATE CASCADE,
	PRIMARY KEY (rent_id)
);

CREATE TABLE reservation(
	reservation_id integer(10) NOT NULL auto_increment,
    user_id integer(10) NOT NULL,
    isbn char(10) NOT NULL,
    school_id integer(10) NOT NULL,
    date_of_reservation timestamp NOT NULL,
    approved boolean NOT NULL,
		CONSTRAINT reserved_by_user FOREIGN KEY (user_id)
        REFERENCES users(user_id) ON  DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT reserved_book FOREIGN KEY (isbn,school_id)
        REFERENCES book(isbn,school_id) ON  DELETE CASCADE ON UPDATE CASCADE,
	PRIMARY KEY (reservation_id)
);

CREATE TABLE review(
	review_id integer(10) NOT NULL auto_increment,
    user_id integer(10) NOT NULL,
    isbn char(10) NOT NULL,
    school_id integer(10) NOT NULL,
    likert integer(1) NOT NULL,
	comments varchar(255),
    approved boolean NOT NULL,
		CONSTRAINT user_who_reviewed FOREIGN KEY (user_id)
        REFERENCES users(user_id) ON  DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT book_reviewed FOREIGN KEY (isbn,school_id)
        REFERENCES book(isbn,school_id) ON  DELETE CASCADE ON UPDATE CASCADE,
	PRIMARY KEY (review_id)
);

insert into users (username, passcode, user_name, user_surname, birthday, email, approved) values ('Mastoras', 'password', 'Giorgos', 'Pittakis' , DATE '2001-10-29', 'gpittakis@gmail.com' , true);
insert into mastoras values ((select user_id from users where username = 'Mastoras'));