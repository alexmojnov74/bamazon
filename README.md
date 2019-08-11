# Node.js & MySQL

## Overview

The Week 12 Homework, creating an Amazon-like storefront with the MySQL and NODE.js. The app takes in orders from customers and deplete stock from the store's inventory. It is also tracks product sales across your store's departments and then provide a summary of the highest-grossing departments in the store.


## Instructions

### Challenge #1: Customer View (Minimum Requirement)

1. Created a MySQL Database called `bamazon`.

2. Then created a Table inside of that database called `products`.

3. The products table should have each of the following columns:

   * item_id (unique id for each product)

   * product_name (Name of product)

   * department_name

   * price (cost to customer)

   * stock_quantity (how much of the product is available in stores)

4. Populated this database with 5 different products. 

5. Created a Node application called `bamazon.js`. When App Runns it displays all of the items available for sale. Include the ids, names, and prices of products for sale.

6. The app prompt users with two messages.

   * The first should ask them the ID of the product they would like to buy.
   * The second message should ask how many units of the product they would like to buy.

7. Once the customer has placed the order, the application checks if the store has enough of the product to meet the customer's request.

   * If not, the app log a phrase `Insufficient quantity!`, and then prevent the order from going through requesting to try again.

8. If the store _does_ have enough of the product, the app fulfills the customer's order.
   * Updating the SQL database to reflect the remaining quantity.
   * Once the update goes through, showing the customer the total cost of their purchase.


### Add To The Portfolio

The link to the app has been added to my portfolio at www.alexmojnov.com

- - -

