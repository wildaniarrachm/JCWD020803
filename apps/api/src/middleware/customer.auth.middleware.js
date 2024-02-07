import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  try {
    let token = req?.headers?.authorization;
    if (token) {
      token = token.split(' ')[1];
      let verified = jwt.verify(token, process.env.KEY_CUSTOMER_JWT);
      req.customer = verified;
    }
    next();
  } catch (error) {
    console.log('error auth', error);
    res.status(500).send(error);
  }
};

export { verifyToken };
