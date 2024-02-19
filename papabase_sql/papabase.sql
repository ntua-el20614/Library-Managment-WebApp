DROP DATABASE IF EXISTS library_project;
CREATE USER IF NOT EXISTS 'papamaster'@'localhost' IDENTIFIED BY 'password';
CREATE DATABASE library_project;
GRANT ALL PRIVILEGES ON library_project.* TO 'papamaster'@'localhost';

USE library_project;
ALTER DATABASE library_project CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;


 CREATE TABLE school(
	school_id integer(4) NOT NULL auto_increment,
    school_name varchar(50) NOT NULL UNIQUE,
    address varchar(100) NOT NULL,
    city varchar(50) NOT NULL,
    telephone integer(15) NOT NULL,
    email varchar(70) NOT NULL,
    principal_fullname varchar(100) NOT NULL,
    PRIMARY KEY(school_id),
    INDEX idx_school_id (school_id)
);

CREATE TABLE author(
	author_id integer(4) NOT NULL auto_increment,
    author_name varchar(50) NOT NULL,
    PRIMARY KEY (author_id),
    INDEX idx_author_id (author_id)
);


CREATE TABLE category(
	category_id integer(3) NOT NULL auto_increment,
    category_name varchar(50) NOT NULL,
    PRIMARY KEY (category_id),
    INDEX idx_category_id (category_id)
);

CREATE TABLE book(
	isbn char(13) NOT NULL,
    title varchar(50) NOT NULL,
    publisher varchar(50) NOT NULL,
    pages integer(4) NOT NULL,
    summary varchar(255) NOT NULL,
    book_language varchar(20) NOT NULL,
    keywords varchar(100) NOT NULL,
    PRIMARY KEY (isbn),
	INDEX idx_isbn (isbn)
);

CREATE TABLE book_author(
	isbn char(13) NOT NULL,
	author_id integer(4) NOT NULL,
        CONSTRAINT author_wrote_book FOREIGN KEY (isbn)
        REFERENCES book(isbn) ON  DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT author_info FOREIGN KEY (author_id)
        REFERENCES author(author_id) ON  DELETE CASCADE ON UPDATE CASCADE,
        primary key(isbn, author_id),
    INDEX idx_book_author_isbn (isbn),
    INDEX idx_book_author_author_id (author_id)
);




CREATE TABLE book_school(
	isbn char(13) NOT NULL,
	school_id integer(4) NOT NULL,
    copys integer(3) NOT NULL,
    available_copys integer(3) NOT NULL,
        CONSTRAINT book_belongs_to_school FOREIGN KEY (school_id)
        REFERENCES school(school_id) ON  DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT book_in_school FOREIGN KEY (isbn)
        REFERENCES book(isbn) ON  DELETE CASCADE ON UPDATE CASCADE,
	primary key(isbn, school_id),
    INDEX idx_book_school_isbn (isbn),
    INDEX idx_book_school_school_id (school_id),
    CHECK (available_copys <= copys),
    CHECK (copys > 0),
    CHECK (available_copys >= 0)
        
);

CREATE TABLE book_category (
    isbn char(13) NOT NULL,
    category_id integer(3) NOT NULL,
		CONSTRAINT category_info FOREIGN KEY (category_id)
		REFERENCES category(category_id) ON DELETE CASCADE ON UPDATE CASCADE,
		CONSTRAINT book_belongs_to_category FOREIGN KEY (isbn)
        REFERENCES book(isbn) ON DELETE CASCADE ON UPDATE CASCADE,
	primary key(isbn, category_id),
	INDEX idx_book_category_isbn (isbn),
    INDEX idx_book_category_category_id (category_id)
);


CREATE TABLE users(
	user_id integer(4) NOT NULL auto_increment,
    username varchar(20) NOT NULL UNIQUE,
    passcode varchar(20) NOT NULL,
    user_name varchar(50) NOT NULL,
    birthday date NOT NULL,
    email varchar(50) NOT NULL,
    approved boolean NOT NULL DEFAULT 0,
    PRIMARY KEY (user_id),
    INDEX idx_user_id (user_id)
);

CREATE TABLE student(
	user_id integer(4) NOT NULL,
    school_id integer(4) NOT NULL,
		CONSTRAINT student_info FOREIGN KEY (user_id)
        REFERENCES users(user_id) ON  DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT student_in FOREIGN KEY (school_id)
        REFERENCES school(school_id) ON  DELETE CASCADE ON UPDATE CASCADE,
	PRIMARY KEY (user_id,school_id),
	INDEX idx_student_user_id (user_id),
    INDEX idx_student_school_id (school_id)
    
);

CREATE TABLE teacher(
	user_id integer(4) NOT NULL,
    school_id integer(4) NOT NULL,
		CONSTRAINT teacher_info FOREIGN KEY (user_id)
        REFERENCES users(user_id) ON  DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT teacher_in FOREIGN KEY (school_id)
        REFERENCES school(school_id) ON  DELETE CASCADE ON UPDATE CASCADE,
	PRIMARY KEY (user_id,school_id),
	INDEX idx_teacher_user_id (user_id),
    INDEX idx_teacher_school_id (school_id)
);

CREATE TABLE handlers(
	user_id integer(4) NOT NULL,
    school_id integer(4) NOT NULL,
		CONSTRAINT handlers_info FOREIGN KEY (user_id)
        REFERENCES users(user_id) ON  DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT handlers_in FOREIGN KEY (school_id)
        REFERENCES school(school_id) ON  DELETE CASCADE ON UPDATE CASCADE,
	PRIMARY KEY (user_id,school_id),
	INDEX idx_handlers_user_id (user_id),
    INDEX idx_handlers_school_id (school_id)
);

CREATE TABLE mastoras(
	user_id integer(4) NOT NULL,
		CONSTRAINT einai_mastoras FOREIGN KEY (user_id)
        REFERENCES users(user_id) ON  DELETE CASCADE ON UPDATE CASCADE,
	PRIMARY KEY (user_id),
    INDEX idx_mastoras_user_id (user_id)
);

CREATE TABLE rent(
	rent_id integer(5) NOT NULL auto_increment,
    user_id integer(4) NOT NULL,
    isbn char(13) NOT NULL,
    school_id integer(4) NOT NULL,
    date_of_rent timestamp NOT NULL,
    returned boolean NOT NULL DEFAULT 0,
    approved boolean NOT NULL DEFAULT 0,
		CONSTRAINT rent_by_user FOREIGN KEY (user_id)
        REFERENCES users(user_id) ON  DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT rented_book_from_school FOREIGN KEY (isbn,school_id)
        REFERENCES book_school(isbn,school_id) ON  DELETE CASCADE ON UPDATE CASCADE,
	PRIMARY KEY (rent_id),
    INDEX idx_rent_id (rent_id)
);

CREATE TABLE reservation(
	reservation_id integer(5) NOT NULL auto_increment,
    user_id integer(4) NOT NULL,
    isbn char(13) NOT NULL,
    school_id integer(4) NOT NULL,
    date_of_reservation timestamp NOT NULL,
    approved boolean NOT NULL DEFAULT 0,
		CONSTRAINT reserved_by_user FOREIGN KEY (user_id)
        REFERENCES users(user_id) ON  DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT reserved_book_from_school FOREIGN KEY (isbn,school_id)
        REFERENCES book_school(isbn,school_id) ON  DELETE CASCADE ON UPDATE CASCADE,
	PRIMARY KEY (reservation_id),
    INDEX idx_reservation_id (reservation_id)
);

CREATE TABLE review(
	review_id integer(5) NOT NULL auto_increment,
    user_id integer(4) NOT NULL,
    isbn char(13) NOT NULL,
    school_id integer(4) NOT NULL,
    likert integer(1) NOT NULL,
	comments varchar(255) NOT NULL,
    approved boolean NOT NULL DEFAULT 0,
		CONSTRAINT reviewe_by_user FOREIGN KEY (user_id)
        REFERENCES users(user_id) ON  DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT reviewed_book_from_school FOREIGN KEY (isbn,school_id)
        REFERENCES book_school(isbn,school_id) ON  DELETE CASCADE ON UPDATE CASCADE,
	PRIMARY KEY (review_id),
    INDEX idx_review_id (review_id)
);