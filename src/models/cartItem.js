import sequelize from ".";
import Sequelize from "sequelize";

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
    qunatity: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
  },
  { timestamps: false }
);

export default CartItem;
