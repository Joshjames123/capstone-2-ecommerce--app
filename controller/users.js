//[SECTIONS] Dependencies and Modules
	const User = require('../models/User');
	const bcrypt = require('bcrypt');
	const dotenv = require('dotenv');

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