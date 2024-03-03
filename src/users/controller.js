const pool = require('../../db');
const queries = require('./queries');
const routeQueries = require('../route/queries');

const getUsers = (req, res) => {
  pool.query(queries.getUsers, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
    // res.send('!!!')
  });
};

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getUserById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};


const addUser = (req, res) => {
  console.log("addUser", req.body);
  console.log("current_geo", req.body.current_geo);
  console.log("full_name", req.body.full_name);
  const { full_name, current_geo } = req.body;
  if (full_name === undefined || current_geo === undefined) {
    console.log('Не все поля определены')
    return res.send('Не все поля определены')
  }
  pool.query(queries.addUser, [full_name, current_geo], (error, results) => {
    if (error) throw error;
    res.status(201).send("User creacted seccessfuly");
  });
};




const deleteUser = (req, res) => {
  const id = req.params.id;


  // Сначала проверьте, существует ли заказ с указанным id
  pool.query(queries.getUserById, [id], (error, results) => {
    if (error) {
      console.error('Database query error:', error);
      res.status(500).send('Internal Server Error');
      return;
    }

    // Проверьте, найден ли заказ
    if (results.rows.length === 0) {
      res.status(404).send('Водитель не найден');
      return;
    }

    pool.query(routeQueries.UpdateRouteCurrentGeo, [id], (error, results) => {
      if (error) {
        console.error('Ошибка запроса к базе данных:', error);
        res.status(500).send('Internal Server Error');
        return;
      }

      pool.query(queries.deleteUser, [id], (error, results) => {
        if (error) {
          console.error('Ошибка запроса к базе данных:', error);
          res.status(500).send('Internal Server Error');
          return;
        }

        res.status(200).send('Водитель успешно удален');
      });
      // res.status(200).send('Водитель успешно удален');
    });

    // Если заказ найден, то удаляйте его

  });
};

module.exports = {
  getUsers,
  getUserById,
  addUser,

  deleteUser,
}

