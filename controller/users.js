//[SECTIONS] Dependencies and Modules
	const User = require('../models/Users');
	const Order = require('../models/Orders');
	const Product = require('../models/Products')
	const Cart = require('../models/Carts')
	const bcrypt = require('bcrypt');
	const dotenv = require('dotenv');
	const auth = require('../auth.js');

//[SECTION] Environment Variables Setup
	dotenv.config()
	const salt = Number(process.env.SALT);


//[SECTIONS] Functionalities [CREATE]
	//1. Register New Account
	module.exports.register = (userData) => {
		let fName = userData.firstName;
		let lName = userData.lastName;
		let email = userData.email;
		let passW = userData.password;
		let mobil = userData.mobileNo;

		let newUser = new User({
			firstName: fName,
			lastName: lName,
			email: email,
			password: bcrypt.hashSync(passW, salt),
			mobileNo: mobil
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
	res.send(order)
}



//Set user as admin (admin only) ========STRETCH GOAL========
module.exports.updateIsAdmin = (userId, data) => {

	let updatedUser = {
		isAdmin: data.isAdmin
	}

	return User.findByIdAndUpdate(userId, updatedUser).then((user, error) => {
		if(error){
			return false;
		} else {
			return true;
		}
	}).catch(error => error)
};


//Retrive authenticated user's order ========STRETCH GOAL========
module.exports.getUserOrder = (req, res) => {
	Order.find({ 'userId' : req.user.id })
	.then(result => {
		res.send(result)
	})
	.catch(err => res.send(err))
}



//Retrive all orders (admin only) ========STRETCH GOAL========
module.exports.getAllOrders = () => {
	return Order.find({}).then(result => {
		return result;
	})
}


module.exports.getProfile = (data) => {
	return User.findById(data).then(result => {
		result.password = '';
		return result;
	})
}

//Non-admin User addToCart
module.exports.addToCart = async (req,res) => {

	if(req.user.isAdmin) {
		return res.send({message: "Action Forbidden"})
	}

	const userId = req.user.id
	const products = req.body.products
	let total = 0

	for(let product of products) {
		const found = await Product.findById(product.productId)
		total += found.price * product.quantity
	}

	const cart = new Cart({
		userId,
		products,
		totalAmount: total
	})
	await cart.save()
	res.send(true)
}


//Add to Cart
module.exports.myCartController = async (req, res) => {

	if(req.user.isAdmin) {
		return res.send({message: "Action Forbidden"})
	}

	return Cart.find({ 'userId' : req.params.userId })
	.populate('products.productId')

}


