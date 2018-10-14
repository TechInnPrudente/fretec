
'use strict';
const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');

exports.authenticate = async(data) => {
    const res = await Customer.findOne({
        email: data.email,
        password: data.password
    });
    return res;
}

exports.getByEmail = async(data) => {
    const res = await Customer.findOne({
        email: data.email
    });
    return res;
}

exports.get = async() => {
    const res = await Customer.find({
        active: true
    }, 'name email birth');
    return res;
}

exports.getByBirthMonth = async(month) => {
    const res = await Customer.find({
        birth: { $month: {$eq: month } },
        active: true
    }, 'name email birth');
    return res;
}

exports.getById = async(id) => {
    const res = await Customer.findById(id);
    return res;
}

exports.create = async(data) => {
    var customer = new Customer(data);
    await customer.save();
}

exports.update = async(id, data) => {
    await Customer.findByIdAndUpdate(id, {
        $set: {
            name: data.name,
            email: data.email,
            active: data.active,
            birth: data.birth
        }
    });
}

exports.delete = async(id) => {
    await Customer.findByIdAndRemove(id);
}