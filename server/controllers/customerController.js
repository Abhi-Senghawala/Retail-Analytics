import Customer from "../models/Customer";
import csv from "csv-parser";
import { Readable } from "stream";

const uploadCustomer = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  const results = [];
  const bufferStream = Readable.from(req.file.buffer.toString());
  bufferStream
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", async () => {
      const customers = results.map((row) => ({
        name: row.name,
        email: row.email,
        totalSpent: parseFloat(row.totalSpent),
        purchaseFrequency: parseInt(row.purchaseFrequency),
        user: req.user._id,
      }));

      const bulkOps = customers.map((customer) => ({
        updateOne: {
          filter: { email: customer.email, user: req.user._id },
          update: { $set: customer },
          upsert: true,
        },
      }));

      await Customer.bulkWrite(bulkOps);
      res.status(200).json({ message: "Customers uploaded successfully" });
    });
};

const getCustomers = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const search = req.query.search || "";
  const filter = {};
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ];
  }

  filter.user = req.user._id;
  const customers = await Customer.find(filter)
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });
  const total = await Customer.countDocuments(filter);
  res.json({ customers, total, page, pages: Math.ceil(total / limit) });
};

const getCustomerById = async (req, res) => {
  const customer = await Customer.findOne({
    _id: req.params.id,
    user: req.user._id,
  });
  if (customer) {
    res.json(customer);
  } else {
    res.status(404).josn({ message: "Customer not found" });
  }
};

const updateCustomer = async (req, res) => {
    const customer = await Customer.findOne({ _id: req.params.id, user: req.user._id });
    if (customer) {
        customer.name = req.body.name || customer.name;
        customer.email = req.body.email || customer.email;
        customer.totalSpent = req.body.totalSpent || customer.totalSpent;
        customer.purchaseFrequency = req.body.purchaseFrequency || customer.purchaseFrequency;
        const updatedCustomer = await customer.save();
        res.json(updatedCustomer);
    } else {
        res.status(404).json({ message: 'Customer Not Found' });
    }
};

const deleteCustomer = async (req, res) => {
    const customer = await Customer.findOneAndDelete({
        _id: req.params.id,
        user: req.user._id
    });
    if (customer) {
        res.json({ message: 'Customer removed' });
    } else {
        res.status(404).json({ message: 'Customer not found' });
    }
};

const getAnalytics = async (req, res) => {
    const customers = await Customer.find({ user: req.user._id });
    const totalCustomers = customers.length;
    const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0);
    const avgPurchaseValue = totalCustomers ? totalRevenue / totalCustomers : 0;

    const segments = {
        'High Value': customers.filter(c => c.totalSpent > 10000).length,
        'Medium Value': customers.filter(c => c.totalSpent >= 5000 && c.totalSpent <= 10000).length,
        'Low Value': customers.filter(c => c.totalSpent < 5000).length,
    };

    const predictions = {
        'High Probability': customers.filter(c => c.purchaseFrequency > 5).length,
        'Low Probability': customers.filter(c => c.purchaseFrequency <= 5).length,
    };

    const revenueTrend = customers.reduce((acc, c) => {
        const month = c.createdAt.toISOString().slice(0, 7);
        acc[month] = (acc[month] || 0) + c.totalSpent;
        return acc;
    }, {});

    const revenueTrendData = Object.keys(revenueTrend).map(month => ({
        month,
        revenue: revenueTrend[month],
    }));

    res.json({
        totalCustomers,
        totalRevenue,
        avgPurchaseValue,
        segments,
        predictions,
        revenueTrend: revenueTrendData,
    });
};

export {
    uploadCustomer,
    getCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer,
    getAnalytics,
};