// [SECTION] Modules and Dependencies
	const mongoose = require('mongoose');

// [SECTION] Schema/Blueprint

	const orderSchema = new mongoose.Schema({
			userId: {
				type: {userId},
				required: [true, 'is Required']
			},
			products: [
				{
					{
						productId: String,
						required: [true, 'is Required']
					},
					{
						quantity: Number,
						required: [true, 'is Required']
					}
				}
			],
			totalAmount: {
				type: Number,
				required: [true, 'is Required']
			},
			purchasedOn: {
				type: Date,
				default: new Date()
			}
		})

// [SECTION] Model
	module.exports = mongoose.model('Order', orderSchema);