var express = require("express");
var router = express.Router();
var db = require("./dbConn.js");
var pool = db.getPool();

/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("index", { title: "Manager Action" });
});

/* Update the quantity or the minimum ammount of the selected inventory item */
const updateInventory = (request, response) => {
    data = request.body;
    ingredientid = data["ingredientid"];
    curramount = data["curramount"];
    minamount = data["minamount"];
    if (curramount > 0 && minamount > 0) {
        pool.query(
            `update inventory set curramount=${curramount}, minamount=${minamount} where ingredientid=${ingredientid}`,
            (error, results) => {
                if (error) {
                    response.status(404).json("Error getting response");
                } else {
                    pool.query("SELECT * from inventory", (error, results) => {
                        if (error) {
                            response.status(404).json("Error getting response");
                        } else response.status(200).json(results.rows);
                    });
                }
            }
        );
    } else
        response
            .status(400)
            .json("Minimum amount and current amount is less than 0");
};

router.post("/update-inventory", updateInventory);

module.exports = router;
