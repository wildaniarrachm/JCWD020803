import { Op } from 'sequelize';
import Admin from '../models/admin.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import path from 'path';
import handlebars from 'handlebars';
import fs from 'fs';
import { transporter } from '../middleware/transporter.middleware';
import { log } from 'util';

export const addSuperAdmin = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const result = await Admin.create({
      name: name,
      username: username,
      email: email,
      password: hashPassword,
      isVerified: true,
      isSuperAdmin: true,
    });
    return res.status(200).send('Super Admin registered');
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const registerAdmin = async (req, res) => {
  try {
    const { name, username, email } = req.body;
    const verifyAdmin = async (data) => {
      console.log('data', data?.dataValues);
      let payload = { id: data?.dataValues?.id };
      const token = jwt.sign(payload, process.env.KEY_ADMIN_JWT, {
        expiresIn: '24h',
      });
      const send = fs.readFileSync(
        path.join(__dirname, '../template_verify_admin.html'),
        'utf-8',
      );
      const tempCompile = await handlebars.compile(send);
      const tempResult = tempCompile({
        username: username,
        link: `${process.env.BASE_URL}admin/set-password/${token}`,
      });
      await transporter.sendMail({
        from: 'wildaniarrachman@gmail.com',
        to: email,
        subject: 'EZ Mart - Admin Verification',
        html: tempResult,
      });
    };
    const findUser = await Admin.findOne({
      where: {
        [Op.or]: [{ username: username }, { email: email }],
      },
    });
    if (findUser == null) {
      const result = await Admin.create({
        name: name,
        username: username,
        email: email,
        isVerified: false,
        isSuperAdmin: false,
        isEnabled: true,
      });
      verifyAdmin(result);
    } else {
      return res.status(400).send({ message: 'Admin already existed' });
    }
    return res.status(200).send('Admin Registered');
  } catch (error) {
    console.log('ini eror', error);
    return error;
  }
};

export const forgotPasswordAdmin = async (req, res) => {
  const { email } = req.body;
  try {
    const findEmail = await Admin.findOne({
      where: { email: email },
    });
    if (findEmail == null) {
      return res.status(404).send('Invalid Email');
    }
    if (findEmail.isVerified === false) {
      return res.status(400).send('Email is not verified');
    }
    let payload = { id: findEmail?.id };
    const token = jwt.sign(payload, process.env.KEY_ADMIN_JWT, {
      expiresIn: '24h',
    });
    const send = fs.readFileSync(
      path.join(__dirname, '../template_reset_password.html'),
      'utf-8',
    );
    const tempCompile = await handlebars.compile(send);
    const tempResult = tempCompile({
      id: findEmail?.id,
      create: `${process.env.BASE_URL}admin/reset-password/${token}`,
    });
    await transporter.sendMail({
      from: process.env.NODEMAILER_USER,
      to: findEmail?.email,
      subject: 'EZ Mart - Reset Password Admin',
      html: tempResult,
    });
    res.status(200).send('Check your email to reset your password');
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    await Admin.update(
      {
        password: hashPassword,
      },
      {
        where: {
          id: req.admin.id,
        },
      },
    );
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const loginAdmin = async (req, res) => {
  try {
    let admin;
    const { username, email, password, rememberme } = req.body;

    if (username) {
      admin = await Admin.findOne({
        where: {
          username: username,
        },
      });
    } else if (email) {
      admin = await Admin.findOne({
        where: {
          email: email,
        },
      });
    }

    if (!admin) {
      return res.status(404).send({
        message: 'Admin is not registered',
      });
    }
    const isValid = await bcrypt.compare(password, admin.password);
    if (!isValid) {
      return res.status(400).send({
        message: 'Incorrect Password',
      });
    }
    const payload = { id: admin.id, isSuperAdmin: admin?.isSuperAdmin };
    if (admin.isVerified === true) {
      if (admin.isEnabled === true) {
        if (rememberme === true) {
          const token = jwt.sign(payload, process.env.KEY_ADMIN_JWT, {
            expiresIn: '24h',
          });
          return res.status(200).send({
            message: 'Login success',
            admin,
            token,
          });
        } else {
          const token = jwt.sign(payload, process.env.KEY_ADMIN_JWT, {
            expiresIn: '50s',
          });
          return res.status(200).send({
            message: 'Login Success',
            admin,
            token,
          });
        }
      } else {
        return res.status(400).send({
          message:
            'Disabled Account. Contact your employer to solve this problem.',
        });
      }
    } else {
      return res.status(400).send({
        message: 'Your account is not verified.',
      });
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const keepLogin = async (req, res) => {
  try {
    const admin = await Admin.findOne({
      where: {
        id: req.admin.id,
      },
    });
    return res.status(200).send({ message: 'Keep Login', admin });
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const inputPassword = async (req, res) => {
  try {
    const { password } = req.body;
    const adminId = req.admin.id;

    const findAdmin = await Admin.findOne({ where: { id: adminId } });
    console.log(findAdmin);

    if (findAdmin) {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      await Admin.update(
        { password: hashPassword, isVerified: true },
        { where: { id: findAdmin.id } },
      );

      return res.status(200).send('Password Registered');
    } else {
      return res.status(404).send('Admin is not found');
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const deleteAdmin = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Admin.destroy({
      where: {
        id: id,
      },
    });
    return res.status(200).send({ message: 'Admin deleted' });
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getAdmin = async (req, res) => {
  try {
    const adminData = await Admin.findAll({
      where: {
        isVerified: true,
        isSuperAdmin: false,
      },
    });
    return res.status(200).send({ adminData });
  } catch (error) {
    console.log('error', error);
    return res.status(400).send({ error });
  }
};

export const getAdminbyId = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await Admin.findOne({
      where: {
        id: id,
      },
    });
    return res.status(200).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
};

export const getAdminbyToken = async (req, res) => {
  const token = req.params.token;
  console.log(token);
  try {
    if (!token) {
      return res.status(400).send('Invalid token');
    }
    const adminToken = jwt.verify(token, process.env.KEY_ADMIN_JWT);
    console.log(adminToken);
    const adminID = adminToken?.id;
    const admin = await Admin.findOne({
      where: { id: adminID },
    });
    return res.status(200).send(admin);
  } catch (error) {
    console.log('ini eror', error);
    return res.status(500).send(error);
  }
};

export const uploadPicture = async () => {
  try {
  } catch (error) {
    console.log(error);
  }
};

export const getSampleData = async () => {
  return await Sample.findAll();
};
