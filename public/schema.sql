DROP DATABASE bookdb;
CREATE DATABASE bookdb;

CREATE TABLE books (
id SERIAL PRIMARY KEY,
title VARCHAR(255),
author VARCHAR(255),
isbn VARCHAR(255),
image_url VARCHAR(255),
description VARCHAR(255),
bookshelf VARCHAR(255)
);

INSERT INTO books (title,author,isbn,image_url,description) VALUES('A Series of Unfortunate Events: Lemony Snicket','Lemony Snicket','1234789987564','https://books.google.com/books/content?id=X1T6qlyzMC0C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api','A Warning from the Publisher: Many readers have questions about Lemony Snicket, author of the distressing cerial.')
INSERT INTO books (title,author,isbn,image_url,description) VALUES('A Series of Unfortunate Events: LOREM IPSUM','Lemony IPSUM','1234789987564','https://books.google.com/books/content?id=X1T6qlyzMC0C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api','BOOK DESCRIPTION LOREM IPSUM')