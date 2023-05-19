const knex = require('knex');
const config = require('./db.config');
const { v4: uuidv4 } = require('uuid');



function getAllInfo_fromAcct(acct_id){
    const query = `SELECT acc.uuid AS account_uuid, acc.first_name, acc.last_name, acc.date_modified AS account_date_modified,
    json_build_object('shopping', json_agg(json_build_object('category', shop.category, 'date', shop.date, 'amount', shop.amount))) AS shopping,
    sem.start_date, sem.end_date
    FROM account_info AS acc
    JOIN shopping_history AS shop ON acc.account_uuid = shop.account_uuid
    JOIN semester_info AS sem ON acc.account_uuid = sem.account_uuid
    WHERE acc.account_uuid = '${acct_id}'
    GROUP BY acc.uuid, acc.first_name, acc.last_name, acc.date_modified, sem.start_date, sem.end_date;`;
    return db.raw(query);
}

function getAllInfo_fromAcct(acct_id){
    const query = `SELECT acc.uuid AS account_uuid, acc.first_name, acc.last_name, acc.date_modified AS account_date_modified,
    json_build_object('shopping', json_agg(json_build_object('category', shop.category, 'date', shop.date, 'amount', shop.amount))) AS shopping,
    sem.start_date, sem.end_date
    FROM account_info AS acc
    JOIN shopping_history AS shop ON acc.account_uuid = shop.account_uuid
    JOIN semester_info AS sem ON acc.account_uuid = sem.account_uuid
    WHERE acc.account_uuid = '${acct_id}'
    GROUP BY acc.uuid, acc.first_name, acc.last_name, acc.date_modified, sem.start_date, sem.end_date;`;
    return db.raw(query);
}

function getAccountInfo(acct_id){
    const query = `SELECT * FROM account_info WHERE account_uuid = '${acct_id}'`;
    return db.raw(query)
}

function getShoppingHistory(acct_id){
    const query = `SELECT ai.category,ai.amount,DATE(ai.date) as date
    FROM shopping_history AS ai
    JOIN semester_info AS si ON ai.account_uuid = si.account_uuid
    WHERE ai.account_uuid = '${acct_id}'
      AND ai.date BETWEEN si.start_date AND si.end_date
    ORDER BY
        ai.date ASC,
      (ai.amount->>'dollars')::int DESC,
      (ai.amount->>'cents')::int DESC;`;
    return db.raw(query)
}

function getSemesterInfo(acct_id){
    const query = `SELECT * FROM semester_info WHERE account_uuid = '${acct_id}'`;
    return db.raw(query)
}

function getBalanceHistory(acct_id){
    const query = `SELECT ai.available_balance,DATE(ai.date_modified) as date
    FROM account_info AS ai
    JOIN semester_info AS si ON ai.account_uuid = si.account_uuid
    WHERE ai.account_uuid = '${acct_id}'
      AND ai.date_modified BETWEEN si.start_date AND si.end_date
    ORDER BY
        ai.date_modified ASC,
      (ai.available_balance->>'dollars')::int DESC,
      (ai.available_balance->>'cents')::int DESC;`;
    return db.raw(query)
}

module.exports={
    getAccountInfo,
    getShoppingHistory,
    getAllInfo_fromAcct,
    getSemesterInfo,
    getBalanceHistory
}


// if (require.main === module) {
//    getAccountInfo('98765432-10fe-dcba-9876-543210fedcba')
// }