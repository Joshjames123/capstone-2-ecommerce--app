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
});


//Non-admin User Checkout (create order)
route.post('/orders', auth.verify, controller.orders);


//Set user as admin (admin only) ========STRETCH GOAL========
route.put('/:userId', auth.verify, auth.verifyAdmin, (req, res) => {
	controller.updateIsAdmin(req.params.userId, req.body).then(result => res.send(result));
});


//Retrive authenticated user's order ========STRETCH GOAL========
route.get('/userOrder', auth.verify, controller.getUserOrder);



//Retrive all orders (admin only) ========STRETCH GOAL========
route.get('/allOrders', auth.verify, auth.verifyAdmin, (req, res) => {
	controller.getAllOrders().then(result => res.send(result));
})



//[SECTIONS] Expose Route System
	module.exports = route;