const Joi = require("joi");

const createProductSchema = Joi.object({
  productName: Joi.string().trim().required().messages({
    "any.required": "Product name is required.",
  }),

  // Accepts an Array of URL strings
  productImage: Joi.array().items(Joi.string().uri()).required().messages({
    "array.base": "Product images must be an array of URLs.",
    "any.required": "At least one product image is required.",
  }),

  // Validates the gender dropdown values
  gender: Joi.string()
    .valid("Male", "Female", "Kids", "Unisex")
    .required()
    .messages({
      "any.only": "Gender must be Male, Female, Kids, or Unisex.",
      "any.required": "Gender selection is required.",
    }),

  rating: Joi.number().min(0).max(5).default(0),

  price: Joi.number().positive().required(),

  discount: Joi.string().allow("", null).optional(),

  description: Joi.string().required(),

  // Accepts an Array of strings (e.g., ["Red", "#000000"])
  colors: Joi.array().items(Joi.string()).min(1).required().messages({
    "array.min": "Please select or add at least one color.",
    "any.required": "Colors are required.",
  }),

  // Accepts an Array of strings
  size: Joi.array().items(Joi.string()).required().messages({
    "any.required": "Sizes are required.",
  }),
});

const validateCreateProduct = (req, res, next) => {
  const { error } = createProductSchema.validate(req.body, {
    abortEarly: false,
    allowUnknown: true, // Allows calculated fields like priceAfterDiscount if passed
  });

  if (error) {
    const errorMessages = error.details.map(detail => detail.message);
    return res.status(400).json({
      success: false,
      message: "Validation failed.",
      errors: errorMessages,
    });
  }

  next();
};

module.exports = { validateCreateProduct };