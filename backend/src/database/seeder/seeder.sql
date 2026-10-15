INSERT INTO users (name, email, is_active, password) VALUES (
    'Zidan',
    'zidan@example.com',
    1,
    '$2a$12$YVwdTU03Dgaop0RJ8cbOHOI5j83gVqsALXZJE4qygNc1au1GbmiAm'
),

INSERT INTO categories (name, is_active) VALUES (
    'Coffee',
    1
),
(
    'Non-coffee',
    1
),
(
    'Dessert',
    1
);

INSERT INTO products (category_id, name, quantity, price) VALUES (
    1,
    'Americano',
    10,
    10000
),
(
    2,
    'Pink Coco',
    12,
    15000
),
(
    3,
    'Croissant',
    8,
    8000
);