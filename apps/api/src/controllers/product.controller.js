import Product from '../models/product.model'
export const addProduct = async (req, res) => {
    try {
      const { product_name, price, descriptions } = req.body;
      console.log(req.body);

      //check if product already exist
      const findProduct = await Product.findOne({
        where: {
          product_name: product_name
        },
      });

      //if product isn't already exist
      if (findProduct == null) { 
        await Product.create({
            product_name: product_name,
            price: price,
            descriptions: descriptions,
        })
      } else {
        return res.status(400).send({ message: "Product already exist" });
      }
      res.status(200).send({ message: "Product added" });
    } catch (error) {
      console.log("This is the error", error);
       return error;
    }
  }

  export const deleteProduct = async (req, res) => {
    const { id } = req.body;
    try {
        await Product.update({
          isDeleted : true
        },{
            where: {
            id: id,
            },
        });
    res.status(200).send({ message: "Account successfully deleted" });
    } catch (error) {
    console.log("This is the error", error);
    res.status(400).send({ error: error.message });
    }
}