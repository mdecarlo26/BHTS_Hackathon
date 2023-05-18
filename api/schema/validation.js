const Joi = require('joi');

const  readAccount = {
    params: Joi.object().keys({
        account_id: Joi.string().uuid()
    })
}


module.exports = {
    readAccount,
}