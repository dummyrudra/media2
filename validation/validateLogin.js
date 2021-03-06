const Joi = require("joi");
module.exports.validateLogin = (req, res, next) => {
  // req.body.isAdmin  = Boolean(req.body.isAdmin);
  // req.body.isActive = Boolean(req.body.isActive);
  const schema = Joi.object({
    email: Joi.string().required().email().max(40),
    password: Joi.string().required().min(8).max(20),
    isAdmin: Joi.boolean(),
    isActive: Joi.boolean(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });
  next();
};
