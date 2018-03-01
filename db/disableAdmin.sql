UPDATE user_admins
SET isadmin = 0
WHERE name = $1;