import Product from '../models/product.model';
import Category from '../models/category.model';
import Product_image from '../models/product_image.model';
import Branch_product from '../models/branch_product.model';
import Branch from '../models/branch.model';
import { Op } from 'sequelize';


export const addProduct = async (req, res) => {
  try {
    const {
      product_name,
      price,
      descriptions,
      CategoryId,
      SubCategoryId,
      weight,
    } = req.body;
    let file = null;
    if (req?.file) {
      const fileName = req?.file?.filename;
      const URL = process.env.IMAGE_URL;
      file = `${URL}/${fileName}`;
    }
    const prices = parseInt(price);
    const findProduct = await Product.findOne({
      where: {
        product_name: product_name,
      },
    });

    if (findProduct == null) {
      const create = await Product.create({
        product_name: product_name,
        price: prices,
        descriptions: descriptions,
        CategoryId: CategoryId,
        SubCategoryId: SubCategoryId,
        weight: weight,
      });
      await Product_image.create({
        product_image: file,
        ProductId: create?.dataValues?.id,
      });
    } else {
      return res.status(400).send({ message: 'Product already exist' });
    }
    res.status(200).send({ message: 'Product added' });
  } catch (error) {
    console.log('This is the error', error);
    res.status(500).send(error.message);
  }
};

export const getProduct = async (req, res) => {
  try {
    const {
      page,
      limit = 3,
      sortBy = 'createdAt',
      sortOrder = 'asc',
    } = req.query;
    const admin = req?.admin;
    const offset = (page - 1) * limit;
    const totalCount = await Product.count();
    const totalPages = Math.ceil(totalCount / limit);
    if (admin?.isSuperAdmin === true) {
      const allProducts = await Product.findAll({
        include: {
          model: Category,
          attributes: ['name'],
        },
        order: [[sortBy, sortOrder.toUpperCase()]],
        limit: parseInt(limit),
        offset: parseInt(offset),
      });
      return res
        .status(200)
        .send({ result: allProducts, totalPages: totalPages });
    }
    const branch = await Branch.findOne({ where: { AdminId: admin?.id } });
    // console.log(branch);
    const off = (page - 1) * limit;
    const total = await Branch_product.findAndCountAll({
      where: { BranchId: branch?.dataValues?.id },
    });
    console.log(total);
    const pages = Math.ceil(total?.count / limit);
    const allProducts = await Branch_product.findAll({
      where: { BranchId: branch?.id },
      include: [
        {
          model: Product,

          include: [{ model: Category, attributes: ['name'] }],
        },
      ],
      order: [[sortBy, sortOrder.toUpperCase()]],
      limit: parseInt(limit),
      offset: parseInt(off),
    });
    res.status(200).send({ result: allProducts, totalPages: pages });
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

export const getProductOutsideBranch = async (req, res) => {
  const admin = req?.admin;
  try {
    if (admin?.isSuperAdmin === false) {
      const branch = await Branch.findOne({ where: { AdminId: admin?.id } });
      const result = await Branch_product.findAll({
        where: { BranchId: branch?.dataValues?.id },
      });
      const value = result?.map((product) => {
        return product?.ProductId;
      });
      const product = await Product.findAll({
        where: {
          id: {
            [Op.notIn]: value,
          },
        },
        include: [
          {
            model: Category,
            attributes: ['name'],
          },
        ],
      });

      return res.status(200).send(product);
    }
    const result = await Product.findAll();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const addIntoBranch = async (req, res) => {
  const { id } = req?.admin;
  const { ProductId, quantity } = req?.body;
  try {
    const find = await Branch.findOne({ where: { AdminId: id } });
    await Branch_product.create({
      ProductId: ProductId,
      BranchId: find?.dataValues?.id,
      quantity: quantity,
    });
    res.status(200).send('Success add');
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

