const pool = require('../../db');
const queries = require('./queries');
const ordersQueries =require('../orders/queries')

const getRouts = (req, res) => {
    pool.query(queries.getRouts, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const getRoutById = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(queries.getRoutById, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};


const addRout = (req, res) => {
    console.log('addRout', req.body);
    console.log('from', typeof req.body.from);
    console.log('to', typeof req.body.to);
    console.log('current_geo', typeof req.body.current_geo);

    const { from, to, current_geo } = req.body;
    if (from === undefined || to === undefined || current_geo === undefined) {
        console.log('Не все поля определены')
        return res.send('Не все поля определены')
    }
    pool.query(queries.addRout, [from, to, current_geo], (error, results) => {
        if (error) throw error;
        res.status(201).send("Rout created successfully");
    });
};

const deleteRoute = async (req, res) => {
    const id = req.params.id;

    pool.query(queries.getRoutById, [id], (error, results) => {
        if (error) {
            console.error('Database query error:', error);
            res.status(500).send('Internal Server Error');
            return;
        }

        // Проверьте, найден ли 
        if (results.rows.length === 0) {
            res.status(404).send('Маршкут не найден');
            return;
        }

        // Если  найден, то удаляйте его
        pool.query(ordersQueries.UpdateOrdeersID, [id], (error, results) => {
            if (error) {
                console.error('Ошибка запроса к базе данных:', error);
                res.status(500).send('Internal Server Error');
                return;
            }

            pool.query(queries.deleteRoute, [id], (error, results) => {
                if (error) {
                    console.error('Ошибка запроса к базе данных:', error);
                    res.status(500).send('Internal Server Error');
                    return;
                }
    
                res.status(200).send('Маршкут успешно удален');
            });

            // res.status(200).send('orders успешно изменен');
        });

        
    });
};


module.exports = {
    getRouts,
    getRoutById,
    addRout,
    deleteRoute,

}

