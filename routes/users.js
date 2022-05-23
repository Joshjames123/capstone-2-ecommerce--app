//[SECTIONS] Dependencies and Modules
	const exp = require('express');
	const controller = require('../controller/users');
	const auth = require('../auth');

//[SECTIONS] Routing Component
	const route = exp.Router();

//[SECTIONS] Routes- POST
	route.post('/register', (req, res) => {
		//console.log(req.body);
		let userData = req.body;
		
		controller.register(userData).then(outcome => {
			res.send(outcome)
		})
	});


//[SECTTION] Route for User Authentication(login)
route.post('/login', (req, res) => {
	controller.loginUser(req.body).then(result => res.send(result));
})







//[SECTIONS] Expose Route System
	module.exports = route;