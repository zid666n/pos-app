CREAtE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT(true),
    password VARCHAR(255) NOT NULL,

    UNIQUE(email)
);