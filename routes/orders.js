const express = require('express');
const route = express.Router();
const ProductController = require('../controller/orders')
const auth = require('../auth')

//Non-admin User Checkout (create order)
route.post('/create', auth.verify, (req, res) => {
	ProductController.addCourse(req.body).then(result => res.send(result))
})


module.exports = route;