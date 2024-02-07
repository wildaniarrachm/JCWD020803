import Category from '../models/category.model';
import SubCategory from '../models/sub_category.model';

export const getAllCategory = async (req, res) => {
  try {
    const response = await Category.findAll();
    res.status(200).send(response);
  } catch (error) {
    res.status(200).send(error.message);
  }
};

export const getSubCategory = async (req, res) => {
  const { id } = req?.params;
  console.log(id);
  try {
    const response = await SubCategory.findAll({ where: { CategoryId: id } });
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
