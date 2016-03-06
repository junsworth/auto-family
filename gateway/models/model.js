/**
 * Created by jonathanunsworth on 15/01/14.
 */
module.exports = function(sequelize, DataTypes) {
  var Model = sequelize.define('Model', {
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
      unique: true,
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

  return Model;
};