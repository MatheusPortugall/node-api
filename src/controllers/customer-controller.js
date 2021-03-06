const ValidationContract = require("../validators/fluent-validator");
const repository = require("../repositories/customer-repository");
const md5 = require("md5");
const config = require("../config");

const emailService = require("../services/email-service");

exports.post = async (req, res, next) => {
    let contract = new ValidationContract;
    contract.hasMinLen(req.body.name, 3, "O nome deve conter pelo menos 3 caracteres");
    contract.isEmail(req.body.email, "E-mail inválido.");
    contract.hasMinLen(req.body.password, 6, "A senha deve conter pelo menos 6 caracteres");

    if(!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        await repository.create({
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password + config.key)
        });

        emailService.send(req.body.email, 'Bem vindo ao Node Store', config.email_tmpl.replace('{0}', req.body.name ));

        res.status(201).send({success: true, message: "Cliente cadastrado com sucesso!"});
    } catch (e) {
        res.status(500).send({success: false, message: "Falha ao processar sua requisição", data: e});
    }
    
};