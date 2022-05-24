const Product = require('../models/Products');

//Create a new Product (admin only)

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



//Retrive all ACTIVE courses

module.exports.getAllActive = () => {
	return Product.find({ isActive: true}).then(result => {
		return result;
	}).catch(error => error)
};


//Retriveing a single Product

module.exports.getProduct = (reqParams) => {
	return Product.findById(reqParams).then(result => {
		return result;
	}).catch(error => error)
};


//update product information

module.exports.updateProduct = (productId, updateData) => {

	let updatedProduct = {
		name: updateData.name,
		description: updateData.description,
		price: updateData.price
	}

	return Product.findByIdAndUpdate(productId, updatedProduct).then((product, error) => {
		if(error){
			return false;
		} else {
			return true;
		}
	}).catch(error => error)
};

//Archiving Product (admin only)
module.exports.archiveProduct = (productId) => {
	let updateActiveField = {
		isActive: false
	};

	return Product.findByIdAndUpdate(productId, updateActiveField).then((product, error) => {

			if(error){
				return false;
			} else {
				return true;
			}
		}).catch(error => error)
}