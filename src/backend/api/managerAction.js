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

/* Add menu item */
const addMenuItem = (request, response) => {
    data = request.body;
    menuname = data["name"]; // string
    menuprice = data["menuprice"]; // float
    menuclassid = data["classid"]; // int
    if (
        menuname.length > 0 &&
        menuprice > 0 &&
        menuclassid >= 1 &&
        menuclassid <= 5
    ) {
        pool.query(
            "select max(menuitemid) from menuitems",
            (error, results) => {
                if (error) {
                    response.status(404).json("Error get a new menuitem id");
                } else {
                    menuitemid = results.rows[0]["max"] + 1;
                    pool.query(
                        `insert into menuitems values (${menuitemid}, '${menuname}', ${menuprice}, ${menuclassid})`,
                        (error, results) => {
                            if (error) {
                                response
                                    .status(400)
                                    .json("Error create a new menu item");
                            } else
                                response
                                    .status(200)
                                    .json(
                                        `Add menu item successfully: id=${menuitemid}, name=${menuname}, price=${menuprice}, classId=${menuclassid}`
                                    );
                        }
                    );
                }
            }
        );
    } else response.status(400).json("Bad request");
};

router.post("/update-inventory", updateInventory);
router.post("/add-menu-item", addMenuItem);

module.exports = router;