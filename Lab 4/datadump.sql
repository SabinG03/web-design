--Assigmnet 4
--Sabin Ghet
--22499834

--Windows - Chrome



CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(10),
    name VARCHAR(50),
    surname VARCHAR(50),
    email VARCHAR(100),
    phone VARCHAR(20),
    address1 VARCHAR(100),
    address2 VARCHAR(100),
    address3 VARCHAR(100),
    eircode VARCHAR(20)
);

INSERT INTO user (title, name, surname, email, phone, address1, address2, address3, eircode) VALUES
('Mr', 'John', 'Smith', 'john@outlook.com', '876543210', '123 Main Street', 'Apt 101', 'Dublin', 'D15EY9P'),
('Ms', 'Emily', 'Johnson', 'emily@gmail.com', '854321098', '456 Park Avenue', 'Suite 202', 'Cork', 'C15FK2R'),
('Mrs', 'Michael', 'Williams', 'michael@yahoo.com', '865432109', '789 Elm Road', 'Unit 303', 'Galway', 'F15GP4Q'),
('Dr', 'Sophia', 'Brown', 'sophia@outlook.com', '832109876', '987 Cedar Street', 'Floor 2', 'Limerick', 'G15HQ3S'),
('Miss', 'James', 'Jones', 'james@gmail.com', '898765432', '654 Oak Lane', 'Apartment 404', 'Waterford', 'H15IR2T'),
('Mr', 'Olivia', 'Garcia', 'olivia@yahoo.com', '812345678', '321 Pine Road', 'Suite 505', 'Drogheda', 'I15JS1U'),
('Mrs', 'Robert', 'Miller', 'robert@outlook.com', '887654321', '456 Maple Street', 'Unit 606', 'Wexford', 'J15KT9V'),
('Miss', 'David', 'Davis', 'david@gmail.com', '843210987', '789 Elm Avenue', 'Floor 707', 'Sligo', 'K15LU8W'),
('Dr', 'Grace', 'Rodriguez', 'grace@yahoo.com', '821098765', '987 Cedar Lane', 'Apartment 808', 'Dundalk', 'L15MV7X'),
('Prof', 'Emma', 'Martinez', 'emma@outlook.com', '890987654', '123 Park Road', 'Suite 909', 'Donegal', 'M15NW6Y'),
('Mr', 'Liam', 'Murphy', 'liam@gmail.com', '876543210', '123 Main Street', 'Apt 101', 'Dublin', 'N15OX5Z'),
('Ms', 'Aoife', 'Kelly', 'aoife@yahoo.com', '854321098', '456 Park Avenue', 'Suite 202', 'Cork', 'O15PY4A'),
('Mrs', 'Sean', 'Walsh', 'sean@outlook.com', '865432109', '789 Elm Road', 'Unit 303', 'Galway', 'P15QZ3B'),
('Dr', 'Ciara', 'Byrne', 'ciara@gmail.com', '832109876', '987 Cedar Street', 'Floor 2', 'Limerick', 'R15SA2C'),
('Miss', 'Cian', 'Ryan', 'cian@yahoo.com', '898765432', '654 Oak Lane', 'Apartment 404', 'Waterford', 'S15TB1D'),
('Mr', 'Sarah', 'McCarthy', 'sarah@outlook.com', '876543210', '123 Main Street', 'Apt 101', 'Dublin', 'T15UC0E'),
('Ms', 'Niamh', 'O\'Brien', 'niamh@gmail.com', '854321098', '456 Park Avenue', 'Suite 202', 'Cork', 'U15VD9F'),
('Mrs', 'Daniel', 'O\'Neill', 'daniel@yahoo.com', '865432109', '789 Elm Road', 'Unit 303', 'Galway', 'V15WE8G'),
('Dr', 'Saoirse', 'O\'Connor', 'saoirse@outlook.com', '832109876', '987 Cedar Street', 'Floor 2', 'Limerick', 'W15XF7H'),
('Prof', 'Fionn', 'O\'Reilly', 'fionn@gmail.com', '890987654', '123 Park Road', 'Suite 909', 'Donegal', 'X15YG6I');
