const Joi = require('joi')

const validateNote = Joi.object({
    title: Joi.string().required(),
    body: Joi.string().required()
})

module.exports = validateNote;