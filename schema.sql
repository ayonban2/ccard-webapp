-- pan table
CREATE TABLE pan (
  customer_pan VARCHAR PRIMARY KEY,
  date_of_birth DATE
);

-- cwd table
CREATE TABLE cwd (
  pan VARCHAR REFERENCES pan(customer_pan),
  gender VARCHAR,
  annual_income NUMERIC,
  customer_id VARCHAR PRIMARY KEY
);

-- aadhaar table
CREATE TABLE aadhaar (
  aadhaar VARCHAR PRIMARY KEY,
  linked_pan VARCHAR REFERENCES pan(customer_pan)
);

-- accounts table
CREATE TABLE accounts (
  account_id SERIAL PRIMARY KEY,
  customer_id VARCHAR REFERENCES cwd(customer_id),
  open_date DATE,
  status VARCHAR,
  last_payment DATE
);

-- cibil_score table
CREATE TABLE cibil_score (
  customer_pan VARCHAR REFERENCES pan(customer_pan),
  cibil_score INTEGER
);

-- repay_hist table
CREATE TABLE repay_hist (
  id SERIAL PRIMARY KEY,
  customer_id VARCHAR REFERENCES cwd(customer_id),
  dpd_code INTEGER,
  paid_date DATE
);