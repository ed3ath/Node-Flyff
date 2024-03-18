import { DataTypes } from "sequelize";

import { sequelize } from "..";

// Define your entity schema
const AccountSchema = sequelize.define("Accounts", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  authority: {
    type: DataTypes.CHAR,
    allowNull: false,
    defaultValue: "F",
  },
  verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  banned: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

export default AccountSchema;
