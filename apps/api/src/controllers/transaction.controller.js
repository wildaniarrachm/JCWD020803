import Transaction_product from '../models/transaction_product.model';
import Transaction from '../models/transaction.model';
import Product from '../models/product.model';
import Branch_product from '../models/branch_product.model';
import Cart from '../models/cart.model';
import Cart_detail from '../models/cart_detail.model';
import Customer from '../models/customer.model';
import Payment_method from '../models/payment_method';
import { Op } from 'sequelize';

export const getAll = async (req, res) => {
  try {
    const customerId = req.customer.id;

    if (!customerId) {
      return res.status(400).send({ message: 'Customer ID is required' });
    }

    const response = await Transaction.findAll({
      where: { CustomerId: customerId },
      include: [
        {
          model: Transaction_product,
          include: [
            {
              model: Product,
              include: [
                {
                  model: Branch_product,
                  include: [
                    {
                      model: Branch,
                      attributes: ['branch_name', 'store_contact', 'address'],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });

    res.status(200).send({
      response,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: err.message });
  }
};

export const getAllByAdmin = async (req, res) => {
  try {
    const response = await Transaction.findAll({
      include: [
        {
          model: Transaction_product,
          include: [
            {
              model: Product,
              include: [
                {
                  model: Branch_product,
                  include: [
                    {
                      model: Branch,
                      attributes: ['branch_name', 'store_contact', 'address'],
                    },
                  ],
                },
              ],
            },
          ],
        },
        { model: Customer },
      ],
    });
    res.status(200).send({ response });
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: err.message });
  }
};

export const confirmPaymentByAdmin = async (req, res) => {
  try {
    const { transactionId } = req.params;

    if (!transactionId) {
      res.status(400).send({ message: 'Transaction ID is required' });
    }

    const response = await Transaction.update(
      { status: 'Payment Confirmed' },
      { where: { id: transactionId, status: 'Waiting Payment Confirmation' } },
    );
    res.status(200).send({ response });
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: err.message });
  }
};

export const getById = async (req, res) => {
  try {
    const customerId = req.customer.id;

    if (!customerId) {
      return res.status(400).send({ message: 'Customer ID is required' });
    }

    const { transactionId } = req.params;
    if (!transactionId) {
      return res.status(400).send({ message: 'Transaction ID is required' });
    }

    const transaction = await Transaction.findOne({
      where: { id: transactionId, customerId: customerId },
      include: [
        {
          model: Transaction_product,
          include: [{ model: Product }],
        },
      ],
    });

    if (!transaction) {
      return res.status(400).send({ message: 'Transaction not found' });
    }
    res.status(200).send({ data: transaction });
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: err.message });
  }
};

export const getByDate = async (req, res) => {
  try {
    const customerId = req.customer.id;

    if (!customerId) {
      return res.status(400).send({ message: 'Customer ID is required' });
    }

    const { date } = req.params;

    const startDate = new Date(`${date}T00:00:00.000Z`);
    const endDate = new Date(`${date}T23:59:59.999Z`);

    const transaction = await Transaction.findAll({
      where: {
        createdAt: {
          CustomerId: customerId,
          [Op.between]: [startDate, endDate],
        },
      },
      include: [
        {
          model: Transaction_product,
          include: [{ model: Product }],
        },
      ],
    });

    if (!transaction || transaction.length === 0) {
      return res
        .status(400)
        .send({ message: 'No transactions found for the specified date' });
    }

    res.status(200).send({ data: transaction });
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: err.message });
  }
};

export const addToCheckout = async (req, res) => {
  try {
    const customer = req.customer;
    const { PaymentMethodId, shipment_fee, shipment_method } = req.body;
    const paymentMethodId = parseInt(PaymentMethodId);

    if (!customer) {
      return res.status(400).send('User must be registered');
    }

    const customerData = await Customer.findByPk(customer.id);

    if (!customerData || !customerData.isVerified) {
      return res.status(400).send('User must be verified');
    }

    await Transaction.findOne({
      where: {
        CustomerId: customerData.id,
      },
      include: [
        {
          model: Transaction_product,
        },
      ],
    });

    if (paymentMethodId !== 1 && paymentMethodId !== 2) {
      return res.status(400).send('Invalid payment method');
    }

    const paymentMethodName =
      paymentMethodId === 1 ? 'Payment Gateway' : 'Manual';

    const newPaymentMethod = await Payment_method.create({
      name: paymentMethodName,
    });

    const newTransaction = await Transaction.create({
      status: 'Waiting Payment',
      total: 0,
      CustomerId: customerData.id,
      PaymentMethodId: newPaymentMethod.id,
      sub_total: 0,
      shipment_fee: shipment_fee,
      shipment_method: shipment_method,
    });

    const activeCarts = await Cart.findAll({
      where: { isActive: true },
      include: [
        {
          model: Cart_detail,
          include: [
            {
              model: Product,
            },
          ],
        },
      ],
    });

    for (let cart of activeCarts) {
      const product = cart.Cart_detail.Product;
      const productQuantity = await Branch_product.findOne({
        where: { ProductId: product.id },
      });

      const SubTotal = [product].reduce((sum, item) => sum + item.price, 0);

      if (
        !productQuantity ||
        productQuantity.quantity < cart.Cart_detail.quantity
      ) {
        return res.status(400).send({
          message: `Insufficient quantity for product ${product.product_name} in branch`,
        });
      }

      await Transaction_product.create({
        quantity: cart.Cart_detail.quantity,
        ProductId: product.id,
        TransactionId: newTransaction.id,
      });

      await Transaction.increment(
        {
          total: cart.Cart_detail.quantity * product.price,
          sub_total: SubTotal,
        },
        { where: { id: newTransaction.id } },
      );
      await Branch_product.decrement('quantity', {
        by: cart.Cart_detail.quantity,
        where: { id: productQuantity.id },
      });

      await Cart.update({ isActive: false }, { where: { id: cart.id } });
    }

    setTimeout(async () => {
      const updatedTransaction = await Transaction.findOne({
        where: { id: newTransaction.id },
      });

      if (!updatedTransaction.payment_proof) {
        await Transaction.update(
          { status: 'Order Cancelled' },
          { where: { id: newTransaction.id } },
        );

        if (!res.headersSent) {
          return res.status(200).send({
            message: 'Order cancelled due to time limit exceeded.',
            data: newTransaction,
          });
        }
      }
    }, 3600000);

    if (!res.headersSent) {
      return res.status(200).send({
        message: 'Transaction Success',
        data: newTransaction,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send({ message: err.message });
  }
};

export const cancelOrder = async (req, res) => {
  try {
    const customerId = req.customer.id;

    if (!customerId) {
      return res.status(400).send({ message: 'Customer ID is required' });
    }

    const transactionId = req.params.transactionId;

    const canceledTransaction = await Transaction.update(
      { status: 'Order Cancelled' },
      {
        where: {
          CustomerId: customerId,
          status: 'Waiting Payment',
          id: transactionId,
        },
      },
    );

    if (canceledTransaction[0] === 0) {
      return res
        .status(404)
        .send({ message: 'Transaction not eligible for cancellation' });
    }

    res.status(200).send({ message: 'Order successfully cancelled' });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ message: err.message });
  }
};

export const uploadPaymentProof = async (req, res) => {
  try {
    const customerId = req.customer.id;

    if (!customerId) {
      return res.status(400).send({ message: 'Customer ID is requiredt' });
    }

    const { transactionId } = req.params;

    if (!transactionId) {
      res.status(400).send({ message: 'Transaction ID is required' });
    }

    const existingTransaction = await Transaction.findOne({
      where: {
        id: transactionId,
        CustomerId: customerId,
        status: 'Waiting Payment',
      },
    });

    if (!existingTransaction) {
      return res.status(400).send({
        message: 'Transaction not found or not in waiting payment status.',
      });
    }

    let images = null;
    if (req?.file) {
      const fileName = req?.file?.filename;
      const URL = process.env.IMAGE_URL;
      images = `${URL}/${fileName}`;
    }

    await Transaction.update(
      { payment_proof: images, status: 'Waiting Payment Confirmation' },
      { where: { id: existingTransaction.id } },
    );

    const updatedTransaction = await Transaction.findOne({
      where: { id: existingTransaction.id },
      include: [
        {
          model: Transaction_product,
          include: [{ model: Product }],
        },
      ],
    });

    res
      .status(200)
      .send({ message: 'Transaction Success', data: updatedTransaction });
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: err.message });
  }
};

export const deleteAllTransaction = async (req, res) => {
  try {
    await Transaction.destroy({ where: {} });
    await Transaction_product.destroy({ where: {} });
    res.status(200).send('All transaction deleted');
  } catch (err) {
    console.log(err);
    res.status(404).send({ message: err.message });
  }
};
