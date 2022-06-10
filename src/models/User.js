import sequelize from ".";
import Sequelize from "sequelize";

const User = sequelize.define(
  "user",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true,
      allowNull: false,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    profileImage: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    role: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  },
  { timestamps: false }
);

export default User;
