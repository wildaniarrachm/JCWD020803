import { Model, DataTypes } from 'sequelize';

export default class Admin extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
    Admin.hasOne(models.Branch)
  }
}
export const init = (sequelize) => {
  Admin.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
    allowNull: false
  },
    password: {
      type: DataTypes.STRING,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    isSuperAdmin: {
      type: DataTypes.BOOLEAN,
    },
    isEnabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Admin',
  });
  return Admin;
};