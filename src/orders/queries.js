const getOrders = 'SELECT * FROM orders;';
const getOrderById = 'SELECT * FROM orders WHERE id=$1;';
const addOrder = 'INSERT INTO orders (title, route_id) VALUES ($1, $2);';
const deleteOrder = 'DELETE FROM orders WHERE id = $1;'

const getOrderData = 'SELECT orders.title, route.from, route.to, users.current_geo FROM orders JOIN route ON orders.route_id = route.id JOIN users ON route.current_geo = users.id WHERE orders.title = $1;';

const UpdateOrdeersID = 'UPDATE orders SET route_id = null WHERE orders.route_id = $1';


module.exports = {
    getOrders,
    getOrderById,
    addOrder,
    deleteOrder,

    getOrderData,
    UpdateOrdeersID,
}