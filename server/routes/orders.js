const express = require("express");
const ordersController = require("../controllers/orders");
const router = express.Router();

// Define routes and link them to controller methods
router.get("/orders", ordersController.getOrders);
router.get("/orders/:id", ordersController.getOrder);
router.post("/orders", ordersController.createOrder);
router.put("/orders/:id", ordersController.updateOrder);
router.delete("/orders/:id", ordersController.deleteOrder);

module.exports = router;
