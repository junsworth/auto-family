module.exports = function(sequelize, DataTypes) {
  var Article = sequelize.define('Article', {
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
    releaseDate: {
      type: DataTypes.DATE,
      allowNull: false,
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

  return Article;

};