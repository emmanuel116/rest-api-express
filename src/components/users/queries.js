const queries = {
 getAllUsers: 'SELECT * FROM users',

 getUser: `SELECT * FROM users WHERE user = ?`,

 getUserById: `SELECT * FROM users WHERE id = ?`,

 postUser: `INSERT INTO users (user, name, password, role) VALUES (?, ?, ?, ?)`,

 putUser: `UPDATE users 
           SET user = ?, name = ?, 
           password = COALESCE(? , password), role = ?
           WHERE id = ?`,

 deleteUser: 'DELETE FROM users WHERE id = ?',
}

export default queries