const getRouts = 'SELECT * FROM route;';
const getRoutById = 'SELECT * FROM route WHERE id=$1;';
const addRout = 'INSERT INTO route ("from", "to", "current_geo") VALUES ($1, $2, $3);';
// const deleteRoute = 'DELETE FROM route WHERE id = $1;'
// const deleteRoute = 'UPDATE orders SET route_id = null WHERE orders.route_id = route.id;';
const deleteRoute = 'DELETE FROM route WHERE id = $1;';

const UpdateRouteCurrentGeo = 'UPDATE route SET current_geo = null WHERE route.current_geo = $1';




module.exports = {
    getRouts,
    getRoutById,
    addRout,
    deleteRoute,
    UpdateRouteCurrentGeo,

}