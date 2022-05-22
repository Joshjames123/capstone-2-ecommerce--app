// [SECTION] Modules and Dependencies
	const mongoose = require('mongoose');

// [SECTION] Schema/Blueprint

	const orderSchema = new mongoose.Schema({
			totalAmount: {
				type: Number,
				required: [true, 'is Required']
			},
			purchasedOn: {
				type: Date,
				default: new Date()
			},
			orderDetails: [
				{
					{
						userName: String,
						required: [true, 'User Name is Required']
					},
					{
						productName: String,
						required: [true, 'Product Name is Required']
					}
				}
			]
		})

// [SECTION] Model
	module.exports = mongoose.model('Order', orderSchema);