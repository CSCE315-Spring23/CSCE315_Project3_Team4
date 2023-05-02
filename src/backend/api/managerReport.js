var express = require("express");
var router = express.Router();
var db = require("./dbConn.js");
var pool = db.getPool();

/* 
- X Report
- Restock Report
- Excess Report
- Sales Report
*/

/* Given a time window, display the sales by item from the order history */
const getSalesReport = (request, response) => {
    if (request.query["start"] == null) {
        response.status(400).json("Missing start date");
    } else if (request.query["end"] == null) {
        response.status(400).json("Missing end date");
    } else {
        let startTime = request.query["start"] + " 00:00:00";
        let endTime = request.query["end"] + " 23:59:59";
        pool.query(
            'SELECT menuitems.menuitemid as "id", menuitems.name as "Menu Item", COUNT(1) as "Quantity Sold" , ROUND(CAST(SUM(orderlineitems.menuprice) AS numeric), 2) as "Sales"\n' +
            "FROM orderlineitems \n" +
            "JOIN menuitems ON orderlineitems.menuitemID = menuitems.menuItemID JOIN orders ON orderlineitems.orderID = orders.orderID \n" +
            "WHERE orders.ordertime BETWEEN '" +
            startTime +
            "' AND '" +
            endTime +
            "' GROUP BY menuitems.name",
            (error, results) => {
                if (error) {
                    response.status(404).json(error.toString());
                } else response.status(200).json(results.rows);
            }
        );
    }
};

const getXReport = (request, response) => {
    pool.query(
        "SELECT * FROM orders WHERE date_trunc('day', ordertime) = (SELECT max(date_trunc('day', ordertime)) FROM orders)",
        (error, results) => {
            if (error) {
                response.status(404).json(error.toString());
            } else response.status(200).json(results.rows);
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
        pool.query(
            "select t2.ingredientid, t1.soldqty, t2.name, t2.currAmount, t2.unit, t2.minAmount, t2.cost from (select it.ingredientid, sum(it.qty) as soldqty from inventorytransactions as it where it.ordertime between '" +
            startDate +
            "' AND '" +
            formattedDateTime +
            "' group by it.ingredientid) t1 RIGHT JOIN (select i.ingredientID, i.name, i.currAmount, i.unit, i.minAmount, i.cost from inventory as i) t2 ON t1.ingredientID = t2.ingredientID WHERE (t1.soldqty < (t2.currAmount + t1.soldqty) * 0.1) or (soldqty is NULL);",
            (error, results) => {
                if (error) {
                    response.status(404).json(error.toString());
                } else response.status(200).json(results.rows);
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
                response.status(404).json(error.toString());
            } else response.status(200).json(results.rows);
        }
    );
};

/* Given a time window, display the sales by item from the order history */
const getSalesFrequentlyTogetherReport = (request, response) => {
    if (request.query["start"] == null) {
        response.status(400).json("Missing start date");
    } else if (request.query["end"] == null) {
        response.status(400).json("Missing end date");
    } else {
        let startTime = request.query["start"] + " 00:00:00";
        let endTime = request.query["end"] + " 23:59:59";
        pool.query(
            "select t1.firstitem, t1.seconditem, t1.concat as menuitemstogether, COUNT(t1.concat) from (SELECT a.menuitemid as firstitem, b.menuitemid as seconditem, a.orderid, CONCAT(a.menuitemid, ' ', b.menuitemid) FROM orderlineitems a JOIN orderlineitems b  ON a.orderid = b.orderid and a.menuitemid < b.menuitemid) t1 INNER JOIN (select orders.ordertime, orders.orderid from orders where orders.ordertime between '" +
            startTime +
            "' AND '" +
            endTime +
            "' group by orders.orderid) t2 ON t1.orderid = t2.orderid GROUP BY t1.firstitem, t1.seconditem, t1.concat ORDER BY COUNT(t1.concat) DESC;",
            (error, results) => {
                if (error) {
                    response.status(404).json(error.toString());
                } else response.status(200).json(results.rows);
            }
        );
    }
};

const getInventoryReport = (request, response) => {
    pool.query("SELECT * from inventory", (error, results) => {
        if (error) {
            response.status(404).json(error.toString());
        } else response.status(200).json(results.rows);
    });
};

router.get("/x-report", getXReport);
router.get("/restock-report", getRestockReport);
router.get("/excess-report", getExcessReport);
router.get("/sales-report", getSalesReport);
router.get(
    "/sales-frequently-together-report",
    getSalesFrequentlyTogetherReport
);
router.get("/inventory-report", getInventoryReport);

module.exports = router;
