# Database Schema README

This README provides an overview of the database schema for the project. It describes the structure of the database, including the tables, columns, and relationships that may be useful for understanding and working with the schema.

## Table of Contents
- [Overview](#overview)
- [Schema Structure](#schema-structure)
- [Table Descriptions](#table-descriptions)
- [Relationships](#relationships)

## Overview

The database schema is designed to organize and store data for the project in a structured manner. It defines the tables and their relationships to efficiently manage and query data. Understanding the schema is crucial for developing applications that interact with the database.

## Schema Structure

The schema consists of several tables that represent different entities and their attributes. Here is an overview of the table structure:


## Table Descriptions

- **account_info**: generic info about an account.
  - `uuid`: uuid  
  - `account_uuid`: uuid
  - `First_Name`: string  
  - `Last_Name`: string
  - `date_modified`: timestamp  
  - `available_balance`: jsonb -> {`dollars`:integer,`cents`:integer}   
  - `desired_saving_amount`: jsonb -> {`dollars`:integer,`cents`:integer}   
  - `acct_num`: string
  ...  
  
- **shopping_history**: history of purchases
  - `uuid`: uuid  
  - `account_uuid`: uuid
  - `category`: string  
  - `date` : timestamp  
  - `amount` : jsonb -> {`dollars`:integer,`cents`:integer}  
  ...

- **semester_info**: information about the semester  
  - `uuid`: uuid  
  - `account_uuid`: uuid  
  - `start_date`: date
  - `end_date`: date 
  - `end_date`: date  
  - `fixed_payments_monthly` : jsonb -> {`dollars`:integer,`cents`:integer}  
  ...

## Relationships

Describe the relationships between the tables in the database schema. For example:

- **account_info** has a one-to-many relationship with **shopping_history** based on the `account_uuid` foreign key.

