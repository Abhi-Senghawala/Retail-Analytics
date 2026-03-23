import mongoose from "mongoose";

const customerSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    totalSpent: { type: Number, required: true, min: 0},
    purchaseFrequency: { type: Number, required: true, min: 0},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
}, { timestamps: true });

customerSchema.virtual('segment').get(function () {
    if (this.totalSpent > 10000) return 'High Value';
    if (this.totalSpent >= 5000) return 'Medium Value';
    return 'Low Value';
});

customerSchema.virtual('prediction').get(function () {
    return this.purchaseFrequency > 5 ? 'High Probability' : 'Low Probability';
});

customerSchema.set('toJSON', { virtuals: true });
customerSchema.set('toObject', { virtuals: true });

const Customer = mongoose.model("Customer", customerSchema);

export default Customer;