const getUsers = 'SELECT * FROM users;';
const getUserById = 'SELECT * FROM users WHERE id=$1;';
const addUser = 'INSERT INTO users (full_name, current_geo) VALUES ($1, $2);';
const deleteUser = 'DELETE FROM users WHERE id = $1;'
// const deleteUser = 'UPDATE route SET current_geo = null WHERE current_geo = (SELECT id FROM users WHERE users.id = $1 );';


module.exports = {
    getUsers,
    getUserById,
    addUser,
    deleteUser,

}