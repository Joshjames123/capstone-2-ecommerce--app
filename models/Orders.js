// [SECTION] Modules and Dependencies
	const mongoose = require('mongoose');

// [SECTION] Schema/Blueprint

	const ordersSchema = new mongoose.Schema({
			totalAmount: {
				type: Number,
				required: [true, 'is Required']
			},
			createdOn: [
				{
					purchasedOn: {
						type: Date,
						default: new Date()
					},
					{
						userName: String,
						required: [true, 'userName is Required']
					},
					{
						productName: String,
						required: [true, 'productName is Required']
					}
				}
			]
		})

// [SECTION] Model
	module.exports = mongoose.model('Order', orderSchema);