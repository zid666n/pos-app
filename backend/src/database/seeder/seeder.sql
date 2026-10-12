INSERT INTO users (name, email, is_active, password) VALUES (
    'Zidan',
    'zidan@example.com',
    1,
    '12345'
),
(
    'Budi',
    'budi@example.com',
    1,
    '12345'
);

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