import Product from '../models/product.model';
import Category from '../models/category.model';

export const addProduct = async (req, res) => {
  try {
    const { product_name, price, descriptions } = req.body;
    console.log(req.body);

    //check if product already exist
    const findProduct = await Product.findOne({
      where: {
        product_name: product_name,
      },
    });

    //if product isn't already exist
    if (findProduct == null) {
      await Product.create({
        product_name: product_name,
        price: price,
        descriptions: descriptions,
      });
    } else {
      return res.status(400).send({ message: 'Product already exist' });
    }
    res.status(200).send({ message: 'Product added' });
  } catch (error) {
    console.log('This is the error', error);
    return error;
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const {
      page,
      limit = 5,
      sortBy = 'createdAt',
      sortOrder = 'asc',
    } = req.query;
    const offset = (page - 1) * limit;

    const allProducts = await Product.findAll({
      include: {
        model: Category,
        attributes: ['name'],
      },
      order: [[sortBy, sortOrder.toUpperCase()]],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    return res.status(200).send({ result: allProducts });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: error.message });
  }
};

export const editProduct = async (req, res) => {
  try {
    const { id, name, description, price, category_id } = req.body;

    const updateFields = {
      ...(name && { name }),
      ...(description && { description }),
      ...(price && { price }),
    };

    updateFields.CategoryId = category_id;

    const findProduct = await Product.findOne({
      where: {
        id: id,
      },
    });

    if (!findProduct) {
      return res.status(404).send({ message: 'Product not found' });
    }

    await Product.update(updateFields, {
      where: {
        id: id,
      },
    });
    return res.status(200).send({ message: 'Product updated' });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const findProduct = await Product.findOne({
      where: {
        id: id,
      },
    });
    if (!findProduct) {
      return res.status(404).send({ message: 'Product not found' });
    }
    await Product.update(
      {
        isDeleted: true,
        isDisabled: true,
      },
      {
        where: {
          id: id,
        },
      },
    );
    return res.status(200).send({ message: 'Product deleted' });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: error.message });
  }
};
