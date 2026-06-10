                                                        APIBridge

A full-stack REST API demo. The browser frontend talks to an Express backend over four clean endpoints — GET all, GET one, POST create, DELETE. No frameworks, no build step.
![License: MIT](https://img.shields.io/badge/License-MIT-7c6cfc.svg)
![Node.js](https://img.shields.io/badge/Node.js-18%2B-22c55e)

-----------------------------------------------------

## Stack

| Layer | Tech |
|---|---|
| Frontend | HTML, CSS, Vanilla JS |
| Backend | Node.js + Express 4 |
| Data | In-memory JS array |
| HTTP Client | `fetch()` Web API |

---

## Getting Started

```bash
# 1. Install dependencies
cd backend && npm install

# 2. Start the server
npm start
# → http://localhost:3001

# 3. Open the frontend
open frontend/index.html
```

Enter `http://localhost:3001` in the base URL field and click **Connect**.

---

## API Endpoints

| Method | Route | Description |
|---|---|---|
| `GET` | `/api/products` | Return all products |
| `GET` | `/api/products/:id` | Return one product |
| `POST` | `/api/products` | Create a product |
| `DELETE` | `/api/products/:id` | Delete a product |
| `GET` | `/api/health` | Server health check |

**POST body**

```json
{
  "name": "USB-C Hub",
  "category": "Electronics",
  "price": 49.99,
  "stock": true
}
```

---

## Project Structure

```
productshelf/
├── backend/
│   ├── server.js       # Express routes + middleware
│   └── package.json
├── frontend/
│   └── index.html      # UI + fetch() calls
├── docs/
│   └── architecture.svg
├── .gitignore
├── LICENSE
└── README.md
```

---

## Architecture

![System Architecture](docs/architecture.svg)

---

## License

[MIT](LICENSE)
