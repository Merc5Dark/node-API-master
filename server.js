const express = require('express')
const mongoose = require('mongoose')
// Import the Product model
const Product = require('./models/productModel')
const app = express()

// Parse incoming JSON requests and form data
app.use(express.json()) 
app.use(express.urlencoded({ extended: false })) 

// Define routes

// Default route
app.get('/', (req, res) => {
    res.send('Hello NODE API')
})

// Sample route for a blog
app.get('/blog', (req, res) => {
    res.send('Hello Blog, I love Back-End Development')
})

// Get all products
app.get('/products', async (req, res) => {
    try {
        // Retrieve all products from the database
        const products = await Product.find({}); 
        res.status(200).json(products);
    } catch (error) {
        // Handle errors and send a 500 status code with an error message
        res.status(500).json({ message: error.message }) 
    }
})

// Get a specific product by ID
app.get('/products/:id', async (req, res) => {
    try {
        // Get the product ID from the URL parameters
        const { id } = req.params; 
        const product = await Product.findById(id);
        res.status(200).json(product); 
    } catch (error) {
        // Handle errors and send a 500 status code with an error message
        res.status(500).json({ message: error.message })
    }
})

// Create a new product
app.post('/products', async (req, res) => {
    try {
        // Create a new product in the database based on the request body
        const product = await Product.create(req.body)
        // Send the newly created product as a JSON response 
        res.status(200).json(product); 
    } catch (error) {
        console.log(error.message);
        // Handle errors and send a 500 status code with an error message
        res.status(500).json({ message: error.message })
    }
})

// Update a product by ID
app.put('/products/:id', async (req, res) => {
    try {
        // Get the product ID from the URL parameter
        const { id } = req.params; s
        const product = await Product.findByIdAndUpdate(id, req.body);
        // Check if the product was found in the database
        if (!product) {
            return res.status(404).json({ message: `Cannot find any product with ID ${id}` });
        }
        const updatedProduct = await Product.findById(id);
        // Send the updated product as a JSON response
        res.status(200).json(updatedProduct);
    } catch (error) {
        // Handle errors and send a 500 status code with an error message
        res.status(500).json({ message: error.message }) 
    }
})

// Delete a product by ID
app.delete('/products/:id', async (req, res) => {
    try {
        // Get the product ID from the URL parameters
        const { id } = req.params; 
        const product = await Product.findByIdAndDelete(id); 
        // Check if the product was found in the database
        if (!product) {
            return res.status(404).json({ message: `Cannot find any product with ID ${id}` });
        }
        // Send the deleted product as a JSON response
        res.status(200).json(product); 
    } catch (error) {
        // Handle errors and send a 500 status code with an error message
        res.status(500).json({ message: error.message })
    }
})

// Disable strict query mode in Mongoose
mongoose.set("strictQuery", false) 
mongoose
    .connect('mongodb+srv://admin:admin@cluster0.fietddi.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
        console.log('Connected to MongoDB')
        app.listen(3000, () => {
            console.log(`Node API app is running on port 3000`)
        });
    })
    .catch((error) => {
        console.log(error)
    })
