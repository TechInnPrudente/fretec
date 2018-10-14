
'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: [true, 'O email é obrigatório'],
        trim: true,
        index: true, //ordenação por indice
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    category: [{
        type: String,
        required: true,
        enum: ['leve', 'médio', 'pesado'],
        default: 'leve'
    }],
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    birth: {
        type: Date,
        required: false
    }
});

module.exports = mongoose.model('Customer', schema);