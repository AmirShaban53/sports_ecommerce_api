import sequelize from ".";
import Sequelize from "sequelize";
import Product from "./product";

const Review = sequelize.define("Review", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true,
    allowNull: false,
  },
  rating: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  message: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

Product.hasMany(Review, { onDelte: "cascade" });
Review.belongsTo(Product);

export default Review;
