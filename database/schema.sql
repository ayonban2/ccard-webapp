CREATE TABLE pan (
  customer_pan VARCHAR PRIMARY KEY,
  date_of_birth DATE
);

CREATE TABLE cwd (
  pan VARCHAR REFERENCES pan(customer_pan),
  gender VARCHAR,
  annual_income NUMERIC,
  customer_id VARCHAR PRIMARY KEY
);

CREATE TABLE aadhaar (
  aadhaar VARCHAR PRIMARY KEY,
  linked_pan VARCHAR REFERENCES pan(customer_pan)
);

CREATE TABLE accounts (
  account_id SERIAL PRIMARY KEY,
  customer_id VARCHAR REFERENCES cwd(customer_id),
  open_date DATE,
  status VARCHAR,
  last_payment DATE
);

CREATE TABLE cibil_score (
  customer_pan VARCHAR REFERENCES pan(customer_pan),
  cibil_score INTEGER
);

CREATE TABLE repay_hist (
  id SERIAL PRIMARY KEY,
  customer_id VARCHAR REFERENCES cwd(customer_id),
  dpd_code INTEGER,
  paid_date DATE
);