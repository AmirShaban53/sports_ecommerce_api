import sequelize from ".";
import Sequelize from "sequelize";

import Category from "./category";

const Product = sequelize.define(
  "product",
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
    price: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    images: {
      type: Sequelize.ARRAY(Sequelize.TEXT),
      allowNull: true,
    },
    rating: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
  },
  { timestamps: false }
);

Product.hasMany(Category);
Category.belongsToMany(Product);

export default Product;
