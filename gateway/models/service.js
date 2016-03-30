/**
 * Created by jonathanunsworth on 15/01/14.
 */
module.exports = function(sequelize, DataTypes) {
  var Service = sequelize.define('Service', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true,
      unique:true,
      allowNull:false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      primaryKey: false
    },
    header: {
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

  return Service;

};