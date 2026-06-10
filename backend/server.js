// server.js — Express REST API
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ─── In-memory data store ─────────────────────────────────────────────────────
let products = [
  {
    id: 1,
    name: "Mechanical Keyboard",
    category: "Electronics",
    price: 129.99,
    inStock: true,
    createdAt: "2025-01-10T09:00:00Z",
  },
  {
    id: 2,
    name: "Standing Desk",
    category: "Furniture",
    price: 349.0,
    inStock: true,
    createdAt: "2025-02-14T12:30:00Z",
  },
  {
    id: 3,
    name: "USB-C Hub",
    category: "Electronics",
    price: 49.95,
    inStock: false,
    createdAt: "2025-03-05T15:45:00Z",
  },
];

let nextId = 4;

// ─── Routes ───────────────────────────────────────────────────────────────────

// Health check
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "REST API is running",
    endpoints: [
      "GET  /api/products       — list all products",
      "GET  /api/products/:id   — get one product",
      "POST /api/products       — create a product",
    ],
  });
});

// GET /api/products — return all products (with optional ?category= filter)
app.get("/api/products", (req, res) => {
  const { category } = req.query;
  const result = category
    ? products.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      )
    : products;

  res.json({
    success: true,
    count: result.length,
    data: result,
  });
});

// GET /api/products/:id — return a single product
app.get("/api/products/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({ success: false, message: "Product not found" });
  }

  res.json({ success: true, data: product });
});

// POST /api/products — create a new product
app.post("/api/products", (req, res) => {
  const { name, category, price, inStock } = req.body;

  // Basic validation
  if (!name || !category || price == null) {
    return res.status(400).json({
      success: false,
      message: "name, category, and price are required",
    });
  }

  const newProduct = {
    id: nextId++,
    name: String(name).trim(),
    category: String(category).trim(),
    price: parseFloat(price),
    inStock: inStock !== undefined ? Boolean(inStock) : true,
    createdAt: new Date().toISOString(),
  };

  products.push(newProduct);

  res.status(201).json({ success: true, data: newProduct });
});

// ─── 404 fallback ─────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// ─── Start ────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀  Server running at http://localhost:${PORT}`);
  console.log(`   GET  /api/products`);
  console.log(`   GET  /api/products/:id`);
  console.log(`   POST /api/products\n`);
});