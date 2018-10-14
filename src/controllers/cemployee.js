
'use strict';

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/daoemployee');
const authService = require('../services/auth-service');
const md5 = require('md5');

exports.get = async(req, res, next) => {
    try {
        var data = await repository.get();
        res.status(200).send(data);    
    }
    catch (e) {
        res.status(500).send({
            message: 'Falha ao processar a requisição'
        });
    }
}

exports.getByBirthMonth = async(req, res, next) => {
    try {
        var data = await repository.getByBirthMonth(req.params.month);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

exports.getById = async(req, res, next) => {
    try {
        var data = await repository.getById(req.params.id);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    } 
}

exports.post = async(req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.name, 3, 'O nome deve conter pelo menos 3 caracteres');
    contract.isEmail(req.body.email, 'O email é invalido');
    contract.hasMinLen(req.body.password, 6, 'A senha deve conter pelo menos 6 caracteres');

    //se os dados forem invalidos
    if(!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {    
        await repository.create({
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY),
            roles: ["employee"]
        });
        res.status(201).send({
            message: 'Funcionário cadastrado com sucesso'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }    
};

exports.authenticate = async(req, res, next) => {
    let contract = new ValidationContract();
    contract.isEmail(req.body.email, 'O email é inválido');

    //se os dados forem invalidos
    if(!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {    
        const employee = await repository.authenticate({
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        });
        
        if(!employee) {
            res.status(404).send({
                message: 'Usuário ou senha inválidos'
            });
            return
        }

        const token = await authService.generateToken({
            id: employee._id,
            email: employee.email,
            name: employee.name,
            roles: employee.roles
        });

        res.status(201).send({
            token: token,
            data: {
                email: employee.email,
                name: employee.name
            }
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao logar'
        });
    }    
};

exports.refreshToken = async(req, res, next) => {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const data = await authService.decodeToken(token);

        const employee = await repository.getById(data.id);
        
        if(!employee) {
            res.status(404).send({
                message: 'Cliente não encontrado'
            });
            return
        }

        const tokenData = await authService.generateToken({
            id: employee._id,
            email: employee.email,
            name: employee.name,
            roles: ["employee"]
        });

        res.status(201).send({
            token: tokenData,
            data: {
                email: employee.email,
                name: employee.name
            }
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao logar'
        });
    }    
};

exports.put = async(req, res, next) => {
    try {
        await repository.update(req.params.id, {
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY),
            active: true 
        });
        res.status(200).send({
            message: 'Funcionário atualizado com sucesso'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }   
};

exports.delete = async(req, res, next) => {
    try {
        await repository.delete(req.body.id);
        res.status(200).send({
            message: 'Funcionário removido com sucesso'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }   
};