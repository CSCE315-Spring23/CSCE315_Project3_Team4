var express = require('express');
var router = express.Router();
var db = require('./dbConn.js');
var pool = db.getPool();


const getMenuItemsList = (request, response) => {
  if (request.params.class != null) {
    var classId = parseInt(request.params.id)
    pool.query('SELECT * FROM menuitems WHERE classid = $1', [classId], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  } else {
    pool.query('SELECT * FROM menuitems', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
}

const getMenuItemById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM menuitems WHERE menuitemid = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

//Function for puting newly created menu item into menuitems table

/* GET users listing. */
router.get('/', getMenuItemsList);
router.get('/:id', getMenuItemById);




module.exports = router;
