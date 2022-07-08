import logger from "../middleware/logger";
import Product from "../models/product";
import Category from "../models/category";
import ProductCat from "../models/productCat";
import { unlink } from "fs";

const viewProducts = async (req, res) => {
  try {
    const products = await Product.findAll({ include: Category });
    logger.info("list all products");
    res.status(200).json(products);
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
      name: req.body.name,
      price: req.body.price * 100,
      rating: 3,
      images: urls,
      description: req.body.description,
    };
    if (req.body.category) {
      const createdproduct = await Product.create(newProduct);
      let categories;
      if (Array.isArray(req.body.category)) {
        categories = [...req.body.category];
      } else {
        categories = [req.body.category];
      }
      categories.forEach(async (category) => {
        try {
          const cat = await Category.findOne({ where: { name: category } });
          if (cat !== undefined || cat !== null) {
            await ProductCat.create({
              productId: createdproduct.id,
              categoryId: cat.id,
            });
          }
        } catch (error) {
          logger.error(error.message);
          return res.status(500).json({ error: error.message });
        }
      });
      logger.info("create a new product");
      return res.status(201).json("create a new product");
    } else {
      logger.error("not category found");
      return res.status(500).json("not category found");
    }
  } catch (error) {
    logger.error(error.message);
    return res.status(500).json({ error: error.message });
  }
};

const viewProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findOne({
      where: { id: id },
      include: Category,
    });
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
    const { name, price, description } = req.body;
    const images = req.files;
    let productUpdate = {};

    if (name !== undefined || name) {
      productUpdate = { ...productUpdate, name: name };
    }

    if (price !== undefined || price) {
      productUpdate = { ...productUpdate, price: price };
    }

    if (description !== undefined || description) {
      productUpdate = { ...productUpdate, description: description };
    }

    if (images !== undefined || images) {
      const product = await Product.findOne({ where: { id: id } });
      product.images.forEach((image) => {
        unlink(`./${image}`, (err) => {
          if (err) return logger.error(err);
          logger.info("image deleted");
        });
      });

      const urls = images.map((image) => {
        return image.path;
      });
      productUpdate = { ...productUpdate, images: urls };
    }

    await Product.update(productUpdate, { where: { id: id } });
    logger.info("edit a product");
    res.status(200).json("product edited");
  } catch (error) {
    logger.error(error.message);
    return res.status(500).json({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findOne({ where: { id: id } });

    product.images.forEach((image) => {
      unlink(`./${image}`, (err) => {
        if (err) return logger.error(err);
        logger.info("image deleted");
      });
    });

    await Product.destroy({ where: { id: id } });
    logger.info("delete a product");
    return res.status(200).json("delete a product");
  } catch (error) {
    logger.error(error.message);
    return res.status(500).json({ error: error.message });
  }
};

export { viewProducts, createProduct, viewProduct, editProduct, deleteProduct };
