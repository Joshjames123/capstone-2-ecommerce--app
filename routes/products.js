const express = require('express');
const route = express.Router();
const ProductController = require('../controller/products')
const auth = require('../auth');

const { verify, verifyAdmin } = auth;

//Route for Creating a Product (admin only)
route.post('/create', verify, verifyAdmin, (req, res) => {
	ProductController.addProduct(req.body).then(result => res.send(result))
});

route.get('/all', (req, res) => {
	ProductController.getAllProduct().then(result => res.send(result));
})


//Retrive all ACTIVE Product (user or not user)
route.get('/active', (req, res) => {
	ProductController.getAllActive().then(result => res.send(result));
});


//Retriveing a single Product
route.get('/:productId', (req, res) => {
	
	ProductController.getProduct(req.params.productId).then(result => res.send(result));
});

//Route for update product information
route.put('/:productId', verify, verifyAdmin, (req, res) => {
	ProductController.updateProduct(req.params.productId, req.body).then(result => res.send(result));
});

//Archiving Product (admin only)
route.put('/:productId/archive', verify, verifyAdmin, (req, res) => {
	ProductController.archiveProduct(req.params.productId).then(result => res.send(result));
})

//Activate a Product
route.put('/:productId/activate', verify, verifyAdmin, (req, res) => {
	ProductController.activateProduct(req.params.productId).then(result => res.send(result));
})





module.exports = route;