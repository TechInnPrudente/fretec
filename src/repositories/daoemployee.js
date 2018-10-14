
'use strict';
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');

exports.authenticate = async(data) => {
    const res = await Employee.findOne({
        email: data.email,
        password: data.password
    });
    return res;
}

exports.get = async() => {
    const res = await Employee.find({
        active: true
    }, 'name email birth');
    return res;
}

exports.getByBirthMonth = async(month) => {
    const res = await Employee.find({
        birth: { $month: {$eq: month } },
        active: true
    }, 'name email birth');
    return res;
}

exports.getById = async(id) => {
    const res = await Employee.findById(id);
    return res;
}

exports.create = async(data) => {
    var employee = new Employee(data);
    await employee.save();
}

exports.update = async(id, data) => {
    await Employee.findByIdAndUpdate(id, {
        $set: {
            name: data.name,
            email: data.email,
            active: data.active,
            birth: data.birth
        }
    });
}

exports.delete = async(id) => {
    await Employee.findByIdAndRemove(id);
}