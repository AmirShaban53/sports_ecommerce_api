import logger from "../middleware/logger";
import Category from "../models/category";

const listCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({});
    logger.info("list all categories");
    res.status(200).json(categories);
  } catch (error) {
    logger.error(error.message);
    return res.status(500).json(error.message);
  }
};

const addCategory = async (req, res) => {
  try {
    const newCategory = { name: req.body.category };
    await Category.create(newCategory);
    logger.info("new category created");
    res.status(200).json("new category added");
  } catch (error) {
    logger.error(error.message);
    return res.status(500).json(error);
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await Category.destroy({ where: { id: id } });
    logger.info("category deleted");
    res.status(200).json("category deleted");
  } catch (error) {
    logger.error(error.message);
    return res.status(500).json(error.message);
  }
};

export { listCategories, addCategory, deleteCategory };
