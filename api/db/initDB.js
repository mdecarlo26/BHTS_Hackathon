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
        ('01234567-89ab-cdef-0123-456789abcdef', '98765432-10fe-dcba-9876-543210fedcba', 'John', 'Doe', '2023-05-18 12:34:56', '{"dollars": 1000, "cents": 0}', '{"dollars": 0, "cents": 0}', 123456789),
        ('b3b63219-0db6-4105-8860-152e5724c955', '98765432-10fe-dcba-9876-543210fedcba', 'John', 'Doe', '2023-05-21 12:34:56', '{"dollars": 800, "cents": 40}', '{"dollars": 0, "cents": 0}', 123456789),
        ('acfa39ce-7f4b-4a0a-89e3-46330d937fad', '98765432-10fe-dcba-9876-543210fedcba', 'John', 'Doe', '2023-05-25 12:34:56', '{"dollars": 800, "cents": 0}', '{"dollars": 0, "cents": 0}', 123456789),
        ('fbed5ab0-98b1-4ce6-b5a3-ea21f7e52d55', '98765432-10fe-dcba-9876-543210fedcba', 'John', 'Doe', '2023-05-28 12:34:56', '{"dollars": 400, "cents": 0}', '{"dollars": 0, "cents": 0}', 123456789),
        ('1ccbcced-0947-4504-b93d-4b916b574a5d', '98765432-10fe-dcba-9876-543210fedcba', 'John', 'Doe', '2023-06-08 12:34:56', '{"dollars": 200, "cents": 0}', '{"dollars": 0, "cents": 0}', 123456789),
        ('abcdef12-3456-7890-abcd-ef1234567890', '543210fe-dcba-fedc-ba98-765432109876', 'Jane', 'Smith', '2023-05-18 09:00:00', '{"dollars": 75, "cents": 20}', '{"dollars": 200, "cents": 50}', 987654321),
        ('12345678-90ab-cdef-1234-567890abcdef', '67890abc-def0-1234-5678-90abcdef0123', 'David', 'Johnson', '2023-05-18 15:45:00', '{"dollars": 300, "cents": 0}', '{"dollars": 1000, "cents": 0}', 246813579);
      `)})
      .then(() => {
        return db.raw(`DROP TABLE IF EXISTS shopping_history; 
          CREATE TABLE shopping_history (
          uuid UUID PRIMARY KEY,
          account_uuid UUID,
          category TEXT,
          date TIMESTAMP,
          amount JSONB
        );`)
        
      })
      .then(()=>{
        return db.raw(`INSERT INTO shopping_history (uuid, account_uuid, category, date, amount)
        VALUES
          ('88b77a2b-755c-43d6-b81c-4f87b6a39017', '98765432-10fe-dcba-9876-543210fedcba', 'Electronics', '2023-06-17 10:30:00', '{"dollars": 100, "cents": 50}'),
          ('134f8dc6-2761-495a-87b5-5a5c7bd36292', '98765432-10fe-dcba-9876-543210fedcba', 'Clothing', '2023-06-16 15:45:00', '{"dollars": 75, "cents": 20}'),
          ('6f82327e-3daf-4929-92f2-57a05a1fa10f', '98765432-10fe-dcba-9876-543210fedcba', 'Groceries', '2023-06-15 09:15:00', '{"dollars": 50, "cents": 0}'),
          ('b74a1e03-50cd-4be5-9def-b4283382b4fc', '543210fe-dcba-fedc-ba98-765432109876', 'Electronics', '2023-05-18 10:00:00', '{"dollars": 50, "cents": 99}'),
          ('db2342e9-a7ff-4f8b-92c9-0ff40d57a302', '543210fe-dcba-fedc-ba98-765432109876', 'Clothing', '2023-05-18 12:30:00', '{"dollars": 25, "cents": 50}'),
          ('63e6665b-d09a-4b52-ae62-d0cb90355db1', '543210fe-dcba-fedc-ba98-765432109876', 'Home Decor', '2023-05-18 15:45:00', '{"dollars": 75, "cents": 0}');
          
        `)
      })
      .then(()=>{
        return db.raw(`DROP TABLE IF EXISTS semester_info;
          CREATE TABLE semester_info (
          uuid UUID PRIMARY KEY,
          account_uuid UUID,
          start_date DATE,
          end_date DATE
        );
        `)
      })
      .then(()=>{
        return db.raw(`INSERT INTO semester_info (uuid, account_uuid, start_date, end_date)
        VALUES
          ('0ba1eb98-8c98-450b-b2c8-e925d7f1ec71', '98765432-10fe-dcba-9876-543210fedcba', '2023-05-20', '2023-09-20'),
          ('69fa3f90-337e-4259-a490-bb0a6ceada43', '543210fe-dcba-fedc-ba98-765432109876', '2023-09-05', '2023-12-22');
        
        `)
      })
      .then(()=>{
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
