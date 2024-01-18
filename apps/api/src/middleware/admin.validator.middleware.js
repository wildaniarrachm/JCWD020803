import { body, validationResult } from 'express-validator';

export const checkRegister = async (req, res, next) => {
    try {
        await body("name").notEmpty().withMessage("Name is required").run(req);
        await body("username").notEmpty().withMessage('Username is required').run(req);
        await body("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage('Email invalid')
        .run(req);

        const validation = validationResult(req)

        if (validation.isEmpty()){
            next();
        } else {
            return res.status(400).send({
                message: "invalid validation",
                error: validation.array()
            })
        }
    } catch (err) {
        console.log(err);
        return res.status(400).send(err);

    }
}

export const checkPassword = async (req, res, next) => {
    try{
        await body("password")
        .notEmpty()
        .withMessage("password is required")
        .isLength({min: 6})
        .run(req);
        
        const validation = validationResult(req);

        if (validation.isEmpty()){
            next()
        } else {
            return res.status(400).send({
                message: "invalid validation",
                error: validation.array(),
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(400).send(err)
    }
}