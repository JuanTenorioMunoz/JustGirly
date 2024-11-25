const orders = require("../db/entities/orders");
const { getIO } = require("../socket");

const getOrders = async (req, res) => {
  try {
    const usersResponse = await orders.getAllOrders();
    res.status(200).json(usersResponse);
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createOrder = async (req, res) => {
  try {
    const { products, direccion, number } = req.body;
    const orderCreated = await orders.createOrder({
      products,
      direccion,
      number,
    });
    res.status(200).json(orderCreated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await orders.getOrderById(id);
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateOrder = async (req, res) => {
  try {
    const { products, userId } = req.body;
    const { id } = req.params;

    const userCreated = await orders.updateOrder(id, { products, userId });
    res.status(200).json(userCreated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const userCreated = await orders.deleteOrder(id);
    res.status(200).json(userCreated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getOrders,
  createOrder,
  getOrder,
  updateOrder,
  deleteOrder,
};