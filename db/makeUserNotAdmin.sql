UPDATE user_admins
SET isadmin = 0
WHERE id = $1;