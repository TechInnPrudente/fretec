
'use strict';

const mongoose = require('mongoose');
const Order = mongoose.model('Order');

exports.get = async(data) => {
    var res = await Order.find({}, 'number status')
        .populate('customer', 'name')
        .populate('items.product', 'title');
    return res;
}

exports.create = async(data) => {
    var order = new Order(data);
    await order.save();
}

exports.update = async(id, data) => {
    await Order.findByIdAndUpdate(id, {
        $set: {
            customer: data.customer,
            number: data.number,
            createDate: data.createDate,
            status: data.status,
            items: data.items
        }
    });
}

exports.delete = async(id) => {
    await Order.findByIdAndRemove(id);
}