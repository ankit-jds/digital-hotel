const express = require('express');
const exhandlebars = require('express-handlebars')
const multer = require('multer')
const path = require('path')
const util = require('util');
const mysql = require('mysql');

// MySql 
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  // password: 'password',
  database: 'digital_hotel'
});

const query = util.promisify(connection.query).bind(connection);


// (async function () {
//   await connection.connect((err) => {
//     if (err) throw err
//     else console.log("MySql connected....");
//   })
// })()

function getData(table, condition) {
  let sql = `SELECT * FROM ${table} ${condition} `
  return query(sql)
    .then((result) => {
      if (table === "orders") {
        return (async () => {
          for (let index = 0; index < result.length; index++) {
            console.log(result.length, "for loop");
            const orderString = result[index];
            const orderObj = JSON.parse(orderString.order_list);
            // console.log(orderObj);
            let orderObjIds = Object.keys(orderObj)
            orderObjIds.forEach((element, index, array) => {
              console.log(element, typeof (element));
              array[index] = element.slice(4)
            })
            let condition = `WHERE id IN (${orderObjIds.join()})`;
            var dishes = await getData('menu', condition)
            // console.log(dishes);
            // console.log(JSON.stringify(dishes));
            result[index].order_list = orderObj
            result[index].dishes = dishes
            console.log("resultss");
          }
          console.log("returning");
          return result
        })()
      } else {
        console.log("else returns");
        return result
      }
    })
    .catch((err) => {
      console.error(err);
    })
}

function dishOrdered(order_list) {

}

// console.log(123, getData());
function insertData(order) {
  console.log("func started");
  let Name = order.name;
  let table_no = order.table_no;
  let order_list=order.order_list;
  let sql = `INSERT INTO orders (Name,table_no,order_list) VALUES ('${Name}',${table_no},'${order_list}')`;
  return query(sql)
    .then((result) => {
      console.log("Data is inserted....");
    })
    .catch(err => console.error(err))
}


// Initialising Express app
const app = express();

// Setting port to listen on..
const port = process.env.PORT || 5000;

// Setting view engine as handlebars for templates
app.engine('handlebars', exhandlebars());
app.set('view engine', "handlebars");

var exhbs = exhandlebars.create({});
exhbs.handlebars.registerHelper('parseOrders', (orders) => {
  code = ``
  console.log(orders, "orders");

  orders.forEach(element => {
    console.log(element, "eleement");
    code += ` OrderID: ${element.order_id} <br> `
    console.log(element.order_id);

    code += ` Name: ${element.name} <br> `
    console.log(element.name);

    code += ` Table No: ${element.table_no} <br> `
    console.log(element.table_no);

    element.dishes.forEach(dish => {
      code += ` Dish Name: ${dish.name} `
      code += ` Quantity: ${element.order_list["dish" + dish.id]} <br> `
      console.log("dish" + dish.id);
      console.log(element.order_list["dish" + dish.id]);
    })
    code += `<br><br>`
  });
  
  return new exhbs.handlebars.SafeString(code)

})


// Middlewares for express app
// body-parser  
app.use(express.urlencoded({ extended: false }))

// multer to get multi-form type data
app.use(multer().array())

// setting "public" as look up directory for static files 
app.use(express.static('public'))

// Routing to routes.js file for routes
app.use('/', require(path.join(__dirname, "routes/routes.js")))

// listening on port...
app.listen(port, () => console.log(`Listening on http://localhost:${port}`))

module.exports = { getData, insertData }