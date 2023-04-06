var express = require("express");
var router = express.Router();
var db = require("./dbConn.js");
var pool = db.getPool();

/* 
- X Report
- Restock Report
- Excess Report
*/

const getXReport = (request, response) => {
    pool.query(
        "SELECT * FROM orders WHERE date_trunc('day', ordertime) = (SELECT max(date_trunc('day', ordertime)) FROM orders)",
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).json(results.rows);
        }
    );
};

/* Given a timestamp, display the list of items that only sold less than 10% of their inventory between the timestamp and the current time, assuming no restocks have happened during the window */
const getExcessReport = (request, response) => {
    if (request.query["start"] == null) {
        response.status(400).json("Missing start date");
    } else {
        let date_ob = new Date();
        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();
        startDate = request.query["start"] + " 00:00:00";
        let formattedDateTime = year + "-" + month + "-" + date + " 23:59:59";
        console.log(formattedDateTime);
        pool.query(
            "select t2.ingredientid, t1.soldqty, t2.name, t2.currAmount, t2.unit, t2.minAmount, t2.cost from (select it.ingredientid, sum(it.qty) as soldqty from inventorytransactions as it where it.ordertime between '" +
                startDate +
                "' AND '" +
                formattedDateTime +
                "' group by it.ingredientid) t1 RIGHT JOIN (select i.ingredientID, i.name, i.currAmount, i.unit, i.minAmount, i.cost from inventory as i) t2 ON t1.ingredientID = t2.ingredientID WHERE (t1.soldqty < (t2.currAmount + t1.soldqty) * 0.1) or (soldqty is NULL);",
            (error, results) => {
                if (error) {
                    throw error;
                }
                response.status(200).json(results.rows);
            }
        );
    }
};

/* Display the list of items whose current inventory is less than the item's minimum amount to have around before needing to restock */
const getRestockReport = (request, response) => {
    pool.query(
        "SELECT * from inventory WHERE CURRAMOUNT < MINAMOUNT",
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).json(results.rows);
        }
    );
};

router.get("/x-report", getXReport);
router.get("/restock-report", getRestockReport);
router.get("/excess-report", getExcessReport);
module.exports = router;
