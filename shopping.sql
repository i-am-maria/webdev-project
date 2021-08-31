CREATE TABLE list (
	name varchar(50) primary key,
    itemType varchar(50),
    quantity integer
);

CREATE TABLE users (
	username varchar(50) primary key,
	password varchar(50),
    role varchar(50)
);

INSERT INTO users VALUES ('user','password','parent');
INSERT INTO users VALUES ('Shane','password', 'parent');
INSERT INTO users VALUES ('Kevin', 'password', 'child');

INSERT INTO list VALUES ('Apple', 'Fresh produce', 2);
INSERT INTO list VALUES ('Rolls', 'Bakery', 100);
INSERT INTO list VALUES ('Milk', 'Bakery', 3);
INSERT INTO list VALUES ('Impossible burger', 'Meat', 1);
INSERT INTO list VALUES ('Flour', 'Food cupboard', 7);
INSERT INTO list VALUES ('Chips', 'Frozen', 2);
INSERT INTO list VALUES ('Chocolate', 'Sweets', 6);