const express = require("express");
const restaurants = require("./data/restaurants.json");
const menus = require("./data/menus.json");
const offers = require("./data/offers.json");

let offerCounter = 1;
const app = express();

app.use(express.static("public"));
app.use(express.json());


const PORT = process.env.PORT || 80;

app.get("/restaurants", (req, res) => {
    res.send( restaurants );
});

// get sectors
app.get("/menus/:id", (req, res) => {
    res.send( menus.filter(m => m.restaurant_id == req.params.id) );
});

app.get("/offers", (req, res) => {
  offerCounter++;
  const currentOffers = offers.filter((offer) => offer.id <= offerCounter);
  res.send(currentOffers || []);
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


