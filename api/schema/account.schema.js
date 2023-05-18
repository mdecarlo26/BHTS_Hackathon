const Joi = require('joi');

const accountSchema = Joi.object().keys({
    account_uuid: Joi.string().uuid(),
    first_name: Joi.string(),
    last_name: Joi.string(),
    available_balance: Joi.object(),
    saving_amount: Joi.object(),
    acct_num: Joi.number().integer()
})


module.exports = {
    accountSchema,
}