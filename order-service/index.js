const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// In-memory orders
let orders = [];

app.get("/orders", (req, res) => {
    res.json(orders);
});

app.post("/orders", (req, res) => {
    const order = { id: orders.length + 1, item: req.body.item, quantity: req.body.quantity };
    orders.push(order);
    res.status(201).json(order);
});

app.listen(3000, () => console.log("Order service running on port 3000"));
