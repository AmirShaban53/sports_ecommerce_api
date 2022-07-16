import sequelize from ".";
import Sequelize from "sequelize";

const ProductCat = sequelize.define(
  "productCat",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true,
      allowNull: false,
    },
  },
  { timestamps: false }
);

export default ProductCat;
