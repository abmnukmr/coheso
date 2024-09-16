// server.js
const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5001;
const dbFilePath = path.join(__dirname, "data", "db.json");

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Read data from JSON file
const readData = () => {
  const data = fs.readFileSync(dbFilePath);
  return JSON.parse(data);
};

// Write data to JSON file
const writeData = (data) => {
  fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2));
};

// Routes

// Create a new request type
app.post("/api/request-types", (req, res) => {
  const requestTypes = readData().requestTypes;
  const newRequestType = req.body;
  newRequestType.id = requestTypes.length
    ? requestTypes[requestTypes.length - 1].id + 1
    : 1;
  requestTypes.push(newRequestType);
  writeData({ requestTypes });
  res.status(201).json(newRequestType);
});

// Get all request types
app.get("/api/request-types", (req, res) => {
  const requestTypes = readData().requestTypes;
  res.json(requestTypes);
});

// Get a single request type by ID
app.get("/api/request-types/:id", (req, res) => {
  const requestTypes = readData().requestTypes;
  const requestType = requestTypes.find(
    (rt) => rt.id === parseInt(req.params.id)
  );
  if (requestType) {
    res.json(requestType);
  } else {
    res.status(404).json({ message: "Request Type not found" });
  }
});

// Update a request type by ID
app.put("/api/request-types/:id", (req, res) => {
  const requestTypes = readData().requestTypes;
  const index = requestTypes.findIndex(
    (rt) => rt.id === parseInt(req.params.id)
  );
  if (index !== -1) {
    requestTypes[index] = { ...requestTypes[index], ...req.body };
    writeData({ requestTypes });
    res.json(requestTypes[index]);
  } else {
    res.status(404).json({ message: "Request Type not found" });
  }
});

// Delete a request type by ID
app.delete("/api/request-types/:id", (req, res) => {
  let requestTypes = readData().requestTypes;
  requestTypes = requestTypes.filter((rt) => rt.id !== parseInt(req.params.id));
  writeData({ requestTypes });
  res.json({ message: "Request Type deleted" });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
