import sequelize from ".";
import Sequelize from "sequelize";
import Product from "./product";
import ProductCat from "./productCat";

const Category = sequelize.define(
  "categories",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  { timestamps: false }
);

Product.belongsToMany(Category, { through: ProductCat });
Category.belongsToMany(Product, { through: ProductCat });

export default Category;
