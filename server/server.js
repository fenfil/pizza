const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const refreshSecret = "dont use this";
const accessSecret = "dont use this";

const app = express();

const orders = {};
const users = {};
const tokens = {};
const pizzas = [
  {
    id: 1,
    url:
      "https://dodopizza-a.akamaihd.net/static/Img/Products/4516c60c26ea4684ae2ed9a520b51906_584x584.jpeg",
    price: 5,
    title: "Caesar"
  },
  {
    id: 2,
    url:
      "https://dodopizza-a.akamaihd.net/static/Img/Products/548f06002e5d46c699245285d5f4b1cc_584x584.jpeg",
    price: 5.5,
    title: "Pesto"
  },
  {
    id: 3,
    url:
      "https://dodopizza-a.akamaihd.net/static/Img/Products/Pizza/ru-RU/2ffc31bb-132c-4c99-b894-53f7107a1441.jpg",
    price: 3,
    title: "Cheese"
  },
  {
    id: 4,
    url:
      "https://dodopizza-a.akamaihd.net/static/Img/Products/Pizza/ru-RU/ec29465e-606b-4a04-a03e-da3940d37e0e.jpg",
    price: 7,
    title: "Four seasons"
  },
  {
    id: 5,
    url:
      "https://dodopizza-a.akamaihd.net/static/Img/Products/f57b939a4455453daade38016f61d766_584x584.jpeg",
    price: 4,
    title: "Pepperoni"
  },
  {
    id: 6,
    url:
      "https://dodopizza-a.akamaihd.net/static/Img/Products/Pizza/ru-RU/af553bf5-3887-4501-b88e-8f0f55229429.jpg",
    price: 5.1,
    title: "Sweet and sour chicken"
  },
  {
    id: 7,
    url:
      "https://dodopizza-a.akamaihd.net/static/Img/Products/b1ffa66f2ebb4e959122e54eaa071109_584x584.jpeg",
    price: 4.5,
    title: "Ham and mushrooms"
  },
  {
    id: 8,
    url:
      "https://dodopizza-a.akamaihd.net/static/Img/Products/1959b0fdf5f049fb9ec12cf05d535bc7_584x584.jpeg",
    price: 6,
    title: "Cheeseburger"
  }
];

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const auth = (restrictGuest = false) => (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) return next();

  const [bearer, token] = header.split(" ");
  try {
    const { sub } = jwt.verify(token, refreshSecret);
    req.user = users[sub];
    if (restrictGuest && !req.user)
      return res.status(401).send("Not authorized");

    next();
  } catch (error) {
    return res.status(422).send("Invalid token");
  }
};

app.get("/pizza", (req, res) => {
  res.json(pizzas);
});

app.get("/rates", (req, res) => {
  res.json({
    eurPerUsd: 0.9
  });
});

app.get("/history", auth(true), (req, res) => {
  if (!orders[req.user.name]) return res.json([]);
  res.json(
    orders[req.user.name].map(order =>
      order.map(data => {
        const pizza = pizzas.find(p => p.id == data.id);
        return { ...pizza, order: data.amount };
      })
    )
  );
});

app.post("/order", auth(), (req, res) => {
  if (req.user) {
    if (orders[req.user.name]) {
      orders[req.user.name].push(req.body);
    } else {
      orders[req.user.name] = [req.body];
    }
  }

  res.json({});
});

app.get("/user", auth(), (req, res) => {
  const user = req.user;
  res.json(user);
});

app.post("/refresh", (req, res) => {
  const token = req.body.refreshToken;
  if (tokens[token]) {
    const accessToken = jwt.sign(
      {
        sub: name,
        exp: Math.floor(Date.now() / 1000) + 30 * 60
      },
      accessSecret
    );
    const refreshToken = jwt.sign(
      {
        sub: name,
        exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60
      },
      refreshSecret
    );
    tokens[refreshToken] = name;
    res.json({
      accessToken,
      refreshToken
    });
    delete tokens[token];
  } else {
    res.status(422).send("Invalid token");
  }
});

app.post("/login", (req, res) => {
  const name = req.body.name;
  const password = req.body.password;
  const user = users[name];
  if (!user || user.password !== password)
    return res.status(422).send("User not exists");

  const accessToken = jwt.sign(
    {
      sub: name,
      exp: Math.floor(Date.now() / 1000) + 30 * 60
    },
    accessSecret
  );
  const refreshToken = jwt.sign(
    {
      sub: name,
      exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60
    },
    refreshSecret
  );
  tokens[refreshToken] = name;
  res.json({
    accessToken,
    refreshToken
  });
});

app.post("/register", (req, res) => {
  const { name } = req.body;

  const user = users[name];
  if (user) return res.status(422).send("User exists");

  users[name] = req.body;

  const accessToken = jwt.sign(
    {
      sub: name,
      exp: Math.floor(Date.now() / 1000) + 30 * 60
    },
    accessSecret
  );
  const refreshToken = jwt.sign(
    {
      sub: name,
      exp: Math.floor(Date.now() / 1000) + 7 * 30 * 60
    },
    refreshSecret
  );
  tokens[refreshToken] = name;
  res.json({
    accessToken,
    refreshToken
  });
});
app.listen(3001, () => console.log("listening on 3001"));
