//[SECTION] *Dependencies and Modules*
	const express = require('express');
	const mongoose = require('mongoose');
	const dotenv = require('dotenv');
	const userRoutes = require('./routes/users');
	const productRoutes = require('./routes/products');
	const cors = require('cors');
	

//[SECTION] Environment Setup
	dotenv.config();
	let account = process.env.CREDENTIALS;
	const port = process.env.PORT;

//[SECTION] Server Setup
	const appj = express();
	appj.use(express.json());
	appj.use(cors())
	
//[SECTION] Database Connection
	mongoose.connect(account)
	const connectStatus = mongoose.connection
	connectStatus.once('open', () => console.log(`Database Connected`));

//[SECTION] Backend Routes
	appj.use('/users', userRoutes);
	appj.use('/products', productRoutes);
	
	
//[SECTION] Server Gateway Respose
	appj.get('/', (req, res) => {
		res.send('Welcome to Ecommers JJBro')
	});

	appj.listen(port, () => {
		console.log(`API is Hosted port ${port}`);
	})