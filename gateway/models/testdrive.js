module.exports = function(sequelize, DataTypes) {
  var TestDrive = sequelize.define('TestDrive', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true,
      unique:true,
      allowNull:false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: false,
      validate: {
        notEmpty: { args: true, msg:'Email is empty.' },
        isEmail: {args: true, msg: 'Invalid email.'}
      }
    },
    name: {
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
    },
    requestDate: {
      type: DataTypes.DATE,
      allowNull: false,
      unique: false,
      primaryKey: false
    },
    completeDate: {
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

  return TestDrive;

};