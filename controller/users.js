//[SECTIONS] Dependencies and Modules
	const User = require('../models/Users');
	const Order = require('../models/Orders');
	const Product = require('../models/Products')
	const bcrypt = require('bcrypt');
	const dotenv = require('dotenv');
	const auth = require('../auth.js');

//[SECTION] Environment Variables Setup
	dotenv.config()
	const salt = Number(process.env.SALT);


//[SECTIONS] Functionalities [CREATE]
	//1. Register New Account
	module.exports.register = (userData) => {
		let email = userData.email;
		let passW = userData.password;
		let isAd = userData.isAdmin;

		let newUser = new User({
			email: email,
			password: bcrypt.hashSync(passW, salt),
			isAdmin: isAd
		})
		
		return newUser.save().then((user, err) => {
			
			if (user) {
				return user;
			} else {
				return 'Failed to Register account';
			}
		});
	};


//User Authentication

module.exports.loginUser = (data) => {

	return User.findOne({ email: data.email }).then(result => {
		//User does not exist
		if(result == null) {
			return false;
		} else {
			const isPasswordCorrect = bcrypt.compareSync(data.password, result.password)

			if(isPasswordCorrect){
				return {accessToken: auth.createAccessToken(result.toObject()) }
			} else {
				return false;
			}
		}
	})
}


//Non-admin User Checkout (create order)
module.exports.orders = async (req,res) => {

	if(req.user.isAdmin) {
		return res.send({message: "Action Forbidden"})
	}

	const userId = req.user.id
	const products = req.body.products
	let total = 0

	for(let product of products){
		const found = await Product.findById(product.productId)
		total += found.price*product.quantity
	}

	const order = new Order({
		userId,
		products,
		totalAmount: total
	})
	await order.save()
	res.send(true)
}