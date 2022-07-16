import sequelize from ".";
import Sequelize from "sequelize";

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
      type: Sequelize.JSONB,
      allowNull: true,
    },
    rating: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    // categories: {
    //   type: Sequelize.ARRAY(Sequelize.STRING),
    //   allowNull: true,
    // },
  },
  { timestamps: false }
);

export default Product;
