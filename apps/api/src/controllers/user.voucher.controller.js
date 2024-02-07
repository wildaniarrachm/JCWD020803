import User_voucher from '../models/user_voucher.model';
import Vouchers from '../models/voucher.model';

export const getAllUserVouchers = async (req, res) => {
  try {
    const results = await User_voucher.findAll();
    res.status(200).send(results);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getUserVoucherById = async (req, res) => {
  const { customer, voucher_id } = req?.query;
  console.log(req?.query);
  try {
    if (voucher_id) {
      const result = await User_voucher.findAll({
        where: { CustomerId: customer, VoucherId: voucher_id },
        include: [
          {
            model: Vouchers,
          },
        ],
      });
      return res.status(200).send(result);
    } else {
      const results = await User_voucher.findAll({
        where: { CustomerId: customer },
        include: [
          {
            model: Vouchers,
          },
        ],
      });
      return res.status(200).send(results);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};
