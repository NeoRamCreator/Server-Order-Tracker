const express = require('express');
const orderOrders = require('./src/orders/routes')
const orderUsers = require('./src/users/routes')
const orderRoute = require('./src/route/routes')
const app = express();
const port = 3005;

const cors = require('cors');

app.use(express.json());
app.use(cors());

app.get('/', (req, res)=> {
    res.send("hello world")
})

app.use('/api/orders', orderOrders);
app.use('/api/users', orderUsers);
app.use('/api/routes', orderRoute);

app.get('/*', (req, res) => {
    res.send('Undefined url')
});


app.listen(port, ()=>console.log(`app listening on port ${port}`))