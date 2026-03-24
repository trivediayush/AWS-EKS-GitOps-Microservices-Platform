const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

// In-memory orders
let orders = [];

app.get("/orders", (req, res) => {
    res.json(orders);
});

app.post("/orders", async (req, res) => {
    try {
        // 1. Fetch users
        const userResponse = await axios.get("http://user-service:5000/users");

        // 2. Add item to inventory
        const inventoryResponse = await axios.post(
            "http://inventory-service:4000/items/add",
            {
                name: req.body.item,
                stock: req.body.quantity
            }
        );

        // 3. Send notification
        await axios.post("http://notification-service:5001/notify", {
            message: `Order created for ${req.body.item}`
        });

        // 4. Create order object
        const order = {
            id: orders.length + 1,
            item: req.body.item,
            quantity: req.body.quantity,
            users: userResponse.data,
            inventory: inventoryResponse.data
        };

        orders.push(order);

        res.status(201).json(order);

    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ error: "Order processing failed" });
    }
});

app.listen(3000, () => console.log("Order service running on port 3000"));
