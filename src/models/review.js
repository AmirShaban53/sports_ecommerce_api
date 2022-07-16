import sequelize from ".";
import Sequelize from "sequelize";

import User from "./User";
import Product from './product'

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

Product.hasMany(Review);
Review.belongsTo(Product);

User.hasMany(Review);
Review.belongsTo(User);

export default Review;
