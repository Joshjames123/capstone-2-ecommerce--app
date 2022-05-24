const Product = require('../models/Orders');
const auth = require('../auth.js');

module.exports.addProduct = (reqBody) => {

	let newProduct = new Product({
		name: reqBody.name,
		description: reqBody.description,
		price: reqBody.price
	});

	return newProduct.save().then((product, error) => {

		if (error) {
			return false;
		} else {
			return true;
		}
	}).catch(error => error)

};