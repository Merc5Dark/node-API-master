const mongoose = require('mongoose')

// Define the product schema using mongoose.Schema
const productSchema = mongoose.Schema(
    {
        // Define the 'name' field for the product, which is a string and is required.
        name: {
            type: String,
            required: [true, "Please enter a product name"]
        },
        // Define the 'quantity' field for the product, which is a number and is required, with a default value of 0.
        quantity: {
            type: Number,
            required: true,
            default: 0
        },
        // Define the 'price' field for the product, which is a number and is required.
        price: {
            type: Number,
            required: true,
        },
        // Define the 'image' field for the product, which is a string and is not required.
        image: {
            type: String,
            required: false,
        }
    },
    {
        // Add timestamps to automatically track 'createdAt' and 'updatedAt' fields for each product.
        timestamps: true
    }
)

// Create a Mongoose model named 'Product' based on the product schema.
const Product = mongoose.model('Product', productSchema);

// Export the 'Product' model so it can be used in other parts of your application.
module.exports = Product;
