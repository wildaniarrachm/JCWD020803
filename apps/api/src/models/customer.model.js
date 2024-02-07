import { Model, DataTypes } from 'sequelize';

export default class Customer extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
    Customer.hasMany(models.Transaction);
    Customer.hasMany(models.Address);
    Customer.hasOne(models.Cart);
    Customer.hasOne(models.Favourite);
    Customer.hasMany(models.User_voucher);
  }
}

export const init = (sequelize) => {
  Customer.init(
    {
      first_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phone_number: {
        type: DataTypes.STRING,
      },
      images: {
        type: DataTypes.STRING,
      },
      referral_code: {
        type: DataTypes.STRING,
      },
      points: {
        type: DataTypes.INTEGER,
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      phoneVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      socialRegister: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      firebase_uid: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'Customer',
    },
  );
  return Customer;
};
