const knex = require('knex');
const config = require('./db.config');
const { v4: uuidv4 } = require('uuid');

const db = knex(config);

function getAccountInfo(acct_id){
    const query = `SELECT * FROM account_info WHERE account_uuid = '${acct_id}';`;
    console.log(query)
    db.raw(`SELECT * FROM account_info;`).then((res)=>{
        console.log(res)
       })
}


module.exports={
    getAccountInfo,
}


if (require.main === module) {
   getAccountInfo('98765432-10fe-dcba-9876-543210fedcba')
   db.destroy();
}