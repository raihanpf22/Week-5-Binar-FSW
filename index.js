const express = require("express");
const handler = require("./handler");

const PORT = process.env.PORT || 8000;
const app = express();

// Pasang JSON Parser middleware
app.use(express.json());

app.get("/users", handler.handleListUsers);
app.post("/users", handler.handleCreateUser);
app.get("/users/:id", handler.handleGetByIdUser);
app.put("/users/:id", handler.handleUpdateByIdUser);
app.delete("/users/:id", handler.handleDeleteUser)

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
