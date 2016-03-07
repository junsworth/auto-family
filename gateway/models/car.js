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
    header: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      primaryKey: false
    },
    subHeader: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      primaryKey: false
    },
    description: {
      type: DataTypes.TEXT,
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
    purchasePrice: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      primaryKey: false
    },
    salePrice: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      primaryKey: false
    },
    insertDate: {
      type: DataTypes.DATE,
      allowNull: false,
      unique: false,
      primaryKey: false
    },
    saleDate: {
      type: DataTypes.DATE,
      allowNull: true,
      unique: false,
      primaryKey: false
    },
    images: {
      type: DataTypes.TEXT,
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