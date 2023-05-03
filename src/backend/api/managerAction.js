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
    data = JSON.parse(JSON.stringify(request.body));
    ingredientid = data["ingredientid"];
    curramount = data["curramount"];
    minamount = data["minamount"];
    if (curramount > 0 && minamount > 0) {
        pool.query(
            `update inventory set curramount=${curramount}, minamount=${minamount} where ingredientid=${ingredientid}`,
            (error, results) => {
                if (error) {
                    response.status(404).json("Error update inventory item");
                } else {
                    pool.query("SELECT * from inventory", (error, results) => {
                        if (error) {
                            response.status(404).json(error.toString());
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
    data = JSON.parse(JSON.stringify(request.body));
    menuname = data["name"]; // string
    menuprice = parseFloat(["menuprice"]); // float
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
                    response.status(404).json(error.toString());
                } else {
                    menuitemid = results.rows[0]["max"] + 1;
                    pool.query(
                        `insert into menuitems values (${menuitemid}, '${menuname}', ${menuprice}, ${menuclassid})`,
                        (error, results) => {
                            if (error) {
                                response.status(400).json(error.toString());
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

/* Update menu item */
const updateMenuItem = (request, response) => {
    data = JSON.parse(JSON.stringify(request.body));
    console.log("backend", data);
    menuitemid = data["menuitemid"]; // int
    menuprice = parseFloat(data["menuprice"]); // float
    if (menuitemid > 0 && menuprice > 0) {
        pool.query(
            `update menuitems set menuprice=${menuprice} where menuitemid=${menuitemid}`,
            (error, results) => {
                if (error) {
                    response.status(404).json(error.toString);
                } else {
                    pool.query(
                        "SELECT * FROM menuitems ORDER BY menuitemid",
                        (error, results) => {
                            if (error) {
                                response.status(404).json(error.toString());
                            } else response.status(200).json(results.rows);
                        }
                    );
                }
            }
        );
    } else response.status(400).json("Bad request");
};

/* delete menu item */
const deleteMenuItem = (request, response) => {
    data = JSON.parse(JSON.stringify(request.body));
    menuitemid = data["menuitemid"]; // int
    if (menuitemid > 0) {
        pool.query(
            `DELETE from menuitems WHERE menuitemid=${menuitemid}`,
            (error, results) => {
                if (error) {
                    response.status(404).json(error.toString());
                } else {
                    pool.query(
                        "SELECT * FROM menuitems ORDER BY menuitemid",
                        (error, results) => {
                            if (error) {
                                response.status(404).json(error.toString());
                            } else response.status(200).json(results.rows);
                        }
                    );
                }
            }
        );
    } else response.status(400).json("Bad request");
};

router.post("/update-inventory", updateInventory);
router.post("/add-new-menu-item", addMenuItem);
router.post("/update-menu-item", updateMenuItem);
router.post("/delete-menu-item", deleteMenuItem);

module.exports = router;
