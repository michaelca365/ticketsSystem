import Joi from "joi";

const email = Joi.string().email();
const userName = Joi.string().min(3);
const password = Joi.string().min(8).max(12);
const userPermission = Joi.string().valid(1,2,3);

export const createUser = Joi.object({
    email: email.required(),
    userName: userName.required(),
    password: password.required(),
    userPermission: userPermission.required()
})