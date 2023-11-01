const express =request('express');
const app = express();
const bodyParser = require('body-parser'); //For parsing request data

// Use middleware to parse JSON data in request bodies
app.use(bodyParser.json());

//Simple data store 
const items = [];

//GET endpoint to retrieve all items
app.get('/api/items', (req, res) => {
  res.json(items);  
});

// POST endpoint to create a new item
app.post('./api/items/:id', (req, res) => {
    const newItem = req.body;
    items.push(newItem);
    res.status(201).json(newItem)l;
});

