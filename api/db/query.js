const knex = require('knex');
const config = require('./db.config');
const { v4: uuidv4 } = require('uuid');

const db = knex(config);

function getAccountInfo(acct_id){
    const query = `SELECT * FROM account_info WHERE account_uuid = '${acct_id}'`;
    return db.raw(query)
}

function getShoppingHistory(acct_id){
    const query = `SELECT * FROM shopping_history WHERE account_uuid = '${acct_id}'`;
    return db.raw(query)
}


module.exports={
    getAccountInfo,
    getShoppingHistory,
}


// if (require.main === module) {
//    getAccountInfo('98765432-10fe-dcba-9876-543210fedcba')
// }