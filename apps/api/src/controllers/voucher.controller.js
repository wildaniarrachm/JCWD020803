import Voucher from '../models/voucher.model';

export const getVoucherByCode = async (req, res) => {
  const { code } = req?.params;
  try {
    const results = await Voucher.findOne({ where: { voucher_code: code } });
    res.status(200).send([results]);
  } catch (error) {
    res.status(200).send(error.message);
  }
};
