import jwt from 'jsonwebtoken';

const verifyAdminToken = (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if (!token) {
            return res.status(500).send('Token is empty')
        }
        token = token.split (' ') [1];
        let verified = jwt.verify(token, process.env.KEY_ADMIN_JWT);
        req.admin = verified;
        next();
    } catch (error){
        return res.status(500).send(error)
    }
}

export { verifyAdminToken }