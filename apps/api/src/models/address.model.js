import { Model, DataTypes } from 'sequelize';

export default class Address extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
    Address.belongsTo(models.Customer);
    Address.belongsTo(models.City);
  }
}

export const init = (sequelize) => {
  Address.init(
    {
      street: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      longitude: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      latitude: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      primary_address: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      phone_number: {
        type: DataTypes.STRING,
      },
      label_address: {
        type: DataTypes.STRING,
      },
      received_name: {
        type: DataTypes.STRING,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isDeliveried: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'Address',
    },
  );
  return Address;
};
