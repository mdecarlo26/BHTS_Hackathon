const knex = require('knex');
const config = require('./db.config');
const { v4: uuidv4 } = require('uuid');



function getAccountInfo(acct_id){
    const db = knex(config);
    const query = `SELECT * FROM account_info WHERE account_uuid = '${acct_id}';`;
    // console.log(query)
    db.raw(`SELECT * FROM account_info WHERE account_uuid = '${acct_id}';`).then((res)=>{
        console.log(res.rows)
        db.destroy();
       }).catch((error) => {
        console.error('Error querying the database:', error);
        db.destroy();
      });
}


module.exports={
    getAccountInfo,
}


if (require.main === module) {
   getAccountInfo('98765432-10fe-dcba-9876-543210fedcba')
}