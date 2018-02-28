SELECT *
FROM users
INNER JOIN user_admins ON users.id=user_admins.id;