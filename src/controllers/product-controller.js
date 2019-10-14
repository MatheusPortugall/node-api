
const mongoose = require("mongoose");
const Product = mongoose.model("Product");
const ValidationContract = require("../validators/fluent-validator");
const repository = require("../repositories/product-repository");

exports.get = async (req, res, next) => {
    try {
        var data = await repository.get();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: "Falha ao processar sua requisição",
            error: e,
        });
    }
};

exports.getBySlug = async (req, res, next) => {
    try {
        var data = await repository.getBySlug(req.params.slug);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: "Falha ao processar sua requisição",
            error: e,
        });
    }
};

exports.getById = async (req, res, next) => {
    try {
        var data = await repository.getById(req.params.id);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: "Falha ao processar sua requisição",
            error: e,
        });
    }
};

exports.getByTag = async (req, res, next) => {
    try {
        var data = await repository.getByTag(req.params.tag);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: "Falha ao processar sua requisição",
            error: e,
        });
    }
};

exports.post = async (req, res, next) => {
    let contract = new ValidationContract;
    contract.hasMinLen(req.body.title, 3, "O título deve conter pelo menos 3 caracteres");
    contract.hasMinLen(req.body.slug, 3, "O slug deve conter pelo menos 3 caracteres");
    contract.hasMinLen(req.body.description, 3, "A descrição deve conter pelo menos 3 caracteres");

    if(!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        await repository.create(req.body);
        res.status(201).send({success: true, message: "Produto cadastrado com sucesso!"});
    } catch (e) {
        res.status(400).send({success: false, message: "Falha no cadastro de produto!", data: e});
    }
    
};

exports.put = async (req, res, next) => {
    try {
        await repository.update(req.body, req.params.id);
        res.status(201).send({success: true, message: "Produto atualizado com sucesso!" });
    } catch (e) {
        res.status(400).send({success: false, message: "Falha ao atualizar produto!", error: e });
    }
};

exports.delete = async (req, res, next) => {
    try {
        await repository.delete(req.body.id);
        res.status(200).send({success: true, message: "Produto removido com sucesso!" });
    } catch (e) {
        res.status(400).send({success: false, message: "Falha ao remover produto!", error: e });
    }
};