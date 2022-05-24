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



module.exports.orders = async (req,res) => {
	//console.log("test enroll route");
	console.log(req.user.id); // the user's id from the decoded token after verify()
	console.log(req.body.courseId); // the course ID from our request body

	//Process stops here and sends respose if user an admin
	if(req.user.isAdmin) {
		return res.send({message: "Action Forbidden"})
	}


}