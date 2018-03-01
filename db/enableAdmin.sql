UPDATE user_admins
SET isadmin = 1
WHERE name = $1;