const express = require('express');
const path = require('path');
const url = require('url')

const router = express.Router();

router.get('/', (req, res) => {
    let alert = req.query
    console.log(alert);
    let result
    // console.log("func entered");
    (async () => {
        // console.log("start");
        result = await require(path.join(__dirname, "../index.js")).getData('menu', 'WHERE AVAILABILITY = 1')
        // console.log(result);
        // console.log("end");
        res.render('customer', { data: result, alert: alert })
    })()
    // res.send("root directory form routes.js")
});

router.get('/cart', (req, res) => {
    res.render('cart')
})

router.get('/menu', (req, res) => {
    res.render('menu')
})

router.post('/placeorder', (req, res) => {
    console.log(req.body);
    // let order_list=JSON.parse(req.body.order_list)
    (async () => {
        console.log("start");
        result = await require(path.join(__dirname, "../index.js")).insertData(req.body)
        // console.log(result);
        console.log("end");
        // res.redirect('/')
    })()

    let c = url.format({
        pathname: '/',
        query: {
            "alert": true,
            "type": "success",
            "message": "Your Order is being placed..."
        }
    })

    res.redirect(c)
})

router.get('/manager', (req, res) => {
    (async () => {
        console.log("start");
        let result = await require(path.join(__dirname, "../index.js")).getData('orders');
        // console.log(result);
        console.log("end");
        // console.log(result,2222);
        res.render('manager', {
            data: result
        })

    })()
})

module.exports = router;