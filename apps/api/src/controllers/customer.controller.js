import Customer from '../models/customer.model';
import User_voucher from '../models/user_voucher.model';
import bcrypt from 'bcrypt';
import { Op } from 'sequelize';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import handlebars from 'handlebars';
import path from 'path';
import { transporter } from '../middleware/transporter.middlewar';
export const getCustomer = async () => {
  return await Customer.findAll();
};

export const getSampleDataById = async () => {
  return { name: 'Sample data' };
};

export const createCustomer = async (req, res) => {
  const { first_name, last_name, username, email, referral_code } = req;
  const generateReferralCode = () => {
    const randomString = Math.random().toString(36).substr(2, 8).toUpperCase();
    return `EZ${randomString}`;
  };
  const verifyCustomer = async (data) => {
    console.log('data', data?.dataValues);
    let payload = { id: data?.dataValues?.id };
    const token = jwt.sign(payload, process.env.KEY_CUSTOMER_JWT, {
      expiresIn: '1h',
    });
    const send = fs.readFileSync(
      path.join(__dirname, '../template.html'),
      'utf-8',
    );
    const tempCompile = await handlebars.compile(send);
    const tempResult = tempCompile({
      username: username,
      link: `http://localhost:8000/api/customer/verify/${token}`,
      create:`http://localhost:5173/home`
    });
    await transporter.sendMail({
      from: 'dimasageng58@gmail.com',
      to: email,
      subject: 'EZ Mart - Verification',
      html: tempResult,
    });
  };
  const referral = generateReferralCode();
  const referralCode = referral_code;
  try {
    const customerExist = await Customer.findOne({
      where: {
        [Op.or]: [
          { email: { [Op.eq]: email } },
          { username: { [Op.eq]: username } },
        ],
      },
    });
    if (customerExist) {
      return res.status(500).send('User already exist');
    }
    if (referralCode?.length) {
      const referralMatches = await Customer.findOne({
        where: { referral_code: referralCode },
      });
      if (!referralMatches) {
        return res.status(500).send('Referral doesnt match');
      } else {
        try {
          const result = await Customer.create({
            first_name,
            last_name,
            username,
            email,
            referral_code: referral,
          });
          await User_voucher.create({
            CustomerId: referralMatches.id,
            VoucherId: 2,
          });
          await User_voucher.create({
            CustomerId: result.id,
            VoucherId: 1,
          });
          verifyCustomer(result);
        } catch (error) {
          console.log(error);
          return error;
        }
        return res
          .status(200)
          .send('Referral matches, check your email for verification');
      }
    }

    const add = await Customer.create({
      first_name,
      last_name,
      username,
      email,
      referral_code: referral,
    });
    verifyCustomer(add);
    return res
      .status(200)
      .send('Register success, check your email for verification');
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const loginCustomer = async (req, res) => {
  try {
    const { email, password } = req;
    const emailExist = await Customer.findOne({
      where: {
        email,
      },
    });
    if (!emailExist) {
      return res.status(500).send('Email doesnt matches');
    }

    const compPassword = await bcrypt.compare(password, emailExist?.password);
    if (!compPassword) {
      return res.status(500).send('Wrong password');
    }
    if (emailExist.isVerified === false) {
      return res.status(500).send('Your account is not verified yet');
    }
    return res.status(200).send('Login success');
  } catch (error) {
    console.log(error);
    return error;
  }
};
