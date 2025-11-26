const Joi = require("joi");

const createProductSchema = Joi.object({
  productName: Joi.string().trim().required().messages({
    "any.required": "Product name is required.",
    "string.base": "Product name must be a string.",
  }),

  productTitle: Joi.string().trim().required().messages({
    "any.required": "Product title is required.",
    "string.base": "Product title must be a string.",
  }),

  productDescription: Joi.string().required().messages({
    "any.required": "Product description is required.",
    "string.base": "Product description must be a string.",
  }),

  category: Joi.string().required().messages({
    "any.required": "Product category is required.",
    "string.base": "Product category must be a string.",
  }),

  productImage: Joi.string().required().messages({
    "any.required": "Product image is required.",
    "string.base": "Product image must be a string.",
  }),

  price: Joi.alternatives()
    .try(
      Joi.number().positive(),
      Joi.string().pattern(/^[0-9]+(\.[0-9]{1,2})?$/)
    )
    .required()
    .messages({
      "any.required": "Price is required.",
      "alternatives.match":
        "Price must be a positive number or a valid price string.",
    }),

  // UPDATED HERE → Array of Objects
  productDetails: Joi.array()
    .items(
      Joi.object({
        title: Joi.string().required().messages({
          "any.required": "Detail title is required.",
          "string.base": "Detail title must be a string.",
        }),

        description: Joi.string().required().messages({
          "any.required": "Detail description is required.",
          "string.base": "Detail description must be a string.",
        }),

        image: Joi.string().optional().messages({
          "string.base": "Image must be a string.",
        }),
      })
    )
    .min(1)
    .required()
    .messages({
      "any.required": "Product details are required.",
      "array.base": "Product details must be an array of objects.",
      "array.min": "At least one product detail is required.",
    }),

  size: Joi.string()
    .valid("small", "medium", "large", "xl", "xxl")
    .default("small")
    .required()
    .messages({
      "any.required": "Size is required.",
      "any.only": "Size must be one of: small, medium, large, xl, xxl.",
    }),
});

const validateCreateProduct = (req, res, next) => {
  const { error } = createProductSchema.validate(req.body, {
    abortEarly: false,
    allowUnknown: true,
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

module.exports = {
  validateCreateProduct,
};
