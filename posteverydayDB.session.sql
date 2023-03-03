-- block
CREATE TABLE Posts(
    id INT AUTO_INCREMENT,
    title VARCHAR(60) NOT NULL,
    text TEXT NOT NULL,
    image VARCHAR(60) NOT NULL,
    date: DATETIME NOT NULL,
    author_firstname varchar(20) NOT NULL,
    author_lastname varchar(20) NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(author_firstname) REFERENCES Users(first_name),
    FOREIGN KEY(author_lastname) REFERENCES Users(last_name),
)