import Customer from '../models/customer.model';
import User_voucher from '../models/user_voucher.model';
import bcrypt from 'bcrypt';
import { Op } from 'sequelize';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import handlebars from 'handlebars';
import path from 'path';
import { transporter } from '../middleware/transporter.middlewar';

import textflow from 'textflow.js';
import { Vonage } from '@vonage/server-sdk';

const vonage = new Vonage({
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET,
});

export const getCustomer = async () => {
  return await Customer.findAll();
};

export const getById = async (req, res) => {
  const { id } = req?.params;
  try {
    const response = await Customer.findOne({
      where: {
        id: id,
      },
    });
    res.status(200).send(response);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

export const getReferral = async (req, res) => {
  try {
    const { referral_code } = req.query;
    const findRefferal = await Customer.findOne({
      where: { referral_code: referral_code },
    });
    if (!findRefferal) {
      return res.status(404).send({ isValid: false });
    }
    return res.status(200).send({ isValid: true });
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const createCustomer = async (req, res) => {
  const { first_name, last_name, username, email, referral_code } = req;
  const generateReferralCode = () => {
    const randomString = Math.random().toString(36).substr(2, 8).toUpperCase();
    return `EZ${randomString}`;
  };
  const verifyCustomer = async (data) => {
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
      create: `http://localhost:5173/register-user/verify/${token}`,
    });
    await transporter.sendMail({
      from: process.env.NODEMAILER_USER,
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
      return res.status(400).send('Email or username already exist');
    } else {
      if (referralCode?.length) {
        const referralMatches = await Customer.findOne({
          where: { referral_code: referralCode },
        });
        if (!referralMatches) {
          return res.status(400).send('Referral doesnt match');
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
    }
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
    const { email, password } = req.body;
    const customerExist = await Customer.findOne({
      where: {
        email,
      },
    });
    if (!customerExist) {
      return res.status(400).send('Email doesnt matches');
    }
    const compPassword = await bcrypt.compare(
      password,
      customerExist?.password,
    );
    if (!compPassword) {
      return res.status(500).send('Wrong password');
    }
    if (customerExist.isVerified === false) {
      res.status(500).send('Your account is not verified yet');
    }
    const payload = { id: customerExist.id };
    const token = jwt.sign(payload, process.env.KEY_CUSTOMER_JWT, {
      expiresIn: '24h',
    });
    res
      .status(200)
      .send({ message: 'Login success', result: customerExist, token });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

export const keepLogin = async (req, res) => {
  try {
    const result = await Customer.findOne({
      where: { id: req.customer.id },
      include: [
        {
          model: User_voucher,
        },
      ],
    });
    res.status(200).send({ result });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const verifyAccount = async (req, res) => {
  const token = req?.params?.token;
  try {
    const decoded = jwt.verify(token, process.env.KEY_CUSTOMER_JWT);
    const customerId = decoded?.id;
    await Customer.update({ isVerified: true }, { where: { id: customerId } });
    res.send('Verification successful. Your account is now verified.');
  } catch (error) {
    console.error(error);
    res.status(401).send('Invalid or expired token. Please try again.');
  }
};

export const getCustomerByToken = async (req, res) => {
  const token = req?.params?.token;
  try {
    if (!token) {
      return res.status(400).send('Token invalid');
    }
    const decoded = jwt.verify(token, process.env.KEY_CUSTOMER_JWT);
    const customerId = decoded?.id;
    const user = await Customer.findOne({ where: { id: customerId } });
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

export const createPasswordCustomer = async (req, res) => {
  try {
    const { password } = req.body;
    const customerId = req?.customer?.id;

    const user = await Customer.findOne({ where: { id: customerId } });

    if (!user) {
      return res.status(404).send('User not found');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await Customer.update(
      { password: hashedPassword, isVerified: true },
      { where: { id: user.id } },
    );

    res.status(200).send('Your password updated');
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

export const uploadImageCustomer = async (req, res) => {
  console.log(req?.file);
  const { id } = req.body;
  try {
    let images = null;
    if (req?.file) {
      images = req?.file?.path;
    }
    await Customer.update({ images }, { where: { id: id } });
    res.status(200).send('Uploaded successfully');
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

export const addedPhoneCustomer = async (req, res) => {
  const { id } = req.customer;
  const { phone_number } = req?.body;
  try {
    await Customer.update(
      { phone_number: phone_number, phoneVerified: false },
      { where: { id: id } },
    );
    res.status(200).send('Phone number has been added');
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

//textflow verification
// export const sendVerificationCode = async (req, res) => {
//   const { phone_number } = req?.body;
//   try {
//     textflow.useKey(
//       'TahbhNTnGtJfRdayo7ivauxs4bNcZmNcDwxiCW5wDlkvRlA8UltP7fVl3DIrxI6r',
//     );
//     const verifyOptions = {
//       service_name: 'EZ Mart',
//       seconds: 600,
//     };
//     const result = await textflow.sendVerificationSMS(
//       phone_number,
//       verifyOptions,
//     );
//     res.status(200).send(result);
//   } catch (error) {
//     console.log(error);
//     res.status(500).send(error.message);
//   }
// };

// export const verifyCodePhone = async (req, res) => {
//   const { phone_number, verification_code } = req?.body;
//   try {
//     textflow.useKey(
//       'TahbhNTnGtJfRdayo7ivauxs4bNcZmNcDwxiCW5wDlkvRlA8UltP7fVl3DIrxI6r',
//     );
//     let result = await textflow.verifyCode(phone_number, verification_code);
//     res.status(200).send(result);
//   } catch (error) {
//     console.log(error);
//     res.status(500).send(error.message);
//   }
// };

//vonage verification

// export const sendVerificationCode = async (req, res) => {
//   const { phone_number } = req?.body;
//   try {
//     const result = await vonage.verify.start({
//       number: phone_number,
//       brand: 'EZ Mart',
//     });
//     console.log(result);
//     res.status(200).send(result?.request_id);
//   } catch (error) {
//     console.log(error);
//     res.status(500).send(error.message);
//   }
// };

// export const verifyCodePhone = async (req, res) => {
//   const { request_id, verification_code } = req?.body;
//   try {
//     const response = await vonage.verify.check(request_id, verification_code);
//     console.log(response);
//     res.status(200).send(response);
//   } catch (error) {
//     console.log(error);
//     res.status(500).send(error.message);
//   }
// };

export const forgotPassword = async (req, res) => {
  const { email } = req?.body;
  try {
    const emailExists = await Customer.findOne({ where: { email: email } });
    if (!emailExists) {
      return res.status(404).send('Email does not exist');
    }
    if (emailExists.isVerified === false) {
      return res
        .status(400)
        .send(
          'Your email has already, but not verified, please verified your email first',
        );
    }
    let payload = { id: emailExists?.id };
    const token = jwt.sign(payload, process.env.KEY_CUSTOMER_JWT, {
      expiresIn: '1h',
    });
    const send = fs.readFileSync(
      path.join(__dirname, '../template_reset_password.html'),
      'utf-8',
    );
    const tempCompile = await handlebars.compile(send);
    const tempResult = tempCompile({
      username: emailExists?.username,
      create: `http://localhost:5173/forgot-password/new-password/${token}`,
    });
    await transporter.sendMail({
      from: process.env.NODEMAILER_USER,
      to: emailExists?.email,
      subject: 'EZ Mart - Reset Password',
      html: tempResult,
    });
    res
      .status(200)
      .send(
        'Verification send, please check your email for reset your password',
      );
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

export const newPassword = async (req, res) => {
  const { password } = req?.body;
  const { id } = req?.customer;
  try {
    const customer = await Customer.findOne({
      where: {
        id: id,
      },
    });
    const compPassword = await bcrypt.compare(password, customer?.password);
    if (compPassword) {
      return res.status(400).send('Password must be diferent from before');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await Customer.update(
      { password: hashedPassword },
      {
        where: {
          id: id,
        },
      },
    );
    res.status(200).send('Password updated successfully');
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

export const verifiedPhoneNumber = async (req, res) => {
  try {
    const { id } = req?.customer;
    const response = await Customer.update(
      { phoneVerified: true },
      {
        where: {
          id: id,
        },
      },
    );
    res.status(200).send('Verification Success');
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
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
