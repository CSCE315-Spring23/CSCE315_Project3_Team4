var express = require('express');
var router = express.Router();
var db = require('./dbConn.js');
var pool = db.getPool();


const getOrdersList = (request, response) => {
  var whereClause = ""
  params = []

  if (request.params.start != null) {
    var start = request.params.start
  }
  if (request.params.end != null) {
    var end = request.params.end
  }

  if (start || end) {
    if (start && end) {
      whereClause = " WHERE ordertime BETWEEN " + start + " AND " + end
    } else {
      if (start) {
        whereClause = " WHERE ordertime >= " + start
      } else {
        whereClause = " WHERE ordertime <= " + end
      }
    }
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

const confirmOrder = (request, response) => {
  var order = request.body
  var orderid = getNewOrderId()
  for (item in order.items)
    //create orderlineitem (funtc)

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




//Function for puting newly created order into orders table

/* GET users listing. */
router.get('/', getOrdersList);
router.get('/:id', getOrderById);
router.post('/', confirmOrder)




module.exports = router;

