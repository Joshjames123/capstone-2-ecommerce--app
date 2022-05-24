// [SECTION] Modules and Dependencies
	const mongoose = require('mongoose');


// [SECTION] Schema/Blueprint

	const orderSchema = new mongoose.Schema({
			userId: {
				type: mongoose.ObjectId,
				required: [true, 'is Required']
			},
			products: [
						{
							productId: {
								type: mongoose.ObjectId,
								required: [true, 'is Required']
							},
							quantity: {
								type: Number,
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