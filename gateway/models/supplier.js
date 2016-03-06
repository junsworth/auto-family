/**
 * Created by jonathanunsworth on 15/01/14.
 */
module.exports = function(sequelize, DataTypes) {
  var Supplier = sequelize.define('Supplier', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true,
      unique:true,
      allowNull:false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      primaryKey: false
    },
    addresstwo: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false,
      primaryKey: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      primaryKey: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      primaryKey: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      primaryKey: false
    }
  }, {
    createdAt: false,
    updatedAt: false,
    classMethods: {
      associate: function(models) {
        Supplier.hasMany(models.Car);
      }
    }
  });

  return Supplier;
};