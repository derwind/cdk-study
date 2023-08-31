CREATE DATABASE IF NOT EXISTS test_db;
USE test_db;

CREATE TABLE IF NOT EXISTS test_table (id int, name text);
INSERT INTO test_table (id, name) VALUES (1, 'one'), (2, 'two');
