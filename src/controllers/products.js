import logger from "../middleware/logger";
import Product from "../models/product";

const viewProducts = async (req, res) => {
  try {
    const products = await Product.findAll({});
    logger.info("list all products");
    res.status(200).json({ products: products });
  } catch (error) {
    logger.error(error.message);
    return res.status(500).json({ error: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const urls = req.files.map((image) => {
      return image.path;
    });
    const newProduct = {
      name: "name",
      price: 15,
      rating: 3,
      images: urls,
      description: "this is a product",
      categories: ["cat1", "cat2", "cat3"],
    };
    await Product.create(newProduct);

    logger.info("create a new product");
    res.status(201).json("create a new product");
  } catch (error) {
    logger.error(error.message);
    return res.status(500).json({ error: error.message });
  }
};

const viewProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findOne({ where: { id: id } });
    logger.info("view a product");
    res.status(200).json({ product: product });
  } catch (error) {
    logger.error(error.message);
    return res.status(500).json({ error: error.message });
  }
};

const editProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const productUpdate = {};
    await Product.update(productUpdate, { where: { id: id } });
    logger.info("edit a product");
    res.status(200).json("edit a product");
  } catch (error) {
    logger.error(error.message);
    return res.status(500).json({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findOne({ where: { id: id } });
    if (product) {
      await Product.destroy({ where: { id: id } });
      logger.info("delete a product");
      return res.status(200).json("delete a product");
    } else {
      logger.info("delete a product");
      return res.status(500).json("product not found in database");
    }
  } catch (error) {
    logger.error(error.message);
    return res.status(500).json({ error: error.message });
  }
};

export { viewProducts, createProduct, viewProduct, editProduct, deleteProduct };
