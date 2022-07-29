require("dotenv").config();
console.log(process.env);
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const app = express();

app.use(express.json());
app.post("/payment", async (req, res) => {
    // get details from the JSON body
    const { token, items } = req.body;
    if (typeof token !== "string") {
        res.status(400).json({ error: "missing string token" });
        return;
    }

    let amount = 0;
    for (const [itemname, quantity] of Object.entries(items)) {
        // verify that the itemname actually exists and get the real price from the database,
        const item_price = await getItemPrice(itemname);
        if (item_price === null) {
            res.status(400).json({ error: `item "${itemname} does not exist` });
            return;
        }

        amount += item_price * quantity;
    }

    if (isNaN(amount)) {
        res.status(400).json({ error: "invalid amount" });
        return;
    }

    if (amount === 0) {
        res.status(400).json({ error: "nothing to pay for" });
        return;
    }

    // if the real amount does not match the requested amount, then we need to
    // return an error because this would likely mean either the cart has been
    // tampered with or that there is a bug in the code, and the client would
    // end up paying a different amount than what they're seeing on the pay
    // screen.
    if (amount !== req.body.amount) {
        res.status(400).json({ error: "amount mismatch" });
        return;
    }

    res.status(200).json({
        message: "TODO - payment successful",
        amount: amount,
    });
    return;

    // create a charge on Stripe's servers - this will charge the user's card
    // amount is in cents
    //stripe.charges.create({
    //    amount,
    //    currency: 'usd',
    //    source: token,
    //    description: 'Test charge'
    //}, (err, charge) => {
    //    if (err) {
    //        return res.status(500).send({ error: err.message });
    //    }
    //    res.send({ message: 'Success!', charge });
    //});

});

function getItemPrice(name) {
    // TODO - get actual prices
    const items = {
        "item1": 10,
        "item2": 20,
    };
    if (typeof items[name] === "undefined") {
        return Promise.resolve(null);
    }
    return Promise.resolve(items[name]);
}

app.listen(3000, () => {
    console.log('Listening on port 3000');
});
