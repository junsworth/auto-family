/**
 * Created by jonathanunsworth on 15/10/28.
 */
module.exports = function(sequelize, DataTypes) {
  var UserType = sequelize.define('UserType', {
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
      validate: {
        notEmpty: { msg:'Is Empty'}
      }
    }
  }, {
    createdAt: false,
    updatedAt: false,
    classMethods: {
      associate: function(models) {
        UserType.hasOne(models.User)
      }
    }
  });

  return UserType;
};