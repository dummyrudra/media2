const Joi = require("joi");
const fs = require("fs");
const path = require("path");

module.exports.validate = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required().max(30),
    email: Joi.string().required().email().max(40),
    password: Joi.string().required().min(8).max(16),
    file: Joi.array(),
    isActive: Joi.boolean(),
  });
  const { error } = schema.validate(req.body);

  if (error) {
    if (req.file) {
      fs.unlinkSync(
        path.join(__dirname, "../public/uploads/") + req.file.filename
      );
    }
    return res.status(400).send({ message: error.details[0].message });
  }

  next();
};
