import Joi from "joi";

const email = Joi.string().email();
const password = Joi.string().min(8);

export const authenticationSchema = Joi.object({
    email: email.required(),
    password: password.required()
})