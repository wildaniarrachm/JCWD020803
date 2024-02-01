import Address from '../models/address.model';
import Customer from '../models/customer.model';
import City from '../models/city.model';
import { rajaOngkir } from './raja.ongkir';
import { Op } from 'sequelize';
import Province from '../models/province.model';
export const getAllCity = async (req, res) => {
  try {
    const response = await rajaOngkir.get('city');
    res.status(200).send(response?.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getAllProvince = async (req, res) => {
  try {
    const response = await rajaOngkir.get('province');
    res.status(200).send(response?.data);
  } catch (error) {
    const response = await Province.findAll();
    return res.status(200).send(response);
  }
};

export const getCityByProvince = async (req, res) => {
  const { province } = req?.query;
  try {
    const response = await rajaOngkir.get(`city?province=${province}`);
    res.status(200).send(response?.data);
  } catch (error) {
    const provinceExist = await Province.findOne({
      where: { province_id: province },
      include: [
        {
          model: City,
        },
      ],
    });
    res.status(200).send(provinceExist);
  }
};

export const getCityAndProvinceById = async (req, res) => {
  const { id, province } = req?.query;
  try {
    const response = await rajaOngkir.get(
      `city?id=${id}&province_id=${province}`,
    );
    res.status(200).send(response?.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getAllAddress = async (req, res) => {
  try {
    const response = await Address.findAll({
      include: [
        {
          model: Customer,
        },
      ],
    });
    res.status(200).send({ result: response });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const newAddress = async (req, res) => {
  const { street, city_id, label_address, received_name, phone_number } =
    req?.body;
  const { id } = req?.customer;
  try {
    const cityExist = await City.findOne({ where: { city_id: city_id } });
    let latitude = ' ';
    let longitude = ' ';
    if (req?.body?.latitude || req?.body?.longitude) {
      latitude = req?.body?.latitude;
      longitude = req?.body?.longitude;
    }
    const addressExist = await Address.findOne({
      where: {
        [Op.or]: [
          { street: { [Op.eq]: street } },
          { received_name: { [Op.eq]: received_name } },
          { label_address: { [Op.eq]: label_address } },
        ],
      },
    });
    if (addressExist) {
      return res.status(400).send('Address already exists');
    }
    let primary_address = false;
    if (label_address === 'Home' || label_address === 'home') {
      primary_address = true;
    }
    await Address.create({
      street,
      latitude,
      longitude,
      label_address,
      received_name,
      phone_number,
      CityId: cityExist?.id,
      CustomerId: id,
      primary_address: primary_address,
    });
    res.status(200).send('success');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const editAddress = async (req, res) => {
  const data = req?.body;
  try {
    const cityExist = await City.findOne({ where: { city_id: data?.city_id } });
    await Address.update(
      {
        street: data?.street,
        longitude: data?.longitude,
        latitude: data?.latitude,
        label_address: data?.label_address,
        received_name: data?.received_name,
        phone_number: data?.phone_number,
        CityId: cityExist?.id,
      },
      { where: { id: data?.id } },
    );
    res.status(200).send('success updated');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getCustomerAddress = async (req, res) => {
  const { id } = req?.customer;
  try {
    const response = await Address.findAll({
      where: { CustomerId: id },
      include: [
        { model: Customer, attributes: ['id', 'first_name', 'last_name'] },
        {
          model: City,
          attributes: ['city', 'city_id'],
          include: [
            { model: Province, attributes: ['province', 'province_id'] },
          ],
        },
      ],
    });
    res.status(200).send({ result: response });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getAddressById = async (req, res) => {
  const { id } = req?.params;
  try {
    const response = await Address.findOne({
      where: { id: id },
      include: [
        {
          model: City,
          attributes: ['city', 'city_id'],
          include: [
            { model: Province, attributes: ['province', 'province_id'] },
          ],
        },
      ],
    });
    res.status(200).send({ result: response });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const switchPrimaryAddress = async (req, res) => {
  const data = req?.body;
  const { id } = req?.customer;
  try {
    const result = await Address.findOne({
      where: {
        CustomerId: id,
        primary_address: true,
      },
    });
    await Address.update(
      { primary_address: false },
      { where: { id: result?.id } },
    );
    await Address.update(
      { primary_address: data?.checked },
      { where: { id: data?.id } },
    );
    res.status(200).send({ message: 'Success updated' });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const switchDeliveriedAddress = async (req, res) => {
  const data = req?.body;
  const { id } = req?.customer;
  try {
    const result = await Address.findOne({
      where: {
        CustomerId: id,
        isDeliveried: true,
      },
    });
    if (result) {
      await Address.update(
        { isDeliveried: false },
        { where: { id: result?.id } },
      );
    }
    await Address.update({ isDeliveried: true }, { where: { id: data?.id } });
    res.status(200).send({ message: 'Success set deliveried address' });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const deleteAddress = async (req, res) => {
  const { id } = req?.params;
  try {
    await Address.update({ isDeleted: true }, { where: { id: id } });
    res.status(200).send('Address has been deleted');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const deletePermanentAddress = async (req, res) => {
  const { id } = req?.params;
  try {
    await Address.destroy({ where: { id: id } });
    res.status(200).send('Address was successfully deleted for permanent');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const recoverAddress = async (req, res) => {
  const { id } = req?.params;
  try {
    await Address.update({ isDeleted: false }, { where: { id: id } });
    res.status(200).send('Address success recovered');
  } catch (error) {
    res.status(500).send(error.message);
  }
};
