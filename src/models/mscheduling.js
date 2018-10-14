
'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    schedule: {
        type: Date,
        required: true,
        default: Date.now
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    },
    services: [{
        type: String,
        required: true
    }],
    status: {
        type: String,
        required: true,
        enum: ['Agendado', 'Falta', 'Remarcou', 'Cancelado', 'Compareceu'],
        default: 'Agendado'
    }
});

module.exports = mongoose.model('Scheduling', schema);