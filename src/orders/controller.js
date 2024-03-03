const pool = require('../../db');
const queries = require('./queries');

const getOrders = (req, res) => {
  pool.query(queries.getOrders, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const getOrderById = (req, res) => {
  console.log('!!!11111111')

  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return getOrderData(req, res);
  }

  console.log('!!!getOrderById')
  pool.query(queries.getOrderById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};


const addOrder = (req, res) => {
  // console.log(req.body);
  console.log('!!!22222')
  // console.log()

  const { title, route_id } = req.body;
  if (title === undefined || route_id === undefined) {
    console.log(title, route_id)
    return res.send('Не все поля определены')
  }
  pool.query(queries.addOrder, [title, route_id], (error, results) => {
    if (error) throw error;
    res.status(201).send("Order creacted seccessfuly");
  });
};

const getOrderData = (req, res) => {
  console.log('!!!!!!!!!!!')

  const title = req.params.id;
  console.log(req.params, '!!!!!!!!!!!')
  // Проверяем, что title не NaN
  if (isNaN(title)) {
    console.log('getOrderData !!!!!!!!!!! if (isNaN(title)) {')

    pool.query(queries.getOrderData, [title], (error, results) => {
      if (error) throw error;
      res.status(200).json(results.rows);
    });
  } else {
    res.status(400).json({ error: 'Invalid title parameter' });
  }
};

const deleteOrder = (req, res) => {
  const id = req.params.id;

  // Сначала проверьте, существует ли заказ с указанным id
  pool.query(queries.getOrderById, [id], (error, results) => {
    if (error) {
      console.error('Database query error:', error);
      res.status(500).send('Internal Server Error');
      return;
    }

    // Проверьте, найден ли заказ
    if (results.rows.length === 0) {
      res.status(404).send('Заказ не найден');
      return;
    }

    // Если заказ найден, то удаляйте его
    pool.query(queries.deleteOrder, [id], (error, results) => {
      if (error) {
        console.error('Ошибка запроса к базе данных:', error);
        res.status(500).send('Internal Server Error');
        return;
      }

      res.status(200).send('Заказ успешно удален');
    });
  });
};


// const deleteOrder = (req, res) => {
//   const id = req.params.id;

//   pool.query(queries.getOrderById, [id], (error, results) => {
//     if (error) {
//       throw error;
//       res.send('Заказ не найден');
//     }

//     pool.query(queries.deleteOrder, [id], (error, results) => {
//       if (error) throw error;
//       res.send('Заказ удален')
//     })
//     // } else {
//     res.send('Заказ не найден')
//   });


// }


module.exports = {
  getOrders,
  getOrderById,
  addOrder,
  deleteOrder,

  getOrderData,
}

