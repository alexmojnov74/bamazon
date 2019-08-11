DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT(4) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  qty INT(20) NOT NULL
);
INSERT INTO products (product_name, department_name, price, qty)
VALUES 	("Shampoo", "Haircare", 10.99, 10),
		    ("Shugar", "Food", 12.99, 20),
        ("Conditioner", "Haircare", 15.99, 30),
        ("Cream", "Facecare", 15.99, 40),
        ("Shoes", "Footwear", 55.99, 50)