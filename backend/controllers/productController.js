import Product from "../models/Product.js";

// @desc Add new product (Admin only)
export const addProduct = async (req, res) => {
  try {
    const { name, description } = req.body;
    
    // Debug: Log the file object to see what properties are available
    if (req.file) {
      console.log("File object received:", {
        path: req.file.path,
        secure_url: req.file.secure_url,
        url: req.file.url,
        public_id: req.file.public_id,
        allKeys: Object.keys(req.file)
      });
    }
    
    // CloudinaryStorage returns the URL in req.file.path (which is the secure_url)
    // Fallback to other possible properties
    const imageUrl = req.file ? (
      req.file.path || 
      req.file.secure_url || 
      req.file.url
    ) : null;

    if (!imageUrl) {
      console.error("No image URL found. req.file:", req.file);
      return res.status(400).json({ message: "Image upload failed. Please try again." });
    }

    const product = await Product.create({
      name,
      description,
      imageUrl,
      createdBy: req.user.id,
    });

    res.status(201).json({ message: "Product added", product });
  } catch (error) {
    console.error("Add product error:", error.message);
    console.error("Full error stack:", error.stack);
    res.status(500).json({ message: error.message || "Server error" });
  }
};

// @desc Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ NEW FEATURE
// @desc Search products by name (Client)
export const searchProducts = async (req, res) => {
  try {
    const { name } = req.query;

    // If no query provided, return all products
    if (!name || name.trim() === "") {
      const allProducts = await Product.find().sort({ createdAt: -1 });
      return res.json(allProducts);
    }

    // Case-insensitive partial match search
    const products = await Product.find({
      name: { $regex: name, $options: "i" },
    });

    res.json(products);
  } catch (error) {
    console.error("Search product error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc Delete product (Admin only)
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) return res.status(404).json({ message: "Product not found" });

    await product.deleteOne();
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc Toggle product availability (Admin only)
export const toggleAvailability = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product)
      return res.status(404).json({ message: "Product not found" });

    product.available = !product.available; // toggle true/false
    await product.save();

    res.json({
      message: `Product marked as ${product.available ? "available" : "unavailable"}`,
      product,
    });
  } catch (error) {
    console.error("Toggle availability error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

