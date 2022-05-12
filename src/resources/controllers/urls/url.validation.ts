import { celebrate, Joi } from 'celebrate'

export const createOne = celebrate({
    body: Joi.object().keys({
        url: Joi.string().trim().required(),
        shortcode: Joi.string().trim().alphanum().length(4)
    })
})

export const getStats = celebrate({
    params: Joi.object().keys({
        shortcode: Joi.string().trim().alphanum()
    })
})

export const getRedirectedToOriginalUrl = celebrate({
    params: Joi.object().keys({
        shortcode: Joi.string().trim().alphanum().required()
    })
})
