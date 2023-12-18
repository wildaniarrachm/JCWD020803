import Admin from '../models/admin.model';

export const registerAdmin = async (req, res) => {
    try {
        const { first_name, last_name, username, email, password } = req
        const result = await Admin.create({
            first_name: first_name,
            last_name: last_name,
            username: username,
            email: email,
            password: password,
            isVerified: false,
            isSuperAdmin: false,
          });
          return res.status(200).send('admin registered')
    } catch (err) {
        return res.status(400).send({err: err.message})
    }
}

export const adminLogin = async (req, res) => {
    try {
        let adminLogin;
        const {password} = req.query;
    } catch {

    }
}

export const getSampleData = async () => {
    return await Sample.findAll();
  };