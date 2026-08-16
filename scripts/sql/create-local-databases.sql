-- Run with an administrative MySQL account.
-- Adjust usernames/passwords for your local machine.

CREATE DATABASE IF NOT EXISTS political_education_dev
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_0900_ai_ci;

CREATE DATABASE IF NOT EXISTS political_education_test
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_0900_ai_ci;

-- Example only. Prefer local environment-specific credentials.
-- CREATE USER 'pes_dev'@'localhost' IDENTIFIED BY 'change_me';
-- CREATE USER 'pes_test'@'localhost' IDENTIFIED BY 'change_me';
-- GRANT ALL PRIVILEGES ON political_education_dev.* TO 'pes_dev'@'localhost';
-- GRANT ALL PRIVILEGES ON political_education_test.* TO 'pes_test'@'localhost';
-- FLUSH PRIVILEGES;
