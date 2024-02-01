import jwt from 'jsonwebtoken';

const verifyAdminToken = (req, res, next) => {
  try {
    let token = req.headers.authorization;
    console.log(token);
    if (!token) {
      return res.status(500).send('Token is empty');
    }
    token = token.split(' ')[1];
    let verified = jwt.verify(token, process.env.KEY_ADMIN_JWT);
    req.admin = verified;
    console.log(req?.admin);

    next();
  } catch (error) {
    return res.status(500).send(error);
  }
};

const verifyIsSuperAdmin = (req, res, next) => {
  try {
    if (req?.admin?.isSuperAdmin === false) {
      return res.status(500).send('Access denied');
    }
    next();
  } catch (error) {
    return res.status(500).send(error);
  }
};

export { verifyAdminToken, verifyIsSuperAdmin };
