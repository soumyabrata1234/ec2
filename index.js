const express = require("express");
const data = require("./data.json");

const app = express();
const PORT = 3000;

app.use(express.json());

// ──────────────── Root ────────────────
app.get("/", (req, res) => {
  res.json({ message: "API is runninggggg", endpoints: ["/users", "/products"] });
});

app.get('/t', (req, res)=>{
   res.send("billo bage baggea daki karegi");
})

// ──────────────── Health ────────────────
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// ══════════════ USERS ══════════════

// GET all users
app.get("/users", (req, res) => {
  res.json(data.users);
});

// GET user by id
app.get("/users/:id", (req, res) => {
  const user = data.users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

// POST create user
app.post("/users", (req, res) => {
  const { name, email, age, city } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: "name and email are required" });
  }
  const newUser = {
    id: data.users.length ? data.users[data.users.length - 1].id + 1 : 1,
    name,
    email,
    age: age || null,
    city: city || null,
  };
  data.users.push(newUser);
  res.status(201).json(newUser);
});

// PUT update user
app.put("/users/:id", (req, res) => {
  const user = data.users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: "User not found" });

  const { name, email, age, city } = req.body;
  if (name) user.name = name;
  if (email) user.email = email;
  if (age) user.age = age;
  if (city) user.city = city;

  res.json(user);
});

// DELETE user
app.delete("/users/:id", (req, res) => {
  const index = data.users.findIndex((u) => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: "User not found" });

  const deleted = data.users.splice(index, 1);
  res.json({ message: "User deleted", user: deleted[0] });
});

// ══════════════ PRODUCTS ══════════════

// GET all products
app.get("/products", (req, res) => {
  res.json(data.products);
});

// GET product by id
app.get("/products/:id", (req, res) => {
  const product = data.products.find((p) => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ error: "Product not found" });
  res.json(product);
});

// POST create product
app.post("/products", (req, res) => {
  const { name, price, category, inStock } = req.body;
  if (!name || price === undefined) {
    return res.status(400).json({ error: "name and price are required" });
  }
  const newProduct = {
    id: data.products.length
      ? data.products[data.products.length - 1].id + 1
      : 1,
    name,
    price,
    category: category || null,
    inStock: inStock !== undefined ? inStock : true,
  };
  data.products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT update product
app.put("/products/:id", (req, res) => {
  const product = data.products.find((p) => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ error: "Product not found" });

  const { name, price, category, inStock } = req.body;
  if (name) product.name = name;
  if (price !== undefined) product.price = price;
  if (category) product.category = category;
  if (inStock !== undefined) product.inStock = inStock;

  res.json(product);
});

// DELETE product
app.delete("/products/:id", (req, res) => {
  const index = data.products.findIndex(
    (p) => p.id === parseInt(req.params.id)
  );
  if (index === -1)
    return res.status(404).json({ error: "Product not found" });

  const deleted = data.products.splice(index, 1);
  res.json({ message: "Product deleted", product: deleted[0] });
});

// ──────────────── Start ────────────────
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
