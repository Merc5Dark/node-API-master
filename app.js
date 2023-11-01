const express = require('express');
const app = express();
const bodyParser = require('body-parser'); // For parsing request data

// Use middleware to parse JSON data in request bodies
app.use(bodyParser.json());

// Simple data store
const items = [];

// GET endpoint to retrieve all items
app.get('/api/items', (req, res) => {
  res.json(items);
});

// POST endpoint to create a new item
app.post('/api/items', (req, res) => {
  const newItem = req.body;
  items.push(newItem);
  res.status(201).json(newItem);
});

// DELETE endpoint to remove an item by its ID
app.delete('/api/items/:id', (req, res) => {
  const id = req.params.id;
  const index = items.findIndex(item => item.id === id);

  if (index === -1) {
    res.status(404).json({ message: 'Item not found' });
  } else {
    items.splice(index, 1);
    res.json({ message: 'Item deleted' });
  }
});

// PUT endpoint to update an existing item
app.put('/api/items/:id', (req, res) => {
  const id = req.params.id;
  const updateItem = req.body;
  const index = items.findIndex(item => item.id === id);

  if (index === -1) {
    res.status(404).json({ message: 'Item not found' });
  } else {
    items[index] = updateItem;
    res.json(updateItem);
  }
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
