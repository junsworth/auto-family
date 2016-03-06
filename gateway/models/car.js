/**
 * Created by jonathanunsworth on 15/01/14.
 */
module.exports = function(sequelize, DataTypes) {
  var Car = sequelize.define('Car', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true,
      unique:true,
      allowNull:false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      primaryKey: false
    },
    mileage: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      primaryKey: false
    },
    year: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      primaryKey: false
    },
    purchaseprice: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      primaryKey: false
    },
    saleprice: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      primaryKey: false
    },
    images: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false,
      primaryKey: false
    }
  }, {
    createdAt: false,
    updatedAt: false,
    classMethods: {
      associate: function(models) {
        
      }
    }
  });

  return Car;
};