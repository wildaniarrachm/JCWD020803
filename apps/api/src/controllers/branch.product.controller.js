import Branch_product from '../models/branch_product.model';
import Product from '../models/product.model';
import Product_image from '../models/product_image.model';

export const getProductByBranch = async (req, res) => {
  const { id, page } = req?.query;
  const limit = parseInt(page);
  try {
    const totalPages = await Branch_product.findAndCountAll({
      where: { BranchId: id },
    });
    const results = await Branch_product.findAll({
      where: {
        BranchId: id,
      },
      include: [
        {
          model: Product,
          include: [
            {
              model: Product_image,
            },
          ],
        },
      ],
      limit,
    });
    res.status(200).send({ results, count: totalPages?.count });
  } catch (error) {
    res.status(200).send(error.message);
  }
};
export const removeProductFromBranch = async (req, res) => {
  const { id } = req?.params;
  try {
    await Branch_product.destroy({ where: { id: id } });
    res.status(200).send('Successfully removed');
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
