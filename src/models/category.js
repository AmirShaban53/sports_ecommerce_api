import sequelize from ".";
import Sequelize from "sequelize";

const Category = sequelize.define("categories", {
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
});

export default Category;
