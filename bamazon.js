console.log('\033[2J');

// var lines = process.stdout.getWindowSize()[1];
// for(var i = 0; i < lines; i++) {
//     console.log('\r\n');
// }

var mysql = require("mysql");
var inquirer = require("inquirer");
var colors = require("colors");
var Table = require("cli-table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "PASSPASS",
  database: "bamazon"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log(colors.cyan("Welcome! ...you are now connected to the Bamazon Store database as id " + connection.threadId));
  displayProducts();

});

function displayProducts() {
  connection.query('SELECT * FROM products', function (err, res) {
    if (err) throw err;

    var displayTable = new Table({
      head: ["Item ID", "Product Name", "Catergory", "Price", "Quantity"],
      colWidths: [10, 25, 25, 10, 14]
    });
    for (var i = 0; i < res.length; i++) {
      displayTable.push(
        [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].qty]
      );
    }
    console.log(displayTable.toString());

    inquirer.prompt([
      {
        type: "number",
        message: "Please enter the Product ID of the item that you would like to buy?".yellow,
        name: "id"
      },
      {
        type: "number",
        message: "How many would you like to buy?".yellow,
        name: "quantity"
      }
    ])

      .then(function (cart) {

        var quantity = cart.quantity;
        var itemID = cart.id;

        connection.query('SELECT * FROM products WHERE item_id=' + itemID, function (err, selectedItem) {
          if (err) throw err;

          if (selectedItem[0].qty - quantity >= 0) {

            console.log("========================================================================================================");

            console.log("INVENTORY: Quantity Currently in Stock: ".green + selectedItem[0].qty + " Order Quantity: ".green + quantity);

            console.log("Congratulations! Your Order of ".green + quantity + " " + selectedItem[0].product_name + " for total of $".green + (cart.quantity * selectedItem[0].price).toFixed(2).yellow + " was placed successfully");

            console.log("\nThank you for shopping at Bamazon!".magenta);

            connection.query('UPDATE products SET qty=? WHERE item_id=?', [selectedItem[0].qty - quantity, itemID])

            inquirer.prompt([
              {
                type: 'checkbox',
                name: 'confirm',
                message: "Would you like to continue shopping?".yellow,
                choices: [{ name: "Yes", checked: true },
                          { name: "No", checked: false }]
              }
            ])
              .then(function (response) {
                if (response.confirm[0] === "Yes") {
                  displayProducts();
                }
                else {
                  connection.end();
                }
              })

          }
          else {
            console.log("========================================================================================================");

            console.log("INSUFFICIENT INVENTORY ALERT: \nBamazon only has ".red + selectedItem[0].qty + " " + selectedItem[0].product_name.cyan + " in stock at this moment. \nPlease make another selection or reduce your quantity.".red);

            displayProducts();
          }
        })
      })
  });
}
