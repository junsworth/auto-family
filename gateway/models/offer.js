module.exports = function(sequelize, DataTypes) {
  var Offer = sequelize.define('Offer', {
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
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: true,
      unique: false,
      primaryKey: false
    },
    endDate: {
      type: DataTypes.DATE,
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

  return Offer;

};