import { check } from "express-validator";
import Joi from "joi";

export const validateTest = Joi.object({
    name: Joi.string().min(2).max(20),
    describe: Joi.string().required()
});

export const validateID = Joi.string().min(2).max(20);

export const validatePage = Joi.number().required();