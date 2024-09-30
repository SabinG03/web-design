/* 
    Assigmnet 5
    Sabin Ghet
    22499834

    Windows - Chrome
    
*/

const express = require("express");
const mongoose = require("mongoose");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files from the "public" folder
app.use(express.static("public"));

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://admin:admin123@database.bsqrbc3.mongodb.net/Database?retryWrites=true&w=majority&appName=Database"
  )
  .then(() => {
    console.log("Connected to database!");
    // Start the server
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((error) => {
    console.error("Connection failed!", error);
  });

// Product Model and Routes
const productSchema = new mongoose.Schema({
  manufacture: {
    type: String,
    required: [true, "Please enter manufacture name"],
  },
  model: {
    type: String,
    required: [true, "Please enter model"],
    default: "Unknown",
  },
  price: {
    type: Number,
    required: [true, "Please enter price"],
    default: 0,
  },
});

const Product = mongoose.model("Product", productSchema);

// Routes for Products
app
  .route("/api/products")
  // Get all products
  .get(async (req, res) => {
    try {
      const products = await Product.find({}).select("-__v");
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
  // Create a new product
  .post(async (req, res) => {
    try {
      const product = await Product.create(req.body);
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

// Routes for individual products
app
  .route("/api/products/:id")
  // Get a product by ID
  .get(async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findById(id);
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
  // Update a product by ID
  .put(async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findByIdAndUpdate(id, req.body);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      const updatedProduct = await Product.findById(id);
      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
  // Delete a product by ID
  .delete(async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findByIdAndDelete(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

// Customer Model and Routes
const customerSchema = new mongoose.Schema({
  title: String,
  name: {
    type: String,
    required: [true, "Please enter first name"],
  },
  surname: {
    type: String,
    required: [true, "Please enter surname"],
  },
  phone: {
    type: Number,
    required: [true, "Please enter mobile number"],
  },
  email: {
    type: String,
    required: [true, "Please enter email address"],
  },
  address1: {
    type: String,
    required: [true, "Please enter home address line 1"],
  },
  address2: {
    type: String,
    required: [true, "Please enter home address line 2"],
  },
  address3: {
    type: String,
    required: [true, "Please enter home address line 3"],
  },
  eircode: String,
});

const Customer = mongoose.model("Customer", customerSchema);

// Routes for Customers
app
  .route("/api/customers")
  // Get all customers
  .get(async (req, res) => {
    try {
      const customers = await Customer.find({}).select(
        "-createdAt -updatedAt -__v"
      );
      res.status(200).json(customers);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
  // Create a new customer
  .post(async (req, res) => {
    try {
      const customer = await Customer.create(req.body);
      res.status(200).json(customer);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

// Routes for individual customers
app
  .route("/api/customers/:id")
  // Get a customer by ID
  .get(async (req, res) => {
    try {
      const { id } = req.params;
      const customer = await Customer.findById(id);
      res.status(200).json(customer);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
  // Update a customer by ID
  .put(async (req, res) => {
    try {
      const { id } = req.params;
      const customer = await Customer.findByIdAndUpdate(id, req.body);
      if (!customer) {
        return res.status(404).json({ message: "Customer not found" });
      }
      const updatedCustomer = await Customer.findById(id);
      res.status(200).json(updatedCustomer);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
  // Delete a customer by ID
  .delete(async (req, res) => {
    try {
      const { id } = req.params;
      const customer = await Customer.findByIdAndDelete(id);
      if (!customer) {
        return res.status(404).json({ message: "Customer not found" });
      }
      res.status(200).json({ message: "Customer deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

// Orders Model and Routes
const orderSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: [true, "Please provide a phone number"],
  },
  quantity: {
    type: Number,
    required: [true, "Please provide quantity"],
    default: 1,
  },
  price: {
    type: Number,
    required: [true, "Please provide total price"],
    default: 0,
  },
});

const Order = mongoose.model("Order", orderSchema);

// Routes for Orders
app
  .route("/api/orders")
  // Get all orders
  .get(async (req, res) => {
    try {
      const orders = await Order.find({}).select("-__v");
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
  // Create a new order
  .post(async (req, res) => {
    try {
      const order = await Order.create(req.body);
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

// Routes for individual orders
app
  .route("/api/orders/:id")
  // Get an order by ID
  .get(async (req, res) => {
    try {
      const { id } = req.params;
      const order = await Order.findById(id);
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
  // Update an order by ID
  .put(async (req, res) => {
    try {
      const { id } = req.params;
      const order = await Order.findByIdAndUpdate(id, req.body);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      const updatedOrder = await Order.findById(id);
      res.status(200).json(updatedOrder);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
  // Delete an order by ID
  .delete(async (req, res) => {
    try {
      const { id } = req.params;
      const order = await Order.findByIdAndDelete(id);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

module.exports = app;
