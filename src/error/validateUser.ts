import Joi from "joi";

export const validateUser = Joi.object({
    username: Joi.string().min(6).max(20),
    pass: Joi.string().min(6).max(20),
});
export const validateInfo = Joi.object({
    name: Joi.string().min(2).max(20),
    email: Joi.string().email().required()
})
