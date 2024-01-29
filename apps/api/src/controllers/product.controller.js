import Product from '../models/product.model'
import Category from '../models/category.model';
import Sub_category from '../models/sub_category.model';
import Product_image from '../models/product_image.model';

export const addProduct = async (req, res) => {
    const { product_name, price, descriptions, CategoryId, SubCategoryId } = req.body;
    console.log(req.body);
    try {
      const findProduct = await Product.findOne({
        where: {
          product_name: product_name,
          isDeleted: false
        },
      });
      if (findProduct){
        return res.status(402).send("Product already existed")
      }
    const product = await Product.create({
        product_name,
        price,
        descriptions,
        CategoryId,
        SubCategoryId
      })
      let product_image = null;
      if(req.file){
        product_image = req.file?.path
      }
      await Product_image.create({
        product_image,
        ProductId: product.id
      })
      return res.status(200).send('Product added')
    } catch (error) {
      console.log("This is the error", error);
       return error;
    }
  }

export const getAllProducts = async (req, res) => {
  try {
      const { page, limit = 5, sortBy = 'createdAt', sortOrder = 'asc' } = req.query;
      const offset = (page - 1) * limit;

      const allProducts = await Product.findAll({
          include: {
              model: Category,
              attributes: ['name']
          },
          order: [[sortBy, sortOrder.toUpperCase()]],
          limit: parseInt(limit),
          offset: parseInt(offset),
      })

      return res.status(200).send({ result: allProducts })
  } catch (error) {
      console.error(error)
      return res.status(500).send({ message: error.message })
  }
}

export const editProduct = async (req, res) => {
  try {
      const { id, name, description, price, category_id } = req.body;

      const updateFields = {
          ...(name && { name }),
          ...(description && { description }),
          ...(price && { price }),
      };

      updateFields.CategoryId = category_id

      const findProduct = await Product.findOne({
          where: {
              id: id
          }
      })

      if (!findProduct) {
          return res.status(404).send({ message: "Product not found" })
      }

      await Product.update(
          updateFields,
          {
              where: {
                  id: id
              }
          }
      )
      return res.status(200).send({ message: "Product updated" })
  } catch (error) {
      console.error(error)
      return res.status(500).send({ message: error.message })
  }
}

export const deleteProduct = async (req, res) => {
  try{
      const id = req.params.id
      const findProduct = await Product.findOne({
          where: {
              id: id
          }
      })
      if (!findProduct) {
          return res.status(404).send({ message: "Product not found" })
      }
      await Product.update(
          {
              isDeleted: true,
              isDisabled: true
          },
          {
              where: {
                  id: id
              }
          }
      )
      return res.status(200).send({ message: "Product deleted" })
  }catch(error){
      console.error(error)
      return res.status(500).send({ message: error.message })
  }
}