import City from '../models/city.model';
import Province from '../models/province.model';
import { rajaOngkir } from './raja.ongkir';

export const getAllCity = async (req, res) => {
  try {
    const response = await City.findAll();
    res.status(200).send({ result: response, include: [{ model: Province }] });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const addCities = async (req, res) => {
  const { city_id, city_name, type, postal_code, province, province_id } =
    req?.body;
  try {
    const provinceExist = await Province.findOne({
      where: { province_id: province_id },
    });
    if (provinceExist) {
      const cityExist = await City.findOne({
        where: { city_id: city_id, ProvinceId: provinceExist.id },
      });
      if (cityExist) {
        const address = await City.findOne({
          where: { city_id: cityExist?.city_id },
          include: [
            {
              model: Province,
              attributes: ['province', 'province_id'],
            },
          ],
        });
        return res.status(200).send({ result: address });
      } else {
        const addCities = await City.create({
          city_id: city_id,
          city: city_name,
          ProvinceId: provinceExist?.id,
          postal_code: postal_code,
          type: type,
        });
        return res
          .status(200)
          .send({ message: 'membuat city', result: addCities });
      }
    }
    const addProvince = await Province.create({
      province: province,
      province_id: province_id,
    });
    const result = await City.create({
      city: city_name,
      city_id: city_id,
      postal_code: postal_code,
      type: type,
      ProvinceId: addProvince?.id,
    });
    return res.status(200).send({ message: 'membuat baru', result: result });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getCityById = async (req, res) => {
  const { id } = req?.params;
  console.log(id);
  try {
    const response = await rajaOngkir.get(`city?id=${id}`);
    res.status(200).send(response?.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
