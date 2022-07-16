import sequelize from ".";
import Sequelize from "sequelize";

import User from "./User";
import Product from "./product";

const CartItem = sequelize.define(
  "cartItem",
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
    image: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    qunatity: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
  },
  { timestamps: false }
);

User.hasMany(CartItem);
CartItem.belongsTo(User);

Product.hasMany(CartItem);
CartItem.belongsTo(Product);

export default CartItem;
