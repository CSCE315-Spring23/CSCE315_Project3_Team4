var express = require("express");
var router = express.Router();
var db = require("./dbConn.js");
var pool = db.getPool();

const getMenuItemsList = (request, response) => {
    if (request.query.class != null) {
        const classId = request.query.class;
        pool.query(
            "SELECT menuitemid as 'id', name, menuprice, classid FROM menuitems WHERE classid = $1 ORDER BY menuitemid",
            [classId],
            (error, results) => {
                if (error) {
                    response
                        .status(404)
                        .json(
                            `Error getting menu items with class id=${classId}`
                        );
                } else response.status(200).json(results.rows);
            }
        );
    } else {
        pool.query(
            "SELECT menuitemid as 'id', name, menuprice, classid FROM menuitems ORDER BY menuitemid",
            (error, results) => {
                if (error) {
                    response.status(404).json("Error getting menu items");
                } else response.status(200).json(results.rows);
            }
        );
    }
};

const getMenuItemById = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query(
        "SELECT * FROM menuitems WHERE menuitemid = $1",
        [id],
        (error, results) => {
            if (error) {
                response
                    .status(404)
                    .json(`Error getting menu item by id=${id}`);
            } else response.status(200).json(results.rows);
        }
    );
};

//Function for puting newly created menu item into menuitems table

/* GET users listing. */
router.get("/", getMenuItemsList);
router.get("/:id", getMenuItemById);

module.exports = router;
