const mongoose = require("mongoose");
const Order = mongoose.model("Order");

exports.get = async (data) => {
    var res = await Order.find({});
    return res;
};

exports.create = async (body) => {
    var order = new Order(body);
    await order.save();
};