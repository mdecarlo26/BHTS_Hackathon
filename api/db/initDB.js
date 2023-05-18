const knex = require('knex');
const config = require('./db.config');


function initDB(){
    const db = knex(config);
    db.raw(`DROP TABLE IF EXISTS account_info;
        CREATE TABLE account_info (
        uuid UUID PRIMARY KEY,
        account_uuid UUID,
        First_Name TEXT,
        Last_Name TEXT,
        date_modified TIMESTAMP,
        available_balance JSONB,
        desired_saving_amount JSONB,
        acct_num INTEGER
      );`)
      .then(()=>{return db.raw(`INSERT INTO account_info (uuid, account_uuid, First_Name, Last_Name, date_modified, available_balance, desired_saving_amount, acct_num)
      VALUES
        ('01234567-89ab-cdef-0123-456789abcdef', '98765432-10fe-dcba-9876-543210fedcba', 'John', 'Doe', '2023-05-18 12:34:56', '{"dollars": 100, "cents": 50}', '{"dollars": 500, "cents": 0}', 123456789),
        ('abcdef12-3456-7890-abcd-ef1234567890', '543210fe-dcba-fedc-ba98-765432109876', 'Jane', 'Smith', '2023-05-18 09:00:00', '{"dollars": 75, "cents": 20}', '{"dollars": 200, "cents": 50}', 987654321),
        ('12345678-90ab-cdef-1234-567890abcdef', '67890abc-def0-1234-5678-90abcdef0123', 'David', 'Johnson', '2023-05-18 15:45:00', '{"dollars": 300, "cents": 0}', '{"dollars": 1000, "cents": 0}', 246813579);
      `)})
      .then(() => {
        console.log('Initialization completed successfully.');
        db.destroy(); // Close the database connection
      })
      .catch((error) => {
        console.error('Error initializing database:', error);
        db.destroy(); // Close the database connection
      });
}

if (require.main === module) {
    initDB();
}
