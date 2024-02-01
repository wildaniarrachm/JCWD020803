import Branch_product from '../models/branch_product.model';
import Product from '../models/product.model';
import Product_image from '../models/product_image.model';

export const getProductByBranch = async (req, res) => {
  const { id } = req?.params;
  try {
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
    });
    res.status(200).send({ results });
  } catch (error) {
    res.status(200).send(error.message);
  }
};
