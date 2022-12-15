const { Model, DataTypes } = require('sequelize');

const sequelize = require('../../UofA-VIRT-FSF-PT-09-2022-U-LOLC/13-ORM/02-Challenge/Develop/config/connection.js');

class Category extends Model {}

Category.init(
  {
    // define columns
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

module.exports = Category;
