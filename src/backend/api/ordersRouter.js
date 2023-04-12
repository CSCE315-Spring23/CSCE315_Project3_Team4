var express = require('express');
var router = express.Router();
var db = require('./dbConn.js');
var pool = db.getPool();


const getOrdersList = (request, response) => {
  var whereClause = ""
  params = []

  if (request.query.start != null) {
    var start = request.query.start
    params.push(start)
    whereClause = " WHERE ordertime >= $1"
  }
  if (request.query.end != null) {
    var end = request.query.end
    params.push(end)
    whereClause = " WHERE ordertime <= $1"
  }

  if (params.length == 2) {
    whereClause = " WHERE ordertime BETWEEN $1 AND $2"
  }

  pool.query('SELECT * FROM orders' + whereClause, params, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getOrderById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM orders WHERE orderid = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getOLIList = (request, response) => {
  var whereClause = ""
  params = []

  if (request.params.orderid != null) {
    var orderId = request.params.orderid
    whereClause = " WHERE orderid = "
    params.push(orderId)
  }

  pool.query('SELECT * FROM orderlineitems' + whereClause, params, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getOLIById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM orderlineitems WHERE orderlineitemid = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const confirmOrder = (request, response) => {
  var order = request.body
  var orderId = getNewOrderId()
  var timestamp = ""
  var totalPrice = 0.0
  var orderLineItemId = getNewOrderLineItemId()
  for (item in order.items) {
    var itemPrice = getItemPrice(item.menuitemid).toFixed(2)
    orderLineItemId++
    totalPrice += itemPrice
  }
  insertIntoOLI([orderLineItemId, item.menuitemid, itemPrice, orderId])
  insertIntoOrders([orderId, timestamp, totalPrice.toFixed(2), order.employeeId])
  updateInventoryAndInventoryTransactions(orderId)
}

const getNewOrderId = () => {
  var newId = null
  pool.query('SELECT max(orderid) + 1 as newid FROM orders', (error, results) => {
    if (error) {
      throw error
    }
    newId = results.rows[0].newid
  })
  return newId
}

const getNewOrderLineItemId = () => {
  var newId = null
  pool.query('SELECT max(orderid) + 1 as newid FROM orders', (error, results) => {
    if (error) {
      throw error
    }
    newId = results.rows[0].newid
  })
  return newId
}

const getItemPrice = (menuId) => {
  var price = null
  pool.query('SELECT menuPrice as price FROM menuitems WHERE menuItemID = $1', [menuId], (error, results) => {
    if (error) {
      throw error
    }
    price = results.rows[0].price
  })
  return price
}

const insertIntoOLI = (params) => {
  pool.query('INSERT INTO orderlineitems VALUES ($1, $2, $3, $4)', params, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(getOLIById(params[0]))
  })
}

const insertIntoOrders = (params) => {
  pool.query('INSERT INTO orders VALUES ($1, $2, $3, $4)', params, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(getOrderById(params[0]))
  })
}

const updateInventoryAndInventoryTransactions = (orderId) => {

}





//Function for puting newly created order into orders table

/* GET users listing. */
router.get('/', getOrdersList);
router.get('/:id', getOrderById);
router.post('/', confirmOrder)




module.exports = router;

